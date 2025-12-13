import React, { useMemo, useState } from "react";
import type { CalendarEvent } from "@/features/calendar/types/types";
import { scheduleFixture } from "@/features/calendar/fixtures/schedule";

/**
 * Google Calendar Day View (UI clone) — React + TS + Tailwind
 * - Top app bar
 * - Left sidebar (Create, mini month calendar, sections)
 * - Main day grid (hour labels + horizontal rules + current time red line)
 *
 * Notes:
 * - Fonts/colors are approximations (Google Sans not bundled).
 * - Icons are simple inline SVGs to avoid dependencies.
 */

type ViewMode = "Day";

const DOW_KR = ["일", "월", "화", "수", "목", "금", "토"];

function startOfMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}
function endOfMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth() + 1, 0);
}
function addMonths(d: Date, delta: number) {
  return new Date(d.getFullYear(), d.getMonth() + delta, 1);
}
function sameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function formatKoreanFullDate(d: Date) {
  return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`;
}

function formatKoreanMonth(d: Date) {
  return `${d.getFullYear()}년 ${d.getMonth() + 1}월`;
}

function formatAmPmHour(h24: number) {
  const isPM = h24 >= 12;
  const h12 = ((h24 + 11) % 12) + 1;
  return `${isPM ? "PM" : "AM"} ${h12}시`;
}

function Icon({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex h-9 w-9 items-center justify-center rounded-full hover:bg-gray-100 active:bg-gray-200 ${className}`}
    >
      {children}
    </span>
  );
}

function Svg({
  d,
  className = "",
  viewBox = "0 0 24 24",
}: {
  d: string;
  className?: string;
  viewBox?: string;
}) {
  return (
    <svg
      viewBox={viewBox}
      className={`h-5 w-5 text-gray-600 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={d} />
    </svg>
  );
}

function CheckboxRow({
  colorClass,
  label,
  checked,
}: {
  colorClass: string;
  label: string;
  checked?: boolean;
}) {
  return (
    <div className="flex items-center gap-3 py-1.5">
      <span
        className={`h-4 w-4 rounded-[4px] border ${
          checked ? colorClass : "border-gray-300 bg-white"
        } ${checked ? "shadow-[inset_0_0_0_999px_rgba(0,0,0,0)]" : ""}`}
      />
      <span className="truncate text-[13px] text-gray-800">{label}</span>
    </div>
  );
}

function MiniMonth({
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

    const startWeekday = first.getDay(); // 0..6
    const daysInMonth = last.getDate();

    // Build 6 rows x 7 cols grid like Google Calendar mini month
    const grid: (Date | null)[] = [];
    const leading = startWeekday; // blanks before 1st
    for (let i = 0; i < leading; i++) grid.push(null);

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
          const isToday = d ? sameDay(d, new Date()) : false;

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

function TimeGridDay({
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

  // layout tuning to resemble screenshot
  const rowH = 64; // px per hour
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

  const formatRange = (s: Date, e: Date) => {
    const fmt = (d: Date) => {
      const isPM = d.getHours() >= 12;
      const h12 = ((d.getHours() + 11) % 12) + 1;
      const mm = String(d.getMinutes()).padStart(2, "0");
      return `${isPM ? "PM" : "AM"} ${h12}${d.getMinutes() ? `:${mm}` : ""}`;
    };
    return `${fmt(s)}~${fmt(e)}`;
  };

  // current time line position
  const nowPos = useMemo(() => {
    if (!isSameDateAsNow) return null;
    const minutesFromStart =
      (now.getHours() - startHour) * 60 + now.getMinutes();
    const maxMinutes = (endHour - startHour + 1) * 60;
    const clamped = Math.max(0, Math.min(maxMinutes, minutesFromStart));
    return (clamped / 60) * rowH;
  }, [isSameDateAsNow, now, startHour, endHour, rowH]);

  return (
    <div className="relative flex-1 overflow-auto bg-white">
      {/* left gutter + grid */}
      <div className="min-w-[920px]">
        {/* subtle top padding similar to calendar content header */}
        <div className="h-6" />

        <div className="relative">
          {/* left labels column */}
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

          {/* vertical separator */}
          <div className="absolute left-[72px] top-0 h-full w-px bg-gray-200" />

          {/* main grid area */}
          <div className="ml-[72px] relative" style={{ height: gridHeight }}>
            {/* hour lines */}
            {Array.from({ length: totalHours }, (_, i) => (
              <div
                key={i}
                style={{ height: rowH }}
                className="border-t border-gray-200"
              />
            ))}

            {/* EVENTS LAYER */}
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

            {/* "now" red line */}
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

        {/* bottom padding */}
        <div className="h-10" />
      </div>
    </div>
  );
}

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState<Date>(
    new Date(2025, 11, 13)
  ); // 2025-12-13 (month is 0-based)
  const [miniMonth, setMiniMonth] = useState<Date>(new Date(2025, 11, 1));
  const [viewMode] = useState<ViewMode>("Day");

  const now = new Date();

  return (
    <div className="h-screen w-screen bg-white text-gray-900">
      {/* Top App Bar */}
      <div className="flex h-16 items-center gap-2 border-b border-gray-200 px-3">
        {/* left cluster */}
        <Icon>
          <Svg d="M4 6h16M4 12h16M4 18h16" />
        </Icon>

        <div className="flex items-center gap-2 pl-1">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#1a73e8] text-white">
            <span className="text-sm font-semibold">13</span>
          </div>
          <div className="text-[18px] font-medium text-gray-700">Calendar</div>
        </div>

        <div className="w-2" />

        <button className="rounded-full border border-gray-300 px-4 py-2 text-[13px] font-medium text-gray-700 hover:bg-gray-50">
          오늘
        </button>

        <div className="flex items-center gap-0.5">
          <Icon>
            <Svg d="M15 18l-6-6 6-6" />
          </Icon>
          <Icon>
            <Svg d="M9 18l6-6-6-6" />
          </Icon>
        </div>

        <div className="ml-2 text-[20px] font-medium text-gray-700">
          {formatKoreanFullDate(selectedDate)}
        </div>

        {/* right cluster */}
        <div className="ml-auto flex items-center gap-1">
          <Icon>
            <Svg d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15z" />
          </Icon>
          <Icon>
            <Svg d="M12 18h.01M12 14h.01M12 10h.01M12 6h.01" />
          </Icon>
          <Icon>
            <Svg d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
          </Icon>

          <div className="mx-2 h-7 w-px bg-gray-200" />

          <button className="flex items-center gap-2 rounded-full border border-gray-300 px-3 py-2 text-[13px] font-medium text-gray-700 hover:bg-gray-50">
            <span>일</span>
            <Svg d="M6 9l6 6 6-6" className="h-4 w-4" />
          </button>

          <Icon>
            <Svg d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z" />
          </Icon>

          <div className="ml-1 flex h-9 w-9 items-center justify-center rounded-full border border-gray-200">
            <span className="text-[12px] font-semibold text-gray-700">민</span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="flex h-[calc(100vh-64px)]">
        {/* Left Sidebar */}
        <aside className="w-[320px] border-r border-gray-200 bg-white">
          <div className="p-3">
            <button className="flex w-[140px] items-center gap-3 rounded-full border border-gray-200 bg-white px-4 py-2 shadow-sm hover:shadow">
              <span className="text-xl leading-none text-[#1a73e8]">+</span>
              <span className="text-[14px] font-medium text-gray-700">
                만들기
              </span>
              <Svg d="M6 9l6 6 6-6" className="ml-auto h-4 w-4" />
            </button>
          </div>

          <MiniMonth
            monthDate={miniMonth}
            selectedDate={selectedDate}
            onPickDate={(d) => setSelectedDate(d)}
            onPrev={() => setMiniMonth((m) => addMonths(m, -1))}
            onNext={() => setMiniMonth((m) => addMonths(m, 1))}
          />

          <div className="mt-3 px-3">
            <div className="rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-[13px] text-gray-500">
              참석자 추가...
            </div>
          </div>

          <div className="mt-3 px-3">
            <div className="flex items-center justify-between py-2 text-[12px] font-semibold text-gray-600">
              <span>예약 페이지</span>
              <button className="rounded-full p-1 hover:bg-gray-100">
                <Svg d="M12 5v14M5 12h14" />
              </button>
            </div>
          </div>

          <div className="mt-1 px-3">
            <div className="flex items-center justify-between py-2 text-[12px] font-semibold text-gray-600">
              <span>시간 통계</span>
              <Svg d="M6 9l6 6 6-6" className="h-4 w-4" />
            </div>

            <div className="mt-1 rounded-xl border border-gray-200 p-3">
              <div className="text-[12px] text-gray-500">
                {formatKoreanFullDate(selectedDate)} (토요일)
              </div>
              <div className="mt-2 text-[12px] text-gray-600">
                0시간 동안 회의 중
              </div>
              <button className="mt-3 rounded-full border border-gray-200 px-4 py-2 text-[12px] font-medium text-gray-700 hover:bg-gray-50">
                추가 통계
              </button>
            </div>
          </div>

          <div className="mt-4 px-3">
            <div className="flex items-center justify-between py-2 text-[12px] font-semibold text-gray-600">
              <span>내 캘린더</span>
              <Svg d="M6 9l6 6 6-6" className="h-4 w-4" />
            </div>

            <CheckboxRow
              checked
              colorClass="bg-[#1a73e8] border-[#1a73e8]"
              label="안민규 / 학생 / 전기·정보공학부"
            />
            <CheckboxRow
              checked
              colorClass="bg-[#1a73e8] border-[#1a73e8]"
              label="Tasks"
            />
            <CheckboxRow
              checked
              colorClass="bg-[#34a853] border-[#34a853]"
              label="생일"
            />
          </div>

          <div className="mt-4 px-3">
            <div className="flex items-center justify-between py-2 text-[12px] font-semibold text-gray-600">
              <span>다른 캘린더</span>
              <div className="flex items-center gap-1">
                <button className="rounded-full p-1 hover:bg-gray-100">
                  <Svg d="M12 5v14M5 12h14" />
                </button>
                <Svg d="M6 9l6 6 6-6" className="h-4 w-4" />
              </div>
            </div>

            <CheckboxRow
              checked
              colorClass="bg-[#34a853] border-[#34a853]"
              label="CE2 Writing, Fall 2020 005"
            />
            <CheckboxRow
              checked
              colorClass="bg-[#34a853] border-[#34a853]"
              label="대한민국의 휴일"
            />
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex flex-1 flex-col">
          <div className="flex h-10 items-center border-b border-gray-200 bg-white px-4">
            <div className="text-[12px] font-medium text-gray-500">
              {viewMode}
            </div>
          </div>

          <TimeGridDay
            date={selectedDate}
            startHour={8}
            endHour={23}
            now={now}
            events={scheduleFixture}
          />
        </main>

        {/* Right “apps” rail (very thin) */}
        <div className="w-14 border-l border-gray-200 bg-white">
          <div className="flex flex-col items-center gap-3 py-3">
            {["#", "✓", "👤", "📍", "+"].map((t, i) => (
              <div
                key={i}
                className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-gray-100"
              >
                <span className="text-sm text-gray-600">{t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
