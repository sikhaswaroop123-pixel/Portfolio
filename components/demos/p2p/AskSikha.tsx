"use client";

import { getFallbackAnswer } from "@/lib/p2p/fallbacks";
import { streamP2PAnalyze } from "@/lib/p2p/analyzeClient";
import type { ChatMessage, PurchaseOrder, ScenarioId } from "@/lib/p2p/types";
import { useState } from "react";

const SUGGESTED = [
  "What's the biggest issue you see?",
  "Which vendor would you fire first?",
  "What would you fix in week one?",
  "How do I prevent this from happening?",
];

type AskSikhaProps = {
  orders: PurchaseOrder[];
  scenarioId: ScenarioId;
};

export function AskSikha({ orders, scenarioId }: AskSikhaProps) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);

  const ask = async (question: string) => {
    if (!question.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      role: "user",
      content: question.trim(),
    };
    const assistantId = `a-${Date.now()}`;
    setMessages((prev) => [
      ...prev,
      userMsg,
      { id: assistantId, role: "assistant", content: "" },
    ]);
    setInput("");
    setLoading(true);

    let accumulated = "";

    await streamP2PAnalyze(
      { type: "question", data: orders, question: question.trim(), scenarioId },
      (chunk) => {
        accumulated += chunk;
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId ? { ...m, content: accumulated } : m
          )
        );
      },
      () => setLoading(false),
      () => {
        const fallback = getFallbackAnswer(question.trim(), scenarioId);
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId ? { ...m, content: fallback } : m
          )
        );
        setLoading(false);
      }
    );
  };

  return (
    <div className="bg-card border border-white/5 p-5 md:p-6 mb-9">
      <p className="section-label mb-2">ask sikha</p>
      <h3 className="editorial-line text-xl md:text-2xl text-text mb-4">
        Got a question about this data?
      </h3>

      {messages.length > 0 && (
        <div className="space-y-6 mb-6 max-h-[400px] overflow-y-auto">
          {messages.map((msg) => (
            <div key={msg.id}>
              {msg.role === "assistant" && (
                <p className="section-label text-accent mb-1">Sikha</p>
              )}
              <p
                className={`text-sm md:text-base leading-relaxed whitespace-pre-wrap ${
                  msg.role === "user" ? "text-text" : "text-muted"
                }`}
              >
                {msg.content || (loading && msg.role === "assistant" ? "…" : "")}
              </p>
            </div>
          ))}
        </div>
      )}

      <div className="flex flex-wrap gap-2 mb-4">
        {SUGGESTED.map((q) => (
          <button
            key={q}
            type="button"
            onClick={() => ask(q)}
            disabled={loading}
            className="section-label border border-white/10 px-3 py-1.5 text-muted hover:border-accent hover:text-accent transition-colors disabled:opacity-50"
          >
            {q}
          </button>
        ))}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          ask(input);
        }}
        className="flex gap-3"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about vendors, stages, or what to fix first…"
          disabled={loading}
          className="flex-1 bg-white/5 border border-white/10 px-4 py-3 text-text text-sm focus:outline-none focus:border-accent/50"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="px-5 py-3 bg-accent text-text text-sm hover:opacity-90 transition-opacity disabled:opacity-50 shrink-0"
        >
          Ask
        </button>
      </form>
    </div>
  );
}
