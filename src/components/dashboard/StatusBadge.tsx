type StatusBadgeProps = {
  label: string;
  variant: "todo" | "progress" | "standby" | "completed" | "low" | "medium" | "high";
};

const variants = {
  todo: "border-white/15 bg-white/10 text-white/70",
  progress: "border-[#0166A4]/40 bg-[#0166A4]/25 text-blue-100",
  standby: "border-amber-300/35 bg-amber-300/20 text-amber-100",
  completed: "border-[#97B822]/40 bg-[#97B822]/20 text-[#E6F6A8]",
  low: "border-white/15 bg-white/10 text-white/70",
  medium: "border-[#0166A4]/40 bg-[#0166A4]/20 text-blue-100",
  high: "border-[#97B822]/40 bg-[#97B822]/20 text-[#E6F6A8]",
};

export default function StatusBadge({ label, variant }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-bold ${variants[variant]}`}
    >
      {label}
    </span>
  );
}