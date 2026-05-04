import type { MockCommunication, MockHrRequest } from "../types/user";

export const mockCommunications: MockCommunication[] = [
  {
    id: "COM-301",
    title: "Priorità operative settimana",
    body: "Le pratiche con scadenza cliente entro 48 ore vanno segnalate al Capo BU.",
    category: "operations",
    publishedAt: "2026-05-04T08:15:00",
    requiresAcknowledgement: true,
  },
  {
    id: "COM-302",
    title: "Promemoria note fine giornata",
    body: "Inserire note sintetiche solo quando servono a riprendere il contesto operativo.",
    category: "company",
    publishedAt: "2026-05-03T17:30:00",
    requiresAcknowledgement: false,
  },
];

export const mockHrRequests: MockHrRequest[] = [
  {
    id: "HR-118",
    userId: "USR-001",
    type: "permesso",
    status: "inviata",
    period: "2026-05-08 09:00-11:00",
    note: "Permesso personale da validare.",
  },
  {
    id: "HR-119",
    userId: "USR-004",
    type: "fuori sede",
    status: "approvata",
    period: "2026-05-06",
  },
];
