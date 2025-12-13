// src/features/calendar/components/TopBar.tsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Icon } from "./Icon";
import { Svg } from "./Svg";
import { formatKoreanFullDate } from "../utils/date";
import { type ViewMode, ViewModeSegment } from "./ViewModeSegment";
import type { CalendarEvent } from "@/features/calendar/types/types";

const DOW_KR = ["일", "월", "화", "수", "목", "금", "토"];

function sameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function formatKoreanShortDay(d: Date) {
  return `${DOW_KR[d.getDay()]} ${d.getMonth() + 1}월 ${d.getDate()}일`;
}

function formatAmPmTimeOnly(d: Date) {
  const isPM = d.getHours() >= 12;
  const h12 = ((d.getHours() + 11) % 12) + 1;
  const mm = String(d.getMinutes()).padStart(2, "0");
  return `${isPM ? "PM" : "AM"} ${h12}:${mm}`;
}

function formatRangeDash(s: Date, e: Date) {
  return `${formatAmPmTimeOnly(s)}–${formatAmPmTimeOnly(e)}`;
}

function isAllDayEvent(ev: CalendarEvent) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const anyEv = ev as any;
  if (typeof anyEv.allDay === "boolean") return anyEv.allDay;
  if (typeof anyEv.isAllDay === "boolean") return anyEv.isAllDay;

  const s = new Date(ev.start);
  const e = new Date(ev.end);
  const startAtMidnight = s.getHours() === 0 && s.getMinutes() === 0;
  const endAtMidnight = e.getHours() === 0 && e.getMinutes() === 0;
  const durMin = Math.max(0, (e.getTime() - s.getTime()) / 60000);

  if (startAtMidnight && endAtMidnight && durMin >= 24 * 60) return true;
  if (startAtMidnight && durMin >= 24 * 60) return true;
  if (startAtMidnight && endAtMidnight && durMin >= 23 * 60) return true;
  return false;
}

export function TopBar({
  selectedDate,
  viewMode,
  onChangeViewMode,
  onGoToday,
  onPrev,
  onNext,
  events,
  onJumpToEvent,
}: {
  selectedDate: Date;
  viewMode: ViewMode;
  onChangeViewMode: (v: ViewMode) => void;
  onGoToday: () => void;
  onPrev: () => void;
  onNext: () => void;
  events: CalendarEvent[];
  onJumpToEvent: (ev: CalendarEvent) => void;
}) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    const matched = events
      .map((ev) => {
        const s = new Date(ev.start);
        const e = new Date(ev.end);
        return { ev, s, e };
      })
      .filter(({ ev }) => (ev.title ?? "").toLowerCase().includes(q))
      .sort((a, b) => a.s.getTime() - b.s.getTime());

    return matched.slice(0, 10);
  }, [events, query]);

  useEffect(() => {
    if (!isSearchOpen) return;
    const t = window.setTimeout(() => inputRef.current?.focus(), 0);
    return () => window.clearTimeout(t);
  }, [isSearchOpen]);

  useEffect(() => {
    if (!isSearchOpen) return;

    const onDown = (e: MouseEvent) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target as Node)) {
        setIsSearchOpen(false);
        setQuery("");
      }
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsSearchOpen(false);
        setQuery("");
      }
    };

    window.addEventListener("mousedown", onDown);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [isSearchOpen]);

  const openSearch = () => setIsSearchOpen(true);
  const closeSearch = () => {
    setIsSearchOpen(false);
    setQuery("");
  };

  return (
    <div className="relative" ref={containerRef}>
      <div className="flex h-16 items-center gap-2 border-b border-gray-200 px-3 bg-white">
        <div className="flex items-center gap-2 pl-1">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#1a73e8] text-white">
            <span className="text-sm font-semibold">18</span>
          </div>
          <div className="text-[18px] font-medium text-gray-700">Calendar</div>
        </div>

        <div className="w-2" />

        <button
          onClick={onGoToday}
          className="rounded-full border border-gray-300 px-4 py-2 text-[13px] font-medium text-gray-700 hover:bg-gray-50"
        >
          오늘
        </button>

        <div className="flex items-center gap-0.5">
          <button type="button" onClick={onPrev}>
            <Icon>
              <Svg d="M15 18l-6-6 6-6" />
            </Icon>
          </button>
          <button type="button" onClick={onNext}>
            <Icon>
              <Svg d="M9 18l6-6-6-6" />
            </Icon>
          </button>
        </div>

        <div className="ml-2 text-[20px] font-medium text-gray-700">
          {formatKoreanFullDate(selectedDate)}
        </div>

        <div className="ml-auto flex items-center gap-1">
          <button type="button" onClick={openSearch} aria-label="search">
            <Icon>
              <Svg d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15z" />
            </Icon>
          </button>

          <Icon>
            <Svg d="M12 18h.01M12 14h.01M12 10h.01M12 6h.01" />
          </Icon>
          <Icon>
            <Svg d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
          </Icon>

          <div className="mx-2 h-7 w-px bg-gray-200" />

          <ViewModeSegment value={viewMode} onChange={onChangeViewMode} />

          <Icon>
            <Svg d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z" />
          </Icon>

          <div className="ml-1 flex h-9 w-9 items-center justify-center rounded-full border border-gray-200">
            <span className="text-[12px] font-semibold text-gray-700">지</span>
          </div>
        </div>
      </div>

      {isSearchOpen && (
        <div className="absolute left-1/2 top-[10px] z-50 w-[780px] max-w-[calc(100vw-24px)] -translate-x-1/2">
          <div className="rounded-[24px] bg-white shadow-[0_10px_40px_rgba(0,0,0,0.15)] border border-gray-200 overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-200">
              <Svg
                d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15z"
                className="h-5 w-5"
              />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="검색"
                className="flex-1 bg-transparent outline-none text-[20px] text-gray-900 placeholder:text-gray-400"
              />
              <button type="button" onClick={closeSearch} aria-label="close">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full hover:bg-gray-100">
                  <Svg d="M18 6L6 18M6 6l12 12" />
                </span>
              </button>
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full hover:bg-gray-100">
                <Svg d="M7 10l5 5 5-5" />
              </span>
            </div>

            <div className="max-h-[320px] overflow-auto">
              {query.trim() && results.length === 0 && (
                <div className="px-4 py-4 text-[14px] text-gray-500">
                  검색 결과가 없습니다.
                </div>
              )}

              {results.map(({ ev, s, e }) => {
                const isAllDay = isAllDayEvent(ev);
                const dateText = formatKoreanShortDay(s);
                const timeText = isAllDay ? "종일" : formatRangeDash(s, e);

                return (
                  <button
                    key={`${ev.id}-${ev.start}`}
                    type="button"
                    onClick={() => {
                      onJumpToEvent(ev);
                      closeSearch();
                    }}
                    className={[
                      "w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-gray-50",
                      sameDay(s, selectedDate) ? "bg-gray-50" : "",
                    ].join(" ")}
                  >
                    <div className="h-9 w-9 flex items-center justify-center">
                      <div className="h-7 w-7 rounded bg-[#1a73e8]/10 flex items-center justify-center">
                        <span className="text-[12px] font-semibold text-[#1a73e8]">
                          31
                        </span>
                      </div>
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="text-[20px] leading-snug text-gray-900 truncate">
                        {ev.title}
                      </div>
                      {ev.location ? (
                        <div className="text-[14px] text-gray-500 truncate">
                          {ev.location}
                        </div>
                      ) : (
                        <div className="text-[14px] text-gray-400 truncate">
                          &nbsp;
                        </div>
                      )}
                    </div>

                    <div className="shrink-0 text-right">
                      <div className="text-[14px] text-gray-600">
                        {dateText}
                      </div>
                      <div className="text-[16px] text-gray-800">
                        {timeText}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
