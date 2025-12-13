// src/features/calendar/components/ViewModeSegment.tsx
import React from "react";

export type ViewMode = "Day" | "Week" | "Month";

export function ViewModeSegment({
  value,
  onChange,
}: {
  value: ViewMode;
  onChange: (v: ViewMode) => void;
}) {
  const items: { v: ViewMode; label: string }[] = [
    { v: "Day", label: "일" },
    { v: "Week", label: "주" },
    { v: "Month", label: "월" },
  ];

  return (
    <div className="flex items-center rounded-full border border-gray-300 bg-white p-0.5">
      {items.map((it) => {
        const active = it.v === value;
        return (
          <button
            key={it.v}
            onClick={() => onChange(it.v)}
            className={[
              "px-3 py-2 text-[13px] font-medium rounded-full",
              active
                ? "bg-gray-100 text-gray-900"
                : "text-gray-700 hover:bg-gray-50",
            ].join(" ")}
          >
            {it.label}
          </button>
        );
      })}
    </div>
  );
}
