type DueDateBadgeProps = {
  dueDate: string;
  size?: "sm" | "lg";
};

function getDaysUntilDue(dueDate: string) {
  const today = new Date();
  const currentDay = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  ).getTime();
  const due = new Date(dueDate);
  const dueDay = new Date(
    due.getFullYear(),
    due.getMonth(),
    due.getDate(),
  ).getTime();

  return Math.round((dueDay - currentDay) / 86_400_000);
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("it-IT", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(value));
}

function getDueDateStyle(daysUntilDue: number) {
  if (daysUntilDue < 0) {
    return {
      icon: "M12 9v4m0 4h.01M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z",
      label: "Scaduta",
      classes: "border-red-300/45 bg-red-400/20 text-red-50 shadow-red-500/10",
      iconClasses: "bg-red-300 text-[#061521]",
    };
  }

  if (daysUntilDue === 0) {
    return {
      icon: "M12 8v5l3 2m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
      label: "Scade oggi",
      classes: "border-red-300/45 bg-red-400/20 text-red-50 shadow-red-500/10",
      iconClasses: "bg-red-300 text-[#061521]",
    };
  }

  if (daysUntilDue <= 2) {
    return {
      icon: "M5 4v16M6 5h10l-1.5 4L16 13H6",
      label: `${daysUntilDue}g rimasti`,
      classes:
        "border-amber-300/45 bg-amber-300/20 text-amber-50 shadow-amber-400/10",
      iconClasses: "bg-amber-300 text-[#061521]",
    };
  }

  return {
    icon: "M20 6L9 17l-5-5",
    label: `${daysUntilDue}g rimasti`,
    classes:
      "border-[#97B822]/35 bg-[#97B822]/15 text-[#E6F6A8] shadow-[#97B822]/10",
    iconClasses: "bg-[#97B822] text-[#061521]",
  };
}

export default function DueDateBadge({ dueDate, size = "sm" }: DueDateBadgeProps) {
  const daysUntilDue = getDaysUntilDue(dueDate);
  const style = getDueDateStyle(daysUntilDue);
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
        <span className="block">{style.label}</span>
        {isLarge ? (
          <span className="block text-[11px] font-semibold opacity-75">
            {formatDate(dueDate)}
          </span>
        ) : null}
      </span>
    </span>
  );
}
