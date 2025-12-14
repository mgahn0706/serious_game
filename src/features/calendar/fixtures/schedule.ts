import type { CalendarEvent } from "../types/types";
export const scheduleFixture: CalendarEvent[] = [
  {
    id: "e1",
    title: "화니와 여행",
    location: "강릉",
    start: "2025-12-21T11:00:00+09:00",
    end: "2025-12-21T12:30:00+09:00",
    variant: "outlined",
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
  {
    id: "birth_of_라흐마니노프",
    title: "라흐마니노프 탄생일",
    start: "2025-04-01T00:00:00+09:00",
    end: "2025-04-02T00:00:00+09:00",
    variant: "outlined",
    allDay: true,
    recurrence: "yearly",
  },
  {
    id: "lesson",
    title: "피아노 학원",
    start: "2025-12-18T19:00+09:00",
    end: "2025-12-18T20:00+09:00",
    variant: "filled",
    recurrence: "weekly",
  },
  {
    id: "notice",
    title: "샤울대 입시 결과 발표",
    start: "2024-12-15T13:00:00+09:00",
    end: "2025-12-15T14:00:00+09:00",
    variant: "outlined",
  },
];
