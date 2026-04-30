export type TaskStatus =
  | "Da fare"
  | "In corso"
  | "In stand-by"
  | "Bloccata"
  | "Completata"
  | "Annullata";

export type TaskPriority = "Bassa" | "Media" | "Alta";

export type StandbyReason =
  | "attesa cliente"
  | "attesa amministrazione"
  | "attesa collega"
  | "attesa documenti"
  | "attesa materiale"
  | "problema tecnico"
  | "attività dipendente da un'altra attività"
  | "altro";

export type StandbyInfo = {
  reason: StandbyReason;
  note?: string;
  blockingTaskCode?: string;
};

export type ActivityMessage = {
  id: string;
  taskCode: string;
  author: string;
  role: string;
  body: string;
  createdAt: string;
  kind?: "message" | "event";
};

export type Task = {
  title: string;
  code: string;
  status: TaskStatus;
  priority: TaskPriority;
  action: string;
  accent: string;
  description?: string;
  workTime?: string;
  standbyTime?: string;
  blockedTime?: string;
  standbyInfo?: StandbyInfo;
};
