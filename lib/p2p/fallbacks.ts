import type { ScenarioId } from "@/lib/p2p/types";
import { computeBiggestLeak, computeKpis, formatCurrency } from "@/lib/p2p/metrics";
import type { PurchaseOrder } from "@/lib/p2p/types";

const analyzeByScenario: Record<ScenarioId, string> = {
  default: `Approval is where I'd look first — and it's not subtle. PO-2024-012 (EventPro, £8.5K) has been sitting there 24 days, and you've got another £8K+ across TechSupply, AdAgency, and DataServ in the same stage. That's roughly £15K of committed spend waiting on a signature.

Invoiced is the second problem. BuildCo and SecureGuard are both north of 19 days at invoice stage — that's vendor relationship damage waiting to happen. When invoices sit that long, you lose early payment discounts and finance ends up firefighting at month-end.

This week I'd do two things: name the approvers holding PO-2024-012 and the other big Approval items, and set a 48-hour SLA. Then I'd run a 30-minute invoice clearing session every Friday until Invoiced drops below 7 days average.`,

  healthy: `This is what a well-run P2P cycle looks like for a 60-person business — and honestly, it's rare. Average cycle time is sitting around 12 days, nothing is stuck more than a week at any stage, and cash is moving predictably.

What's working here is discipline, not software. Approvals are clearing within 5 days, goods are being receipted promptly, and invoices aren't piling up. The few POs still in flight (LegalPartners at Goods Received, AdAgency at Approval) are within normal tolerance.

If this were a real client, I'd ask one question: can you sustain this when volume doubles? The process works now — the risk is it relies on one person chasing things manually.`,

  "invoice-chaos": `Your approval stage is fine — things move through in 3–4 days. That's not the problem. Invoiced is where £31K+ is sitting idle across eight POs, averaging 18 days each. EventPro alone is £8.5K at 20 days. BuildCo, SecureGuard, AdAgency — all jammed in the same place.

This pattern usually means three-way match is broken. Someone's receiving goods but not confirming in the system, or invoices are arriving before POs are closed, or finance doesn't have a weekly clearing rhythm. The approval team thinks they're done; finance is drowning.

Week one fix: daily 15-minute invoice triage until the Invoiced queue drops below 5 items. Week two: chase the top three vendors by value — EventPro, BuildCo, SecureGuard — and confirm receipt status on every open PO.`,
};

const questionAnswers: Record<string, string> = {
  "what's the biggest issue you see?":
    "Approval and Invoiced are competing for worst offender — depends which scenario you're in. In the baseline data, Approval has the highest £ value stuck (EventPro at £8.5K for 24 days is the headline). But Invoiced is close behind with BuildCo and SecureGuard both over 19 days. I'd fix Approval first because that's where committed spend gets trapped before it even becomes a PO.",
  "which vendor would you fire first?":
    "I wouldn't fire anyone yet — I'd fix the process first. But if you forced me to name names: in the baseline data, EventPro has the single worst PO (PO-2024-012, £8.5K, 24 days in Approval). TechSupply UK appears twice with delays. Before cutting a vendor, I'd check whether the delay is them or your internal approval chain.",
  "what would you fix in week one?":
    "Three things, in order. First, pull a list of every PO stuck more than 7 days and assign an owner to each — not 'finance', a named person. Second, set a 48-hour approval SLA and tell approvers directly. Third, run one invoice clearing session before Friday close. That's 90 minutes of work and you'll see movement within 48 hours.",
  "how do i prevent this from happening?":
    "Prevention is boring and it works. Weekly 15-minute pipeline review — not a meeting, a checklist. Auto-escalate approvals after 48 hours. Match goods receipt to PO within 24 hours of delivery. And name one person accountable for cycle time, not a committee. Most P2P chaos is a ownership problem dressed up as a systems problem.",
};

export function getFallbackAnalysis(scenarioId: ScenarioId = "default"): string {
  return analyzeByScenario[scenarioId] ?? analyzeByScenario.default;
}

export function getFallbackAnswer(
  question: string,
  scenarioId: ScenarioId = "default"
): string {
  const normalized = question.trim().toLowerCase();
  for (const [key, answer] of Object.entries(questionAnswers)) {
    if (normalized.includes(key) || key.includes(normalized.slice(0, 20))) {
      return answer;
    }
  }

  return (
    getFallbackAnalysis(scenarioId).split("\n\n")[0] +
    " Happy to go deeper on any vendor or stage — try asking about a specific PO number or stage."
  );
}

export function getFallbackAnalysisFromData(orders: PurchaseOrder[]): string {
  const leak = computeBiggestLeak(orders);
  const kpis = computeKpis(orders);
  return `${leak.headline.replace(".", "")} — ${formatCurrency(leak.amount)} across the pipeline. Average cycle time is ${kpis.avgCycleDays} days and ${kpis.stuckCount} POs are stuck over 7 days (${formatCurrency(kpis.idleValue)} idle). ${leak.body}`;
}
