import type { DepartmentSummary, OperationalRequest } from "../types/operations";

export const mockDepartmentSummary: DepartmentSummary = {
  department: "Area Operation",
  leadUserId: "USR-002",
};

export const mockOperationalRequests: OperationalRequest[] = [
  {
    id: "REQ-2041",
    title: "Nuova verifica documentale Cliente Delta",
    requester: "Amministrazione",
    department: "Area Operation",
    priority: "Alta",
    status: "nuova",
    receivedAt: "2026-05-04T08:40:00",
  },
  {
    id: "REQ-2042",
    title: "Aggiornamento priorità pratica Gamma",
    requester: "Permitting",
    department: "Area Operation",
    priority: "Media",
    status: "assegnata",
    receivedAt: "2026-05-04T09:10:00",
    linkedTaskCode: "OPS-1029",
  },
];
