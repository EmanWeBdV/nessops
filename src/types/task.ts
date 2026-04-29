export type TaskStatus = "Da fare" | "In corso" | "Stand-by" | "Completata";

export type TaskPriority = "Bassa" | "Media" | "Alta";

export type Task = {
  title: string;
  code: string;
  status: TaskStatus;
  priority: TaskPriority;
  action: string;
  accent: string;
};