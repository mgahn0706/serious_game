// src/features/calendar/components/MiniMonth.tsx
import { useMemo } from "react";
import { Svg } from "./Svg";
import {
  DOW_KR,
  endOfMonth,
  formatKoreanMonth,
  sameDay,
  startOfMonth,
} from "../utils/date";

export function MiniMonth({
  monthDate,
  selectedDate,
  onPickDate,
  onPrev,
  onNext,
}: {
  monthDate: Date;
  selectedDate: Date;
  onPickDate: (d: Date) => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const cells = useMemo(() => {
    const first = startOfMonth(monthDate);
    const last = endOfMonth(monthDate);

    const startWeekday = first.getDay();
    const daysInMonth = last.getDate();

    const grid: (Date | null)[] = [];
    for (let i = 0; i < startWeekday; i++) grid.push(null);

    for (let day = 1; day <= daysInMonth; day++) {
      grid.push(new Date(monthDate.getFullYear(), monthDate.getMonth(), day));
    }

    while (grid.length % 7 !== 0) grid.push(null);
    while (grid.length < 42) grid.push(null);

    return grid;
  }, [monthDate]);

  return (
    <div className="px-3 pt-2">
      <div className="flex items-center justify-between pb-2">
        <div className="text-[13px] font-medium text-gray-700">
          {formatKoreanMonth(monthDate)}
        </div>
        <div className="flex items-center gap-0.5">
          <button
            onClick={onPrev}
            className="rounded-full p-1 hover:bg-gray-100"
          >
            <Svg d="M15 18l-6-6 6-6" />
          </button>
          <button
            onClick={onNext}
            className="rounded-full p-1 hover:bg-gray-100"
          >
            <Svg d="M9 18l6-6-6-6" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-y-1 text-center text-[11px] text-gray-500">
        {DOW_KR.map((x) => (
          <div key={x} className="py-0.5">
            {x}
          </div>
        ))}
      </div>

      <div className="mt-1 grid grid-cols-7 gap-y-1 text-center">
        {cells.map((d, idx) => {
          const isSelected = d ? sameDay(d, selectedDate) : false;
          const isToday = d
            ? sameDay(d, new Date(2025, 11, 18, 21, 0, 0))
            : false;

          return (
            <button
              key={idx}
              disabled={!d}
              onClick={() => d && onPickDate(d)}
              className={[
                "mx-auto flex h-7 w-7 items-center justify-center rounded-full text-[12px]",
                d ? "hover:bg-gray-100" : "cursor-default opacity-0",
                isSelected ? "bg-[#1a73e8] text-white hover:bg-[#1a73e8]" : "",
                !isSelected && isToday ? "text-[#1a73e8] font-semibold" : "",
                !isSelected && !isToday ? "text-gray-800" : "",
              ].join(" ")}
              aria-label={d ? `${d.getDate()}` : "empty"}
            >
              {d?.getDate() ?? ""}
            </button>
          );
        })}
      </div>
    </div>
  );
}
