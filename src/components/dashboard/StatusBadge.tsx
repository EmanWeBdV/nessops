type StatusBadgeProps = {
  label: string;
  variant:
    | "todo"
    | "progress"
    | "standby"
    | "blocked"
    | "completed"
    | "cancelled"
    | "low"
    | "medium"
    | "high";
};

const variants = {
  todo: "border-white/10 bg-white/[0.055] text-white/62",
  progress:
    "border-[#0166A4]/35 bg-[#0166A4]/18 text-blue-50",
  standby: "border-amber-300/24 bg-amber-300/12 text-amber-100/90",
  blocked: "border-red-300/24 bg-red-300/12 text-red-100/90",
  completed: "border-[#97B822]/28 bg-[#97B822]/12 text-[#E6F6A8]",
  cancelled: "border-white/10 bg-white/[0.035] text-white/42",
  low: "border-white/10 bg-white/[0.055] text-white/62",
  medium: "border-[#0166A4]/26 bg-[#0166A4]/12 text-blue-100/90",
  high: "border-[#97B822]/28 bg-[#97B822]/12 text-[#E6F6A8]",
};

export default function StatusBadge({ label, variant }: StatusBadgeProps) {
  const isInProgress = variant === "progress";

  return (
    <span
      className={`relative inline-flex items-center gap-2 overflow-hidden rounded-full border px-3 py-1 text-xs font-bold ${variants[variant]}`}
    >
      {isInProgress ? (
        <>
          <span className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-inset ring-blue-200/10" />
          <span className="h-1.5 w-1.5 rounded-full bg-blue-300/80" />
        </>
      ) : null}
      {label}
    </span>
  );
}
