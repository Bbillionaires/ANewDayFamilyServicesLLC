import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";
import { getTranslations } from "next-intl/server";
import { buildSystemPrompt } from "@/lib/chatContext";
import { routing } from "@/i18n/routing";

export const runtime = "nodejs";

function resolveLocale(locale: unknown): string {
  return typeof locale === "string" && routing.locales.includes(locale as (typeof routing.locales)[number])
    ? locale
    : routing.defaultLocale;
}

export async function POST(req: NextRequest) {
  const { messages, locale: rawLocale } = await req.json();
  const locale = resolveLocale(rawLocale);
  const t = await getTranslations({ locale, namespace: "Chat" });

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ reply: t("notConfigured") });
  }

  if (!Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json({ error: "messages is required" }, { status: 400 });
  }

  try {
    const anthropic = new Anthropic({ apiKey });
    const response = await anthropic.messages.create({
      model: "claude-sonnet-5",
      max_tokens: 400,
      system: buildSystemPrompt(locale),
      messages: messages
        .slice(-10)
        .map((m: { role: "user" | "assistant"; content: string }) => ({
          role: m.role,
          content: m.content,
        })),
    });

    const reply = response.content
      .filter((block) => block.type === "text")
      .map((block) => (block.type === "text" ? block.text : ""))
      .join("\n")
      .trim();

    return NextResponse.json({ reply: reply || t("notConfigured") });
  } catch (error) {
    console.error("Chat assistant error:", error);
    return NextResponse.json({ reply: t("answerError") });
  }
}
