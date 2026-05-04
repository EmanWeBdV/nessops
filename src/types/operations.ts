import type { TaskPriority, TaskSector } from "./task";

export type YesterdaySummary = {
  completed: number;
  openCarriedOver: number;
  standby: number;
};

export type DepartmentSummary = {
  department: TaskSector;
  leadUserId: string;
};

export type OperationalRequest = {
  id: string;
  title: string;
  requester: string;
  department: TaskSector;
  priority: TaskPriority;
  status: "nuova" | "in valutazione" | "assegnata" | "chiusa";
  receivedAt: string;
  linkedTaskCode?: string;
};
