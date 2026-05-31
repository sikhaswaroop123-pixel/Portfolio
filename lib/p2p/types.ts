export const P2P_STAGES = [
  "Requisition",
  "Approval",
  "PO Sent",
  "Goods Received",
  "Invoiced",
  "Paid",
] as const;

export type P2PStage = (typeof P2P_STAGES)[number];

export type PurchaseOrder = {
  id: string;
  vendor: string;
  category: string;
  value: number;
  stage: P2PStage;
  daysAtStage: number;
  daysSinceRequisition: number;
};

export type ScenarioId = "default" | "healthy" | "invoice-chaos";

export type P2PKpis = {
  avgCycleDays: number;
  stuckCount: number;
  idleValue: number;
};

export type BiggestLeak = {
  stage: P2PStage;
  amount: number;
  headline: string;
  body: string;
};

export type AnalyzeRequest =
  | { type: "analyze"; data: PurchaseOrder[]; scenarioId?: ScenarioId }
  | {
      type: "question";
      data: PurchaseOrder[];
      question: string;
      scenarioId?: ScenarioId;
    };

export type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
};
