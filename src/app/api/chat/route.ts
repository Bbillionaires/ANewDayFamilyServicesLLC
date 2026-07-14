import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";
import { buildSystemPrompt } from "@/lib/chatContext";

export const runtime = "nodejs";

const FALLBACK_REPLY =
  "The live AI assistant isn't configured yet on this deployment (missing ANTHROPIC_API_KEY). In the meantime, check the Services, About, or Community Resources pages, or reach out using the contact info in the footer.";

export async function POST(req: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ reply: FALLBACK_REPLY });
  }

  const { messages } = await req.json();
  if (!Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json({ error: "messages is required" }, { status: 400 });
  }

  try {
    const anthropic = new Anthropic({ apiKey });
    const response = await anthropic.messages.create({
      model: "claude-sonnet-5",
      max_tokens: 400,
      system: buildSystemPrompt(),
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

    return NextResponse.json({ reply: reply || FALLBACK_REPLY });
  } catch (error) {
    console.error("Chat assistant error:", error);
    return NextResponse.json({
      reply:
        "I ran into an error answering that. Please try again, or reach out using the contact info in the footer.",
    });
  }
}
