import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { siteConfig } from "@/lib/siteConfig";

export const runtime = "nodejs";

const MAX_RESUME_BYTES = 5 * 1024 * 1024; // 5MB
const ALLOWED_RESUME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(req: NextRequest) {
  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ error: "invalid_form" }, { status: 400 });
  }

  const name = String(form.get("name") || "").trim();
  const email = String(form.get("email") || "").trim();
  const phone = String(form.get("phone") || "").trim();
  const position = String(form.get("position") || "").trim();
  const message = String(form.get("message") || "").trim();
  const resume = form.get("resume");

  if (!name || !email || !message) {
    return NextResponse.json({ error: "missing_required_fields" }, { status: 400 });
  }
  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "invalid_email" }, { status: 400 });
  }

  let resumeAttachment: { filename: string; content: Buffer } | null = null;
  if (resume instanceof File && resume.size > 0) {
    if (resume.size > MAX_RESUME_BYTES) {
      return NextResponse.json({ error: "resume_too_large" }, { status: 400 });
    }
    if (resume.type && !ALLOWED_RESUME_TYPES.includes(resume.type)) {
      return NextResponse.json({ error: "resume_invalid_type" }, { status: 400 });
    }
    resumeAttachment = {
      filename: resume.name || "resume",
      content: Buffer.from(await resume.arrayBuffer()),
    };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CAREERS_NOTIFICATION_EMAIL || siteConfig.email;
  const from = process.env.CAREERS_FROM_EMAIL || "careers@anewdayfamilyservices.com";

  if (!apiKey) {
    return NextResponse.json({ status: "not_configured" });
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: `${siteConfig.shortName} Careers <${from}>`,
      to,
      replyTo: email,
      subject: `New career application: ${name}${position ? ` — ${position}` : ""}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone || "(not provided)"}`,
        `Position of interest: ${position || "(not specified)"}`,
        "",
        "Message:",
        message,
      ].join("\n"),
      attachments: resumeAttachment ? [resumeAttachment] : undefined,
    });

    if (error) {
      console.error("Careers email send error:", error);
      return NextResponse.json({ error: "send_failed" }, { status: 502 });
    }

    return NextResponse.json({ status: "sent" });
  } catch (error) {
    console.error("Careers application error:", error);
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }
}
