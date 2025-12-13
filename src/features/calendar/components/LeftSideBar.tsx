// src/features/calendar/components/LeftSidebar.tsx
import { addMonths } from "../utils/date";
import { MiniMonth } from "./MiniMonth";

export function LeftSidebar({
  selectedDate,
  onPickDate,
  miniMonth,
  onChangeMiniMonth,
}: {
  selectedDate: Date;
  onPickDate: (d: Date) => void;
  miniMonth: Date;
  onChangeMiniMonth: (d: Date) => void;
}) {
  return (
    <aside className="w-[320px] border-r border-gray-200 bg-white">
      <div className="p-3"></div>

      <MiniMonth
        monthDate={miniMonth}
        selectedDate={selectedDate}
        onPickDate={onPickDate}
        onPrev={() => onChangeMiniMonth(addMonths(miniMonth, -1))}
        onNext={() => onChangeMiniMonth(addMonths(miniMonth, 1))}
      />
    </aside>
  );
}
