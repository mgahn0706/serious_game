// src/features/calendar/components/TimeGridDay.tsx
import { useMemo } from "react";
import type { CalendarEvent } from "@/features/calendar/types/types";
import { formatAmPmHour, formatAmPmTime, sameDay } from "../utils/date";

export function TimeGridDay({
  date,
  startHour = 8,
  endHour = 23,
  now,
  events,
}: {
  date: Date;
  startHour?: number;
  endHour?: number;
  now: Date;
  events: CalendarEvent[];
}) {
  const isSameDateAsNow = sameDay(date, now);

  const rowH = 64;
  const totalHours = endHour - startHour + 1;
  const gridHeight = totalHours * rowH;

  const minutesPerPx = 60 / rowH;

  const dayEvents = useMemo(() => {
    const clamp = (v: number, lo: number, hi: number) =>
      Math.max(lo, Math.min(hi, v));

    const dayStart = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );
    const dayEnd = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() + 1
    );

    return events
      .map((ev) => {
        const s = new Date(ev.start);
        const e = new Date(ev.end);

        // minimal behavior: show events that START on this day
        if (s < dayStart || s >= dayEnd) return null;

        const startMin = (s.getHours() - startHour) * 60 + s.getMinutes();
        const endMin = (e.getHours() - startHour) * 60 + e.getMinutes();

        const gridStartMin = 0;
        const gridEndMin = (endHour - startHour + 1) * 60;

        const clampedStart = clamp(startMin, gridStartMin, gridEndMin);
        const clampedEnd = clamp(endMin, gridStartMin, gridEndMin);

        const top = clampedStart / minutesPerPx;
        const height = Math.max(18, (clampedEnd - clampedStart) / minutesPerPx);

        return { ev, top, height, s, e };
      })
      .filter(Boolean) as {
      ev: CalendarEvent;
      top: number;
      height: number;
      s: Date;
      e: Date;
    }[];
  }, [events, date, startHour, endHour, minutesPerPx]);

  const nowPos = useMemo(() => {
    // ✅ 12/18은 데모용으로 빨간선 9PM(21:00)에 고정
    const isDec18 =
      date.getMonth() === 11 && // December (0-indexed)
      date.getDate() === 18;

    if (!isSameDateAsNow && !isDec18) return null;

    const h = isDec18 ? 19 : now.getHours();
    const m = isDec18 ? 10 : now.getMinutes();

    const minutesFromStart = (h - startHour) * 60 + m;
    const maxMinutes = (endHour - startHour + 1) * 60;
    const clamped = Math.max(0, Math.min(maxMinutes, minutesFromStart));

    return (clamped / 60) * rowH;
  }, [isSameDateAsNow, date, now, startHour, endHour, rowH]);

  return (
    <div className="relative flex-1 overflow-auto bg-white">
      <div className="min-w-[920px]">
        <div className="h-6" />

        <div className="relative">
          <div className="absolute left-0 top-0 w-[72px]">
            {Array.from({ length: totalHours }, (_, i) => {
              const h = startHour + i;
              return (
                <div
                  key={h}
                  style={{ height: rowH }}
                  className="relative pr-3 text-right"
                >
                  <div className="absolute -top-[10px] right-3 text-[11px] text-gray-500">
                    {formatAmPmHour(h)}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="absolute left-[72px] top-0 h-full w-px bg-gray-200" />

          <div className="ml-[72px] relative" style={{ height: gridHeight }}>
            {Array.from({ length: totalHours }, (_, i) => (
              <div
                key={i}
                style={{ height: rowH }}
                className="border-t border-gray-200"
              />
            ))}

            <div className="absolute inset-0">
              {dayEvents.map(({ ev, top, height, s, e }) => {
                const filled = ev.variant === "filled";
                const base =
                  "absolute left-[8px] right-[10px] rounded-md text-[12px] leading-tight px-2 py-1.5";
                const outlinedStyle =
                  "border border-[#1a73e8] bg-white text-[#1a73e8]";
                const filledStyle = "bg-[#039be5] text-white";

                return (
                  <div
                    key={ev.id}
                    style={{ top, height }}
                    className={[
                      base,
                      filled ? filledStyle : outlinedStyle,
                    ].join(" ")}
                  >
                    <div className="font-medium">{ev.title}</div>
                    <div
                      className={filled ? "text-white/90" : "text-[#1a73e8]/90"}
                    >
                      {formatAmPmTime(s)}~{formatAmPmTime(e)}
                    </div>
                    {ev.location && (
                      <div
                        className={
                          filled ? "text-white/90" : "text-[#1a73e8]/90"
                        }
                      >
                        {ev.location}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {nowPos !== null && (
              <div
                className="pointer-events-none absolute left-0 right-0"
                style={{ top: nowPos }}
              >
                <div className="relative">
                  <div className="absolute -left-[6px] top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-[#d93025]" />
                  <div className="h-[2px] w-full bg-[#d93025]" />
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="h-10" />
      </div>
    </div>
  );
}
