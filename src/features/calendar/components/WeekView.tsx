// src/features/calendar/components/WeekView.tsx
import { useMemo } from "react";
import type { CalendarEvent } from "@/features/calendar/types/types";
import {
  DOW_KR,
  addDays,
  formatAmPmHour,
  sameDay,
  startOfWeek,
} from "../utils/date";

type PositionedEvent = {
  ev: CalendarEvent;
  dayIndex: number; // 0..6
  top: number; // px
  height: number; // px
  s: Date;
  e: Date;
};

type AllDayBucketItem = {
  ev: CalendarEvent;
  dayIndex: number; // 0..6
  s: Date;
  e: Date;
};

function keyOfDay(d: Date) {
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
}

// Robust-ish "all day" detector (works even if fixture doesn't have allDay flag)
function isAllDayEvent(ev: CalendarEvent) {
  // If your type has a true allDay field, this will use it.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const anyEv = ev as any;
  if (typeof anyEv.allDay === "boolean") return anyEv.allDay;
  if (typeof anyEv.isAllDay === "boolean") return anyEv.isAllDay;

  const s = new Date(ev.start);
  const e = new Date(ev.end);

  const startAtMidnight = s.getHours() === 0 && s.getMinutes() === 0;
  const endAtMidnight = e.getHours() === 0 && e.getMinutes() === 0;

  const durMin = Math.max(0, (e.getTime() - s.getTime()) / 60000);

  // Common all-day encodings:
  // - start 00:00, end 00:00 next day
  // - start 00:00, duration >= 24h
  // - OR a long (23h+) event with midnight boundaries
  if (startAtMidnight && endAtMidnight && durMin >= 24 * 60) return true;
  if (startAtMidnight && durMin >= 24 * 60) return true;
  if (startAtMidnight && endAtMidnight && durMin >= 23 * 60) return true;

  return false;
}

export function WeekView({
  anchorDate,
  events,
  startHour = 6,
  endHour = 21,
}: {
  anchorDate: Date;
  events: CalendarEvent[];
  startHour?: number;
  endHour?: number;
}) {
  const weekStart = useMemo(() => startOfWeek(anchorDate), [anchorDate]);
  const days = useMemo(
    () => Array.from({ length: 7 }, (_, i) => addDays(weekStart, i)),
    [weekStart]
  );

  // Layout tuned to resemble Google Week view
  const timeColW = 72; // left gutter
  const rowH = 64; // px per hour
  const totalHours = endHour - startHour + 1;
  const gridHeight = totalHours * rowH;
  const minutesPerPx = 60 / rowH;

  // Build buckets: all-day + timed, including overlap across days
  const { allDayItems, positionedTimed } = useMemo(() => {
    const clamp = (v: number, lo: number, hi: number) =>
      Math.max(lo, Math.min(hi, v));

    const allDay: AllDayBucketItem[] = [];
    const timed: PositionedEvent[] = [];

    // Precompute each day boundaries
    const dayBounds = days.map((d, idx) => {
      const start = new Date(
        d.getFullYear(),
        d.getMonth(),
        d.getDate(),
        0,
        0,
        0
      );
      const end = new Date(
        d.getFullYear(),
        d.getMonth(),
        d.getDate() + 1,
        0,
        0,
        0
      );
      return { idx, start, end };
    });

    for (const ev of events) {
      const s0 = new Date(ev.start);
      const e0 = new Date(ev.end);

      // If end <= start, skip (bad data)
      if (!(e0.getTime() > s0.getTime())) continue;

      const allDayLike = isAllDayEvent(ev);

      for (const { idx, start: dStart, end: dEnd } of dayBounds) {
        // overlap check (event intersects this day)
        const overlaps = s0 < dEnd && e0 > dStart;
        if (!overlaps) continue;

        if (allDayLike) {
          allDay.push({ ev, dayIndex: idx, s: s0, e: e0 });
          continue;
        }

        // timed: clamp to visible hours for this day
        const visibleStart = new Date(
          dStart.getFullYear(),
          dStart.getMonth(),
          dStart.getDate(),
          startHour,
          0,
          0
        );
        const visibleEnd = new Date(
          dStart.getFullYear(),
          dStart.getMonth(),
          dStart.getDate(),
          endHour + 1,
          0,
          0
        );

        const segStart = new Date(
          Math.max(s0.getTime(), visibleStart.getTime())
        );
        const segEnd = new Date(Math.min(e0.getTime(), visibleEnd.getTime()));
        if (!(segEnd.getTime() > segStart.getTime())) continue;

        const startMin =
          (segStart.getHours() - startHour) * 60 + segStart.getMinutes();
        const endMin =
          (segEnd.getHours() - startHour) * 60 + segEnd.getMinutes();

        const gridStartMin = 0;
        const gridEndMin = (endHour - startHour + 1) * 60;

        const clampedStart = clamp(startMin, gridStartMin, gridEndMin);
        const clampedEnd = clamp(endMin, gridStartMin, gridEndMin);

        const top = clampedStart / minutesPerPx;
        const height = Math.max(18, (clampedEnd - clampedStart) / minutesPerPx);

        timed.push({ ev, dayIndex: idx, top, height, s: segStart, e: segEnd });
      }
    }

    // sort timed per day by top
    timed.sort((a, b) => a.dayIndex - b.dayIndex || a.top - b.top);

    return { allDayItems: allDay, positionedTimed: timed };
  }, [events, days, startHour, endHour, minutesPerPx]);

  const now = useMemo(() => new Date(2025, 11, 18, 19, 10, 0), []);
  const nowLine = useMemo(() => {
    const todayIdx = days.findIndex((d) => sameDay(d, now));
    if (todayIdx < 0) return null;

    const minsFromStart = (now.getHours() - startHour) * 60 + now.getMinutes();
    const maxMin = (endHour - startHour + 1) * 60;
    if (minsFromStart < 0 || minsFromStart > maxMin) return null;

    const top = (minsFromStart / 60) * rowH;
    return { dayIndex: todayIdx, top };
  }, [days, now, startHour, endHour, rowH]);

  // All-day items grouped by dayIndex (keep minimal: stack within each day cell)
  const allDayByDay = useMemo(() => {
    const map = new Map<number, AllDayBucketItem[]>();
    for (let i = 0; i < 7; i++) map.set(i, []);
    for (const it of allDayItems) map.get(it.dayIndex)!.push(it);
    return map;
  }, [allDayItems]);

  const formatRange = (s: Date, e: Date) => {
    const fmt = (d: Date) => {
      const isPM = d.getHours() >= 12;
      const h12 = ((d.getHours() + 11) % 12) + 1;
      const mm = String(d.getMinutes()).padStart(2, "0");
      return `${isPM ? "PM" : "AM"} ${h12}${d.getMinutes() ? `:${mm}` : ""}`;
    };
    return `${fmt(s)}~${fmt(e)}`;
  };

  return (
    <div className="flex-1 overflow-auto bg-white">
      <div className="min-w-[980px]">
        {/* Top padding like Google */}
        <div className="h-4" />

        {/* Sticky week header (day names + dates) */}
        <div className="sticky top-0 z-20 bg-white">
          <div
            className="grid border-b border-gray-200"
            style={{
              gridTemplateColumns: `${timeColW}px repeat(7, minmax(0, 1fr))`,
            }}
          >
            <div className="px-3 py-3 text-[11px] text-gray-500">GMT+09</div>

            {days.map((d, idx) => {
              const isToday = sameDay(d, new Date());
              const isSelected = sameDay(d, anchorDate);

              return (
                <div key={keyOfDay(d)} className="px-3 py-2">
                  <div className="text-[12px] text-gray-500">{DOW_KR[idx]}</div>
                  <div className="mt-1 flex items-center">
                    <div
                      className={[
                        "flex h-10 w-10 items-center justify-center rounded-full text-[18px] font-medium",
                        isSelected ? "bg-[#1a73e8] text-white" : "",
                        !isSelected && isToday ? "text-[#1a73e8]" : "",
                        !isSelected && !isToday ? "text-gray-800" : "",
                      ].join(" ")}
                    >
                      {d.getDate()}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* All-day row */}
          <div
            className="grid border-b border-gray-200 bg-white"
            style={{
              gridTemplateColumns: `${timeColW}px repeat(7, minmax(0, 1fr))`,
            }}
          >
            <div className="px-3 py-3 text-[11px] text-gray-500">종일</div>

            {days.map((d, idx) => {
              const list = allDayByDay.get(idx) ?? [];
              return (
                <div
                  key={`allday-${keyOfDay(d)}`}
                  className="px-2 py-2 border-l border-gray-200 first:border-l-0 min-h-[52px]"
                >
                  <div className="space-y-1">
                    {list.slice(0, 3).map(({ ev }) => {
                      const filled = ev.variant === "filled";
                      const cls = filled
                        ? "bg-[#039be5] text-white"
                        : "border border-[#1a73e8] bg-white text-[#1a73e8]";
                      return (
                        <div
                          key={`${ev.id}-${idx}`}
                          className={`rounded px-2 py-1 text-[12px] leading-tight truncate ${cls}`}
                          title={ev.title}
                        >
                          {ev.title}
                        </div>
                      );
                    })}
                    {list.length > 3 && (
                      <div className="text-[11px] text-gray-500">
                        +{list.length - 3}개
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Timed grid */}
        <div className="relative">
          <div
            className="grid"
            style={{
              gridTemplateColumns: `${timeColW}px repeat(7, minmax(0, 1fr))`,
            }}
          >
            {/* Time labels column */}
            <div className="relative">
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

            {/* Day columns */}
            {days.map((d, dayIndex) => (
              <div
                key={`col-${keyOfDay(d)}`}
                className="relative border-l border-gray-200 first:border-l-0"
                style={{ height: gridHeight }}
              >
                {/* hour lines */}
                {Array.from({ length: totalHours }, (_, i) => (
                  <div
                    key={i}
                    style={{ height: rowH }}
                    className="border-t border-gray-200"
                  />
                ))}

                {/* events layer */}
                <div className="absolute inset-0">
                  {positionedTimed
                    .filter((x) => x.dayIndex === dayIndex)
                    .map(({ ev, top, height, s, e }) => {
                      const filled = ev.variant === "filled";
                      const base =
                        "absolute left-[8px] right-[10px] rounded-md text-[12px] leading-tight px-2 py-1.5";
                      const outlinedStyle =
                        "border border-[#1a73e8] bg-white text-[#1a73e8]";
                      const filledStyle = "bg-[#039be5] text-white";

                      return (
                        <div
                          key={`${ev.id}-${dayIndex}-${top}`}
                          style={{ top, height }}
                          className={[
                            base,
                            filled ? filledStyle : outlinedStyle,
                          ].join(" ")}
                        >
                          <div className="font-medium truncate">{ev.title}</div>
                          <div
                            className={
                              filled ? "text-white/90" : "text-[#1a73e8]/90"
                            }
                          >
                            {formatRange(s, e)}
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

                {/* now line (only for today's column) */}
                {nowLine && nowLine.dayIndex === dayIndex && (
                  <div
                    className="pointer-events-none absolute left-0 right-0"
                    style={{ top: nowLine.top }}
                  >
                    <div className="relative">
                      <div className="absolute -left-[6px] top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-[#d93025]" />
                      <div className="h-[2px] w-full bg-[#d93025]" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="h-10" />
      </div>
    </div>
  );
}
