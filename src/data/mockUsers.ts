import type { TaskAssignee } from "../types/task";
import type { MockUser } from "../types/user";

export const mockUsers: MockUser[] = [
  {
    id: "USR-001",
    name: "Marco Rossi",
    role: "Tecnico operativo",
    roles: ["employee"],
    department: "Area Operation",
    avatarColor: "#0166A4",
  },
  {
    id: "USR-002",
    name: "Giulia Bianchi",
    role: "Capo BU Operations",
    roles: ["employee", "operations_lead"],
    department: "Area Operation",
    avatarColor: "#97B822",
  },
  {
    id: "USR-003",
    name: "Laura Verdi",
    role: "Amministrazione",
    roles: ["employee", "administration"],
    department: "Amministrazione",
    avatarColor: "#B7791F",
  },
  {
    id: "USR-004",
    name: "Davide Neri",
    role: "Permitting specialist",
    roles: ["employee"],
    department: "Permitting",
    avatarColor: "#6B8FA8",
  },
];

export const mockCurrentUser = mockUsers[1];

export function getAssignee(userId: string): TaskAssignee {
  const user = mockUsers.find((item) => item.id === userId);

  if (!user) {
    throw new Error(`Mock user not found: ${userId}`);
  }

  return {
    id: user.id,
    name: user.name,
    role: user.role,
    avatarUrl: user.avatarUrl,
    avatarColor: user.avatarColor,
  };
}

export const marco = getAssignee("USR-001");
export const giulia = getAssignee("USR-002");
export const laura = getAssignee("USR-003");
export const davide = getAssignee("USR-004");
