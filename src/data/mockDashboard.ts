import type { ActivityMessage, Task } from "../types/task";

export const tasks: Task[] = [
  {
    title: "Verifica documenti Cliente Alfa",
    code: "OPS-1024",
    status: "Da fare",
    priority: "Alta",
    action: "Inizia",
    accent: "bg-[#97B822]",
    description:
      "Controllo documentale della pratica cliente prima della lavorazione operativa.",
    workTime: "0h 00m",
    standbyTime: "0h 00m",
    blockedTime: "0h 00m",
  },
  {
    title: "Preparare relazione impianto FV 1MW",
    code: "OPS-1025",
    status: "In corso",
    priority: "Media",
    action: "Termina",
    accent: "bg-[#0166A4]",
    description:
      "Bozza relazione tecnica con strutture fisse, vincoli e note operative collegate alla pratica.",
    workTime: "1h 20m",
    standbyTime: "0h 00m",
    blockedTime: "0h 00m",
  },
  {
    title: "Contatto cliente Beta",
    code: "OPS-1026",
    status: "In stand-by",
    priority: "Media",
    action: "Riprendi",
    accent: "bg-amber-400",
    description:
      "Richiamare il cliente per integrare le informazioni mancanti della richiesta.",
    workTime: "0h 45m",
    standbyTime: "0h 35m",
    blockedTime: "0h 00m",
    standbyInfo: {
      reason: "attesa cliente",
      note: "In attesa di conferma sui dati mancanti.",
    },
  },
];

export const activityMessages: ActivityMessage[] = [
  {
    id: "MSG-1001",
    taskCode: "OPS-1025",
    author: "Giulia",
    role: "Capo BU Operations",
    body: "Marco, nella relazione evidenzia anche i vincoli di accesso al sito.",
    createdAt: "09:18",
  },
  {
    id: "MSG-1002",
    taskCode: "OPS-1025",
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
