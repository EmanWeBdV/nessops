import type { TaskAssignee } from "../../types/task";

type UserAvatarProps = {
  size?: "sm" | "md";
  user?: Pick<TaskAssignee, "avatarColor" | "avatarUrl" | "name">;
};

const sizes = {
  sm: "h-7 w-7 text-[10px]",
  md: "h-9 w-9 text-xs",
};

function getInitials(name = "NessOps") {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export default function UserAvatar({ size = "sm", user }: UserAvatarProps) {
  const name = user?.name ?? "NessOps";

  if (user?.avatarUrl) {
    return (
      <span
        aria-label={`Foto profilo ${name}`}
        className={`${sizes[size]} shrink-0 rounded-full border border-white/20 bg-cover bg-center`}
        role="img"
        style={{ backgroundImage: `url(${user.avatarUrl})` }}
      />
    );
  }

  return (
    <span
      className={`${sizes[size]} flex shrink-0 items-center justify-center rounded-full border border-white/20 font-black text-white shadow-lg shadow-black/20`}
      style={{ backgroundColor: user?.avatarColor ?? "#0166A4" }}
    >
      {getInitials(name)}
    </span>
  );
}
