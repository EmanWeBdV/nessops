import type { TaskSector } from "./task";

export type UserRole =
  | "employee"
  | "operations_lead"
  | "administration"
  | "hr"
  | "admin";

export type MockUser = {
  id: string;
  name: string;
  role: string;
  roles: UserRole[];
  department: TaskSector;
  avatarUrl?: string;
  avatarColor?: string;
};

export type MockCommunication = {
  id: string;
  title: string;
  body: string;
  category: "operations" | "hr" | "company";
  publishedAt: string;
  requiresAcknowledgement: boolean;
};

export type MockHrRequest = {
  id: string;
  userId: string;
  type: "ferie" | "permesso" | "straordinario" | "fuori sede";
  status: "bozza" | "inviata" | "approvata" | "respinta";
  period: string;
  note?: string;
};
