export type TaskStatus =
  | "Da fare"
  | "In corso"
  | "In stand-by"
  | "Bloccata"
  | "Completata"
  | "Annullata";

export type TaskPriority = "Bassa" | "Media" | "Alta";

export type Task = {
  title: string;
  code: string;
  status: TaskStatus;
  priority: TaskPriority;
  action: string;
  accent: string;
  description?: string;
  workTime?: string;
};
