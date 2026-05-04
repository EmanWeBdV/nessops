import type { ActivityMessage } from "../types/task";

export const activityMessages: ActivityMessage[] = [
  {
    id: "MSG-1001",
    taskCode: "OPS-1025",
    authorId: "USR-002",
    author: "Giulia",
    role: "Capo BU Operations",
    body: "Marco, nella relazione evidenzia anche i vincoli di accesso al sito.",
    createdAt: "09:18",
  },
  {
    id: "MSG-1002",
    taskCode: "OPS-1025",
    authorId: "USR-001",
    author: "Marco",
    role: "Tecnico operativo",
    body: "Ricevuto. Li inserisco nella sezione note operative.",
    createdAt: "09:24",
  },
  {
    id: "MSG-1003",
    taskCode: "OPS-1025",
    author: "NessOps",
    role: "Sistema",
    body: "Attività avviata e impostata come attività attiva.",
    createdAt: "09:30",
    kind: "event",
  },
  {
    id: "MSG-1004",
    taskCode: "OPS-1026",
    author: "NessOps",
    role: "Sistema",
    body: "Attività messa in stand-by: attesa cliente.",
    createdAt: "10:05",
    kind: "event",
  },
];
