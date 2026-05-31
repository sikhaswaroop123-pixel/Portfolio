import type { BiggestLeak, P2PKpis, P2PStage, PurchaseOrder } from "@/lib/p2p/types";
import { P2P_STAGES } from "@/lib/p2p/types";

export function isStuck(po: PurchaseOrder): boolean {
  return po.stage !== "Paid" && po.daysAtStage > 7;
}

export function computeKpis(orders: PurchaseOrder[]): P2PKpis {
  const avgCycleDays =
    orders.length === 0
      ? 0
      : Math.round(
          (orders.reduce((s, o) => s + o.daysSinceRequisition, 0) /
            orders.length) *
            10
        ) / 10;

  const stuck = orders.filter(isStuck);

  return {
    avgCycleDays,
    stuckCount: stuck.length,
    idleValue: stuck.reduce((s, o) => s + o.value, 0),
  };
}

export function formatCurrency(amount: number): string {
  if (amount >= 1000) {
    return `£${(amount / 1000).toFixed(1)}K`;
  }
  return `£${amount.toLocaleString("en-GB")}`;
}

export function computeBiggestLeak(orders: PurchaseOrder[]): BiggestLeak {
  const stuck = orders.filter(isStuck);

  if (stuck.length === 0) {
    return {
      stage: "Approval",
      amount: 0,
      headline: "Nothing stuck right now — pipeline is moving.",
      body: "Every PO is clearing within a week at each stage. That's rare in a 60-person business, and it usually means someone is actively chasing approvals and invoice matching. Keep that discipline.",
    };
  }

  const byStage = new Map<P2PStage, { amount: number; count: number }>();

  for (const po of stuck) {
    const current = byStage.get(po.stage) ?? { amount: 0, count: 0 };
    byStage.set(po.stage, {
      amount: current.amount + po.value,
      count: current.count + 1,
    });
  }

  let worstStage: P2PStage = stuck[0].stage;
  let worstAmount = 0;

  for (const [stage, { amount }] of byStage) {
    if (amount > worstAmount) {
      worstAmount = amount;
      worstStage = stage;
    }
  }

  const count = byStage.get(worstStage)?.count ?? 0;
  const formatted = formatCurrency(worstAmount);
  const avgDays = Math.round(
    stuck
      .filter((p) => p.stage === worstStage)
      .reduce((s, p) => s + p.daysAtStage, 0) / Math.max(count, 1)
  );

  const bodyByStage: Record<P2PStage, string> = {
    Requisition:
      "requests piling up before anyone approves them — I'd fix the routing rules this week.",
    Approval:
      "cash sitting still while vendors start chasing. I'd name the top 3 approvers and set a 48-hour SLA.",
    "PO Sent":
      "POs are out but nothing's moving to receipt — I'd call the top two vendors by value today.",
    "Goods Received":
      "goods received but invoices aren't matching — someone needs to chase before month-end.",
    Invoiced:
      "invoices sitting unmatched while vendors wait — I'd run a weekly clearing session until this drops below 5 days.",
    Paid: "",
  };

  return {
    stage: worstStage,
    amount: worstAmount,
    headline: `${worstStage} is where ${formatted} is sitting idle.`,
    body: `${count} PO${count === 1 ? "" : "s"} averaging ${avgDays} days at this stage — ${bodyByStage[worstStage]}`,
  };
}

export function groupByStage(
  orders: PurchaseOrder[]
): Record<P2PStage, PurchaseOrder[]> {
  const grouped = Object.fromEntries(
    P2P_STAGES.map((s) => [s, [] as PurchaseOrder[]])
  ) as Record<P2PStage, PurchaseOrder[]>;

  for (const po of orders) {
    grouped[po.stage].push(po);
  }

  return grouped;
}
