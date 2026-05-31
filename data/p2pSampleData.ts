import type { PurchaseOrder, ScenarioId } from "@/lib/p2p/types";

export const defaultScenario: PurchaseOrder[] = [
  { id: "PO-2024-001", vendor: "Acme Stationery", category: "Office supplies", value: 450, stage: "Paid", daysAtStage: 2, daysSinceRequisition: 8 },
  { id: "PO-2024-002", vendor: "TechSupply UK", category: "IT equipment", value: 2400, stage: "Approval", daysAtStage: 12, daysSinceRequisition: 12 },
  { id: "PO-2024-003", vendor: "CleanPro Ltd", category: "Cleaning services", value: 1800, stage: "Paid", daysAtStage: 3, daysSinceRequisition: 14 },
  { id: "PO-2024-004", vendor: "BuildCo", category: "Facilities maintenance", value: 6200, stage: "Invoiced", daysAtStage: 19, daysSinceRequisition: 28 },
  { id: "PO-2024-005", vendor: "FreshEats Catering", category: "Catering", value: 980, stage: "Goods Received", daysAtStage: 6, daysSinceRequisition: 11 },
  { id: "PO-2024-006", vendor: "AdAgency", category: "Marketing", value: 4500, stage: "Approval", daysAtStage: 18, daysSinceRequisition: 18 },
  { id: "PO-2024-007", vendor: "LegalPartners", category: "Legal services", value: 3200, stage: "PO Sent", daysAtStage: 4, daysSinceRequisition: 7 },
  { id: "PO-2024-008", vendor: "OfficeMax", category: "Stationery", value: 320, stage: "Paid", daysAtStage: 1, daysSinceRequisition: 7 },
  { id: "PO-2024-009", vendor: "DataServ", category: "SaaS subscription", value: 1150, stage: "Approval", daysAtStage: 9, daysSinceRequisition: 9 },
  { id: "PO-2024-010", vendor: "SecureGuard", category: "Security services", value: 2100, stage: "Invoiced", daysAtStage: 22, daysSinceRequisition: 31 },
  { id: "PO-2024-011", vendor: "TechSupply UK", category: "IT consumables", value: 680, stage: "Goods Received", daysAtStage: 5, daysSinceRequisition: 10 },
  { id: "PO-2024-012", vendor: "EventPro", category: "Corporate event", value: 8500, stage: "Approval", daysAtStage: 24, daysSinceRequisition: 24 },
  { id: "PO-2024-013", vendor: "PrintWorks", category: "Marketing collateral", value: 540, stage: "Paid", daysAtStage: 2, daysSinceRequisition: 6 },
  { id: "PO-2024-014", vendor: "CleanPro Ltd", category: "Cleaning services", value: 1800, stage: "Invoiced", daysAtStage: 16, daysSinceRequisition: 24 },
  { id: "PO-2024-015", vendor: "TravelDesk", category: "Business travel", value: 2800, stage: "PO Sent", daysAtStage: 3, daysSinceRequisition: 5 },
];

/** Smooth flow — max 5 days at any stage, avg cycle ~12 days, nothing stuck >7 */
export const healthyScenario: PurchaseOrder[] = [
  { id: "PO-2024-101", vendor: "Acme Stationery", category: "Office supplies", value: 420, stage: "Paid", daysAtStage: 2, daysSinceRequisition: 10 },
  { id: "PO-2024-102", vendor: "TechSupply UK", category: "IT equipment", value: 2100, stage: "Paid", daysAtStage: 3, daysSinceRequisition: 12 },
  { id: "PO-2024-103", vendor: "CleanPro Ltd", category: "Cleaning services", value: 1650, stage: "Paid", daysAtStage: 2, daysSinceRequisition: 11 },
  { id: "PO-2024-104", vendor: "FreshEats Catering", category: "Catering", value: 890, stage: "Invoiced", daysAtStage: 4, daysSinceRequisition: 12 },
  { id: "PO-2024-105", vendor: "DataServ", category: "SaaS subscription", value: 1150, stage: "Paid", daysAtStage: 2, daysSinceRequisition: 9 },
  { id: "PO-2024-106", vendor: "OfficeMax", category: "Stationery", value: 280, stage: "Paid", daysAtStage: 1, daysSinceRequisition: 8 },
  { id: "PO-2024-107", vendor: "LegalPartners", category: "Legal services", value: 2900, stage: "Goods Received", daysAtStage: 5, daysSinceRequisition: 13 },
  { id: "PO-2024-108", vendor: "PrintWorks", category: "Marketing collateral", value: 510, stage: "Paid", daysAtStage: 2, daysSinceRequisition: 10 },
  { id: "PO-2024-109", vendor: "TravelDesk", category: "Business travel", value: 2400, stage: "PO Sent", daysAtStage: 3, daysSinceRequisition: 11 },
  { id: "PO-2024-110", vendor: "SecureGuard", category: "Security services", value: 1950, stage: "Paid", daysAtStage: 3, daysSinceRequisition: 14 },
  { id: "PO-2024-111", vendor: "BuildCo", category: "Facilities maintenance", value: 5800, stage: "Invoiced", daysAtStage: 4, daysSinceRequisition: 13 },
  { id: "PO-2024-112", vendor: "AdAgency", category: "Marketing", value: 3800, stage: "Approval", daysAtStage: 5, daysSinceRequisition: 12 },
  { id: "PO-2024-113", vendor: "EventPro", category: "Corporate event", value: 7200, stage: "Paid", daysAtStage: 2, daysSinceRequisition: 11 },
  { id: "PO-2024-114", vendor: "TechSupply UK", category: "IT consumables", value: 640, stage: "Paid", daysAtStage: 1, daysSinceRequisition: 9 },
  { id: "PO-2024-115", vendor: "FreshEats Catering", category: "Catering", value: 920, stage: "Goods Received", daysAtStage: 4, daysSinceRequisition: 12 },
];

/** Approval clears fast; Invoiced stage jammed with ~8 POs at ~18 days each */
export const invoiceChaosScenario: PurchaseOrder[] = [
  { id: "PO-2024-201", vendor: "BuildCo", category: "Facilities maintenance", value: 6200, stage: "Invoiced", daysAtStage: 19, daysSinceRequisition: 26 },
  { id: "PO-2024-202", vendor: "SecureGuard", category: "Security services", value: 2100, stage: "Invoiced", daysAtStage: 21, daysSinceRequisition: 29 },
  { id: "PO-2024-203", vendor: "CleanPro Ltd", category: "Cleaning services", value: 1800, stage: "Invoiced", daysAtStage: 17, daysSinceRequisition: 24 },
  { id: "PO-2024-204", vendor: "AdAgency", category: "Marketing", value: 4500, stage: "Invoiced", daysAtStage: 18, daysSinceRequisition: 25 },
  { id: "PO-2024-205", vendor: "EventPro", category: "Corporate event", value: 8500, stage: "Invoiced", daysAtStage: 20, daysSinceRequisition: 27 },
  { id: "PO-2024-206", vendor: "TechSupply UK", category: "IT equipment", value: 2400, stage: "Invoiced", daysAtStage: 16, daysSinceRequisition: 23 },
  { id: "PO-2024-207", vendor: "LegalPartners", category: "Legal services", value: 3200, stage: "Invoiced", daysAtStage: 18, daysSinceRequisition: 25 },
  { id: "PO-2024-208", vendor: "TravelDesk", category: "Business travel", value: 2800, stage: "Invoiced", daysAtStage: 17, daysSinceRequisition: 24 },
  { id: "PO-2024-209", vendor: "Acme Stationery", category: "Office supplies", value: 450, stage: "Paid", daysAtStage: 2, daysSinceRequisition: 9 },
  { id: "PO-2024-210", vendor: "DataServ", category: "SaaS subscription", value: 1150, stage: "Paid", daysAtStage: 1, daysSinceRequisition: 8 },
  { id: "PO-2024-211", vendor: "TechSupply UK", category: "IT consumables", value: 680, stage: "Approval", daysAtStage: 3, daysSinceRequisition: 6 },
  { id: "PO-2024-212", vendor: "FreshEats Catering", category: "Catering", value: 980, stage: "PO Sent", daysAtStage: 2, daysSinceRequisition: 7 },
  { id: "PO-2024-213", vendor: "OfficeMax", category: "Stationery", value: 320, stage: "Paid", daysAtStage: 1, daysSinceRequisition: 7 },
  { id: "PO-2024-214", vendor: "PrintWorks", category: "Marketing collateral", value: 540, stage: "Goods Received", daysAtStage: 4, daysSinceRequisition: 10 },
  { id: "PO-2024-215", vendor: "SecureGuard", category: "Security services", value: 1900, stage: "Approval", daysAtStage: 4, daysSinceRequisition: 8 },
];

export const scenarios: Record<ScenarioId, PurchaseOrder[]> = {
  default: defaultScenario,
  healthy: healthyScenario,
  "invoice-chaos": invoiceChaosScenario,
};

export const scenarioOrder: ScenarioId[] = ["default", "healthy", "invoice-chaos"];

export const scenarioLabels: Record<ScenarioId, string> = {
  default: "Approval-stuck (baseline)",
  healthy: "Healthy flow",
  "invoice-chaos": "Invoice chaos",
};

export function getNextScenario(current: ScenarioId): ScenarioId {
  const idx = scenarioOrder.indexOf(current);
  return scenarioOrder[(idx + 1) % scenarioOrder.length];
}
