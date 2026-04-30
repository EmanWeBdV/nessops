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
  todo: "border-white/15 bg-white/10 text-white/70",
  progress:
    "border-[#0166A4]/70 bg-[#0166A4]/30 text-blue-50 shadow-lg shadow-[#0166A4]/20",
  standby: "border-amber-300/35 bg-amber-300/20 text-amber-100",
  blocked: "border-red-300/35 bg-red-300/20 text-red-100",
  completed: "border-[#97B822]/40 bg-[#97B822]/20 text-[#E6F6A8]",
  cancelled: "border-white/15 bg-white/5 text-white/45",
  low: "border-white/15 bg-white/10 text-white/70",
  medium: "border-[#0166A4]/40 bg-[#0166A4]/20 text-blue-100",
  high: "border-[#97B822]/40 bg-[#97B822]/20 text-[#E6F6A8]",
};

export default function StatusBadge({ label, variant }: StatusBadgeProps) {
  const isInProgress = variant === "progress";

  return (
    <span
      className={`relative inline-flex items-center gap-2 overflow-hidden rounded-full border px-3 py-1 text-xs font-bold ${variants[variant]}`}
    >
      {isInProgress ? (
        <>
          <span className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-inset ring-blue-200/15 shadow-[inset_0_0_8px_rgba(147,197,253,0.08)]" />
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-blue-300/80 shadow-[0_0_5px_rgba(147,197,253,0.45)]" />
        </>
      ) : null}
      {label}
    </span>
  );
}
