import type { CalendarEvent } from "../types/types";
export const scheduleFixture: CalendarEvent[] = [
  {
    id: "e1",
    title: "HCIL Lab Seminar",
    location: "302-308",
    start: "2025-12-13T11:00:00+09:00",
    end: "2025-12-13T12:30:00+09:00",
    variant: "outlined",
  },
  {
    id: "e2",
    title: "Dashboard Meeting",
    start: "2025-12-13T17:00:00+09:00",
    end: "2025-12-13T18:00:00+09:00",
    variant: "filled",
  },

  // 🎄 Christmas (all-day, yearly)
  {
    id: "e_christmas_2025",
    title: "Christmas 🎄",
    start: "2025-12-25T00:00:00+09:00",
    end: "2025-12-26T00:00:00+09:00",
    variant: "outlined",
    allDay: true,
    recurrence: "yearly",
  },
];
