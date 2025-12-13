import { useState } from "react";
import { scheduleFixture } from "@/features/calendar/fixtures/schedule";
import { LeftSidebar } from "@/features/calendar/components/LeftSideBar";
import { MonthView } from "@/features/calendar/components/MonthView";
import { RightRail } from "@/features/calendar/components/RIghtRail";
import { TimeGridDay } from "@/features/calendar/components/TimeGridDay";
import { TopBar } from "@/features/calendar/components/TopBar";
import type { ViewMode } from "@/features/calendar/components/ViewModeSegment";
import { WeekView } from "@/features/calendar/components/WeekView";
import { addDays, startOfWeek } from "@/features/calendar/utils/date";

const FIXED_TODAY = new Date(2025, 11, 18);

function addMonths(d: Date, delta: number) {
  return new Date(d.getFullYear(), d.getMonth() + delta, d.getDate());
}

function shiftByViewMode(d: Date, viewMode: ViewMode, dir: -1 | 1) {
  if (viewMode === "Day") return addDays(d, dir);
  if (viewMode === "Week") return addDays(d, dir * 7);
  return addMonths(d, dir);
}

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState<Date>(
    new Date(2025, 11, 13)
  );
  const [miniMonth, setMiniMonth] = useState<Date>(new Date(2025, 11, 1));
  const [viewMode, setViewMode] = useState<ViewMode>("Day");

  return (
    <div className="h-screen w-screen bg-white text-gray-900">
      <TopBar
        selectedDate={selectedDate}
        viewMode={viewMode}
        onChangeViewMode={(v) => {
          setViewMode(v);
          if (v === "Week") {
            setSelectedDate(startOfWeek(selectedDate));
          }
          if (v === "Month") {
            setSelectedDate(
              new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1)
            );
          }
        }}
        onGoToday={() => {
          setSelectedDate(FIXED_TODAY);
          setMiniMonth(
            new Date(FIXED_TODAY.getFullYear(), FIXED_TODAY.getMonth(), 1)
          );
        }}
        onPrev={() => {
          const next = shiftByViewMode(selectedDate, viewMode, -1);
          setSelectedDate(next);
          setMiniMonth(new Date(next.getFullYear(), next.getMonth(), 1));
        }}
        onNext={() => {
          const next = shiftByViewMode(selectedDate, viewMode, +1);
          setSelectedDate(next);
          setMiniMonth(new Date(next.getFullYear(), next.getMonth(), 1));
        }}
        events={scheduleFixture}
        onJumpToEvent={(ev) => {
          const target = new Date(ev.start);
          setSelectedDate(target);
          setMiniMonth(new Date(target.getFullYear(), target.getMonth(), 1));
        }}
      />

      <div className="flex h-[calc(100vh-64px)]">
        <LeftSidebar
          selectedDate={selectedDate}
          onPickDate={setSelectedDate}
          miniMonth={miniMonth}
          onChangeMiniMonth={setMiniMonth}
        />

        <main className="flex flex-1 flex-col">
          <div className="flex h-10 items-center border-b border-gray-200 bg-white px-4">
            <div className="text-[12px] font-medium text-gray-500">
              {viewMode}
            </div>
          </div>

          {viewMode === "Day" && (
            <TimeGridDay
              date={selectedDate}
              startHour={8}
              endHour={23}
              now={FIXED_TODAY}
              events={scheduleFixture}
            />
          )}

          {viewMode === "Week" && (
            <WeekView anchorDate={selectedDate} events={scheduleFixture} />
          )}

          {viewMode === "Month" && (
            <MonthView
              monthAnchor={
                new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1)
              }
              selectedDate={selectedDate}
              onPickDate={setSelectedDate}
              events={scheduleFixture}
            />
          )}
        </main>

        <RightRail />
      </div>
    </div>
  );
}
