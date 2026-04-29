import type { Task } from "@/types/task";

export const tasks: Task[] = [
  {
    title: "Verifica documenti Cliente Alfa",
    code: "OPS-1024",
    status: "Da fare",
    priority: "Alta",
    action: "Inizia",
    accent: "bg-[#97B822]",
  },
  {
    title: "Preparare relazione impianto FV 1MW",
    code: "OPS-1025",
    status: "In corso",
    priority: "Media",
    action: "Apri",
    accent: "bg-[#0166A4]",
  },
  {
    title: "Contatto cliente Beta",
    code: "OPS-1026",
    status: "Stand-by",
    priority: "Media",
    action: "Riprendi",
    accent: "bg-amber-400",
  },
];