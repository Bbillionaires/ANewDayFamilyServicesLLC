"use client";

import { useTranslations } from "next-intl";
import { useRef, useState } from "react";

type Message = { role: "user" | "assistant"; content: string };

export default function ChatWidget({ locale }: { locale: string }) {
  const t = useTranslations("Chat");
  const starterPrompts = t.raw("starterPrompts") as string[];

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: t("greeting") },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  async function sendMessage(text: string) {
    if (!text.trim() || loading) return;
    const next: Message[] = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next, locale }),
      });
      const data = await res.json();
      setMessages([...next, { role: "assistant", content: data.reply }]);
    } catch {
      setMessages([...next, { role: "assistant", content: t("connectionError") }]);
    } finally {
      setLoading(false);
      requestAnimationFrame(() => {
        listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
      });
    }
  }

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {open && (
        <div className="mb-3 flex h-[28rem] w-[22rem] flex-col overflow-hidden rounded-2xl border border-harbor-200 bg-white shadow-2xl">
          <div className="flex items-center justify-between bg-sunrise px-4 py-3 text-white">
            <div>
              <p className="text-sm font-semibold">{t("title")}</p>
              <p className="text-xs text-white/80">{t("subtitle")}</p>
            </div>
            <button
              type="button"
              aria-label={t("closeLabel")}
              onClick={() => setOpen(false)}
              className="rounded-full bg-white/20 px-2 py-1 text-xs"
            >
              ✕
            </button>
          </div>

          <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto p-4 text-sm">
            {messages.map((m, i) => (
              <div
                key={i}
                className={
                  m.role === "user"
                    ? "ml-auto max-w-[85%] rounded-2xl rounded-br-sm bg-dawn-400 px-3 py-2 text-harbor-950"
                    : "mr-auto max-w-[85%] rounded-2xl rounded-bl-sm bg-harbor-50 px-3 py-2 text-harbor-900"
                }
              >
                {m.content}
              </div>
            ))}
            {loading && (
              <div className="mr-auto max-w-[85%] rounded-2xl rounded-bl-sm bg-harbor-50 px-3 py-2 text-harbor-400">
                {t("typing")}
              </div>
            )}
            {messages.length === 1 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {starterPrompts.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => sendMessage(p)}
                    className="rounded-full border border-harbor-200 px-3 py-1 text-xs text-harbor-700 hover:border-dawn-400 hover:text-dawn-600"
                  >
                    {p}
                  </button>
                ))}
              </div>
            )}
          </div>

          <form
            className="flex items-center gap-2 border-t border-harbor-100 p-3"
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage(input);
            }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t("placeholder")}
              className="flex-1 rounded-full border border-harbor-200 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-dawn-400"
            />
            <button type="submit" className="btn-primary px-4 py-2" disabled={loading}>
              {t("send")}
            </button>
          </form>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-full bg-sunrise px-5 py-3 text-sm font-semibold text-white shadow-xl shadow-dawn-500/40 transition hover:scale-105"
      >
        {open ? t("closeButtonLabel") : t("openLabel")}
      </button>
    </div>
  );
}
