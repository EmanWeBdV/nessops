import type { ActivityMessage, Task } from "../types/task";

const marco = {
  id: "USR-001",
  name: "Marco Rossi",
  role: "Tecnico operativo",
  avatarColor: "#0166A4",
};

const giulia = {
  id: "USR-002",
  name: "Giulia Bianchi",
  role: "Capo BU Operations",
  avatarColor: "#97B822",
};

const laura = {
  id: "USR-003",
  name: "Laura Verdi",
  role: "Amministrazione",
  avatarColor: "#B7791F",
};

export const mockCurrentUser = marco;

export const mockYesterdaySummary = {
  completed: 5,
  openCarriedOver: 2,
  standby: 1,
};

export const tasks: Task[] = [
  {
    title: "Verifica documenti Cliente Alfa",
    code: "OPS-1024",
    status: "Da fare",
    priority: "Alta",
    description:
      "Controllo documentale della pratica cliente prima della lavorazione operativa.",
    workTime: "0h 00m",
    standbyTime: "0h 00m",
    blockedTime: "0h 00m",
    assignees: [marco, laura],
    assignedAt: "2026-04-29",
    dueDate: "2026-04-30",
    sectors: ["Amministrazione", "Area Operation"],
    checklist: [
      {
        id: "CHK-1024-1",
        title: "Controllare documenti anagrafici",
        completed: false,
        assignees: [laura],
      },
      {
        id: "CHK-1024-2",
        title: "Verificare allegati tecnici",
        completed: false,
        assignees: [marco],
      },
    ],
  },
  {
    title: "Preparare relazione impianto FV 1MW",
    code: "OPS-1025",
    status: "In corso",
    priority: "Media",
    description:
      "Bozza relazione tecnica con strutture fisse, vincoli e note operative collegate alla pratica.",
    workTime: "1h 20m",
    standbyTime: "0h 00m",
    blockedTime: "0h 00m",
    assignees: [marco, giulia],
    assignedAt: "2026-04-28",
    dueDate: "2026-05-02",
    sectors: ["Ingegneria Esterna", "Area Operation"],
    checklist: [
      {
        id: "CHK-1025-1",
        title: "Raccogliere vincoli sito",
        completed: true,
        assignees: [marco],
      },
      {
        id: "CHK-1025-2",
        title: "Preparare bozza relazione",
        completed: false,
        assignees: [marco],
      },
      {
        id: "CHK-1025-3",
        title: "Validazione finale Capo BU",
        completed: false,
        assignees: [giulia],
      },
    ],
  },
  {
    title: "Contatto cliente Beta",
    code: "OPS-1026",
    status: "In stand-by",
    priority: "Media",
    description:
      "Richiamare il cliente per integrare le informazioni mancanti della richiesta.",
    workTime: "0h 45m",
    standbyTime: "0h 35m",
    blockedTime: "0h 00m",
    standbyInfo: {
      reason: "attesa cliente",
      note: "In attesa di conferma sui dati mancanti.",
    },
    assignees: [marco],
    assignedAt: "2026-04-29",
    dueDate: "2026-04-30",
    sectors: ["Area Sviluppo", "Comunicazione e marketing"],
    checklist: [
      {
        id: "CHK-1026-1",
        title: "Inviare richiesta integrazione dati",
        completed: true,
        assignees: [marco],
      },
      {
        id: "CHK-1026-2",
        title: "Aggiornare scheda cliente",
        completed: false,
        assignees: [marco],
      },
    ],
  },
  {
    title: "Accesso sistema gestionale",
    code: "OPS-1027",
    status: "Bloccata",
    priority: "Alta",
    description:
      "Impossibile accedere al gestionale per credenziali scadute. In attesa di reset da IT.",
    workTime: "0h 15m",
    standbyTime: "0h 00m",
    blockedTime: "1h 10m",
    assignees: [marco],
    assignedAt: "2026-04-30",
    dueDate: "2026-04-30",
    sectors: ["Area Operation", "Amministrazione"],
    checklist: [
      {
        id: "CHK-1027-1",
        title: "Segnalare il problema a IT",
        completed: true,
        assignees: [marco],
      },
      {
        id: "CHK-1027-2",
        title: "Ricevere nuove credenziali",
        completed: false,
        assignees: [marco],
      },
    ],
  },
  {
    title: "Preparare presentazione Q1",
    code: "OPS-1028",
    status: "Annullata",
    priority: "Bassa",
    description:
      "Presentazione annullata dalla direzione. Sostituita con report sintetico via email.",
    workTime: "0h 30m",
    standbyTime: "0h 00m",
    blockedTime: "0h 00m",
    assignees: [giulia],
    assignedAt: "2026-04-25",
    dueDate: "2026-04-28",
    sectors: ["GM", "Comunicazione e marketing"],
    checklist: [
      {
        id: "CHK-1028-1",
        title: "Raccogliere dati Q1",
        completed: true,
        assignees: [giulia],
      },
    ],
  },
];

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
