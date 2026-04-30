import type { TaskPriority } from "../../types/task";

type PriorityBadgeProps = {
  priority: TaskPriority;
  size?: "sm" | "lg";
};

const priorityStyles = {
  Alta: {
    icon: "M12 3L2.5 20h19L12 3Zm0 5.75v5.5m0 2.75h.01",
    label: "Alta",
    tone: "Critica",
    classes: "border-red-300/40 bg-red-400/20 text-red-50 shadow-red-500/10",
    iconClasses: "bg-red-300 text-[#061521]",
  },
  Media: {
    icon: "M5 4v16M6 5h10l-1.5 4L16 13H6",
    label: "Media",
    tone: "Da presidiare",
    classes:
      "border-amber-300/40 bg-amber-300/20 text-amber-50 shadow-amber-400/10",
    iconClasses: "bg-amber-300 text-[#061521]",
  },
  Bassa: {
    icon: "M20 6L9 17l-5-5",
    label: "Bassa",
    tone: "Ordinaria",
    classes:
      "border-[#97B822]/35 bg-[#97B822]/15 text-[#E6F6A8] shadow-[#97B822]/10",
    iconClasses: "bg-[#97B822] text-[#061521]",
  },
};

export default function PriorityBadge({
  priority,
  size = "sm",
}: PriorityBadgeProps) {
  const style = priorityStyles[priority];
  const isLarge = size === "lg";

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-2xl border font-black shadow-lg ${style.classes} ${
        isLarge ? "px-3 py-2 text-sm" : "px-2.5 py-1.5 text-xs"
      }`}
    >
      <span
        className={`flex shrink-0 items-center justify-center rounded-xl ${style.iconClasses} ${
          isLarge ? "h-8 w-8" : "h-6 w-6"
        }`}
      >
        <svg
          aria-hidden="true"
          className={isLarge ? "h-4 w-4" : "h-3.5 w-3.5"}
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.4"
          viewBox="0 0 24 24"
        >
          <path d={style.icon} />
        </svg>
      </span>
      <span className="leading-tight">
        <span className="block">Priorità {style.label}</span>
        {isLarge ? (
          <span className="block text-[11px] font-semibold opacity-75">
            {style.tone}
          </span>
        ) : null}
      </span>
    </span>
  );
}
