// src/features/calendar/components/MonthView.tsx
import { useMemo } from "react";
import type { CalendarEvent } from "@/features/calendar/types/types";
import { DOW_KR, endOfMonth, sameDay, startOfMonth } from "../utils/date";

export function MonthView({
  monthAnchor,
  selectedDate,
  onPickDate,
  events,
}: {
  monthAnchor: Date;
  selectedDate: Date;
  onPickDate: (d: Date) => void;
  events: CalendarEvent[];
}) {
  const cells = useMemo(() => {
    const first = startOfMonth(monthAnchor);
    const last = endOfMonth(monthAnchor);

    const startWeekday = first.getDay();
    const daysInMonth = last.getDate();

    const grid: (Date | null)[] = [];
    for (let i = 0; i < startWeekday; i++) grid.push(null);
    for (let day = 1; day <= daysInMonth; day++) {
      grid.push(
        new Date(monthAnchor.getFullYear(), monthAnchor.getMonth(), day)
      );
    }
    while (grid.length % 7 !== 0) grid.push(null);
    while (grid.length < 42) grid.push(null);
    return grid;
  }, [monthAnchor]);

  const eventsByKey = useMemo(() => {
    const map = new Map<string, { ev: CalendarEvent; s: Date; e: Date }[]>();
    for (const ev of events) {
      const s = new Date(ev.start);
      const e = new Date(ev.end);
      const k = `${s.getFullYear()}-${s.getMonth()}-${s.getDate()}`;
      if (!map.has(k)) map.set(k, []);
      map.get(k)!.push({ ev, s, e });
    }
    for (const [, list] of map)
      list.sort((a, b) => a.s.getTime() - b.s.getTime());
    return map;
  }, [events]);

  return (
    <div className="flex-1 overflow-auto bg-white">
      <div className="min-w-[980px]">
        <div className="h-6" />

        <div className="grid grid-cols-7 border-t border-gray-200">
          {DOW_KR.map((d) => (
            <div
              key={d}
              className="px-3 py-2 text-[12px] text-gray-500 border-b border-gray-200"
            >
              {d}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7">
          {cells.map((d, idx) => {
            const isSelected = d ? sameDay(d, selectedDate) : false;
            const isToday = d ? sameDay(d, new Date()) : false;
            const k = d
              ? `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`
              : "";
            const list = d ? eventsByKey.get(k) ?? [] : [];

            return (
              <div
                key={idx}
                className={[
                  "h-[132px] border-b border-gray-200 border-l border-gray-200 first:border-l-0 p-2",
                  d ? "bg-white" : "bg-gray-50/40",
                ].join(" ")}
              >
                {d ? (
                  <button
                    onClick={() => onPickDate(d)}
                    className="w-full text-left"
                    aria-label={`pick-${k}`}
                  >
                    <div className="flex items-center justify-between">
                      <div
                        className={[
                          "flex h-7 w-7 items-center justify-center rounded-full text-[12px]",
                          isSelected ? "bg-[#1a73e8] text-white" : "",
                          !isSelected && isToday
                            ? "text-[#1a73e8] font-semibold"
                            : "",
                          !isSelected && !isToday ? "text-gray-800" : "",
                        ].join(" ")}
                      >
                        {d.getDate()}
                      </div>
                    </div>

                    <div className="mt-2 space-y-1">
                      {list.slice(0, 2).map(({ ev }) => {
                        const filled = ev.variant === "filled";
                        const cls = filled
                          ? "bg-[#039be5] text-white"
                          : "border border-[#1a73e8] bg-white text-[#1a73e8]";
                        return (
                          <div
                            key={ev.id}
                            className={`rounded px-1.5 py-1 text-[11px] leading-tight truncate ${cls}`}
                            title={ev.title}
                          >
                            {ev.title}
                          </div>
                        );
                      })}
                      {list.length > 2 && (
                        <div className="text-[11px] text-gray-500">
                          +{list.length - 2}개
                        </div>
                      )}
                    </div>
                  </button>
                ) : null}
              </div>
            );
          })}
        </div>

        <div className="h-10" />
      </div>
    </div>
  );
}
