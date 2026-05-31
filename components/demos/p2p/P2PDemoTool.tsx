"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { scenarios, getNextScenario, scenarioLabels } from "@/data/p2pSampleData";
import { computeBiggestLeak, computeKpis } from "@/lib/p2p/metrics";
import type { ScenarioId } from "@/lib/p2p/types";
import { site } from "@/content/site";
import { KpiTiles } from "./KpiTiles";
import { PipelineView } from "./PipelineView";
import { BiggestLeakCallout } from "./BiggestLeakCallout";
import { AiAnalysis } from "./AiAnalysis";
import { AskSikha } from "./AskSikha";
import { Reveal } from "@/components/ui/Reveal";

const SETUP_COPY =
  "60-person services business in London. £400K annual procurement spend. One finance person, drowning in invoices, knew something was off but couldn't point to where. Here's what their P2P data showed me.";

export function P2PDemoTool() {
  const [scenarioId, setScenarioId] = useState<ScenarioId>("default");
  const [resetKey, setResetKey] = useState(0);

  const orders = useMemo(() => scenarios[scenarioId], [scenarioId]);
  const kpis = useMemo(() => computeKpis(orders), [orders]);
  const leak = useMemo(() => computeBiggestLeak(orders), [orders]);

  const shuffle = () => {
    setScenarioId((current) => getNextScenario(current));
    setResetKey((k) => k + 1);
  };

  const mailto = `mailto:${site.contact.email}?subject=${encodeURIComponent("Procurement audit for my business")}`;

  return (
    <div className="min-h-screen pt-28 pb-14 px-6 md:px-12 lg:px-20 max-w-6xl mx-auto">
      <div className="flex items-center justify-between gap-4 mb-7">
        <Link
          href="/"
          className="section-label text-muted hover:text-accent transition-colors"
        >
          ← back to portfolio
        </Link>
        <span className="section-label text-muted">demo · interactive · sample data</span>
      </div>

      <Reveal>
        <p className="section-label mb-3">the setup</p>
        <p className="editorial-line text-xl md:text-2xl text-text max-w-3xl leading-snug mb-8">
          {SETUP_COPY}
        </p>
      </Reveal>

      <KpiTiles kpis={kpis} resetKey={resetKey} />

      <Reveal>
        <PipelineView orders={orders} />
      </Reveal>

      <BiggestLeakCallout leak={leak} resetKey={resetKey} />

      <AiAnalysis orders={orders} scenarioId={scenarioId} resetKey={resetKey} />

      <AskSikha orders={orders} scenarioId={scenarioId} />

      <div className="flex items-center gap-4 mb-9">
        <button
          type="button"
          onClick={shuffle}
          className="px-5 py-2.5 border border-accent text-accent text-sm hover:bg-accent/10 transition-colors"
        >
          Shuffle data
        </button>
        <span className="section-label text-muted">
          scenario: {scenarioLabels[scenarioId]}
        </span>
      </div>

      <div className="border-t border-white/10 pt-9">
        <h2 className="editorial-line text-2xl md:text-3xl text-text mb-3 max-w-2xl">
          This is a sample. Your real procurement is messier — and I can help.
        </h2>
        <p className="text-muted text-sm md:text-base leading-relaxed mb-6 max-w-2xl">
          Procurement audit, custom dashboard, or both — let&apos;s talk.
        </p>
        <div className="flex flex-wrap gap-4 mb-8">
          <a
            href={mailto}
            className="text-accent hover:underline text-sm"
          >
            {site.contact.email}
          </a>
          <a
            href={`mailto:${site.contact.email}?subject=${encodeURIComponent("Let's talk")}`}
            className="inline-block px-6 py-3 bg-accent text-text text-sm hover:opacity-90 transition-opacity"
          >
            Hire me — send a message
          </a>
        </div>
        <p className="section-label text-muted">
          Made by {site.name.toLowerCase()} · procurement & marketing strategist ·{" "}
          <Link href="/" className="text-accent hover:underline">
            back to portfolio
          </Link>
        </p>
      </div>
    </div>
  );
}
