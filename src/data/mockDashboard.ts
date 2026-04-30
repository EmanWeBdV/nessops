import type { Task } from "../types/task";

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
  },
];
