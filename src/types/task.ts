export type TaskStatus =
  | "Da fare"
  | "In corso"
  | "In stand-by"
  | "Bloccata"
  | "Completata"
  | "Annullata";

export type TaskPriority = "Bassa" | "Media" | "Alta";

export type TaskSector =
  | "Ingegneria Esterna"
  | "Area Sviluppo"
  | "Area Operation"
  | "Sicurezza"
  | "Area Legale"
  | "Permitting"
  | "Amministrazione"
  | "GM"
  | "Progettazione esterna"
  | "Comunicazione e marketing"
  | "R&S e Gare"
  | "ASPI";

export type TaskAssignee = {
  id: string;
  name: string;
  role: string;
  avatarUrl?: string;
  avatarColor?: string;
};

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
  authorId?: string;
  author: string;
  role: string;
  body: string;
  createdAt: string;
  kind?: "message" | "event";
  mentions?: TaskAssignee[];
};

export type TaskChecklistItem = {
  id: string;
  title: string;
  completed: boolean;
  assignees: TaskAssignee[];
};

export type Task = {
  title: string;
  code: string;
  status: TaskStatus;
  priority: TaskPriority;
  description?: string;
  workTime?: string;
  standbyTime?: string;
  blockedTime?: string;
  standbyInfo?: StandbyInfo;
  assignees: TaskAssignee[];
  assignedAt: string;
  dueDate: string;
  sectors: TaskSector[];
  checklist: TaskChecklistItem[];
};
