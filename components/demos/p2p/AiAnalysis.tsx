"use client";

import { getFallbackAnalysis, getFallbackAnalysisFromData } from "@/lib/p2p/fallbacks";
import { streamP2PAnalyze } from "@/lib/p2p/analyzeClient";
import type { PurchaseOrder, ScenarioId } from "@/lib/p2p/types";
import { RefreshCw } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

type AiAnalysisProps = {
  orders: PurchaseOrder[];
  scenarioId: ScenarioId;
  resetKey: string | number;
};

export function AiAnalysis({ orders, scenarioId, resetKey }: AiAnalysisProps) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);

  const runAnalysis = useCallback(() => {
    setLoading(true);
    setText("");

    streamP2PAnalyze(
      { type: "analyze", data: orders, scenarioId },
      (chunk) => setText((prev) => prev + chunk),
      () => setLoading(false),
      () => {
        setText(getFallbackAnalysisFromData(orders) || getFallbackAnalysis(scenarioId));
        setLoading(false);
      }
    );
  }, [orders, scenarioId]);

  useEffect(() => {
    runAnalysis();
  }, [runAnalysis, resetKey]);

  return (
    <div className="bg-card border border-white/5 p-5 md:p-6 mb-9">
      <div className="flex items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-3 min-w-0">
          <p className="section-label truncate">the consultant read · ai-generated</p>
          {loading && (
            <span className="flex items-center gap-1.5 section-label text-accent shrink-0">
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
              thinking
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={runAnalysis}
          disabled={loading}
          className="inline-flex items-center gap-1.5 shrink-0 px-2 py-1 border border-accent/40 text-accent text-[10px] font-mono uppercase tracking-wide hover:bg-accent/10 transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`h-3 w-3 ${loading ? "animate-spin" : ""}`} />
          re-analyse
        </button>
      </div>
      <h3 className="editorial-line text-xl md:text-2xl text-text mb-4">
        How I&apos;d read this data
      </h3>
      <div className="text-muted text-sm leading-relaxed whitespace-pre-wrap min-h-[96px]">
        {text || (loading ? "" : getFallbackAnalysis(scenarioId))}
      </div>
    </div>
  );
}
