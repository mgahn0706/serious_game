// src/features/calendar/utils/date.ts

export const DOW_KR = ["일", "월", "화", "수", "목", "금", "토"];

export function startOfMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}
export function endOfMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth() + 1, 0);
}
export function addMonths(d: Date, delta: number) {
  return new Date(d.getFullYear(), d.getMonth() + delta, 1);
}
export function sameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}
export function addDays(d: Date, delta: number) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate() + delta);
}
export function startOfWeek(d: Date) {
  // Sunday-based week
  return addDays(d, -d.getDay());
}

export function formatKoreanFullDate(d: Date) {
  return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`;
}
export function formatKoreanMonth(d: Date) {
  return `${d.getFullYear()}년 ${d.getMonth() + 1}월`;
}
export function formatAmPmHour(h24: number) {
  const isPM = h24 >= 12;
  const h12 = ((h24 + 11) % 12) + 1;
  return `${isPM ? "PM" : "AM"} ${h12}시`;
}
export function formatAmPmTime(d: Date) {
  const isPM = d.getHours() >= 12;
  const h12 = ((d.getHours() + 11) % 12) + 1;
  const mm = String(d.getMinutes()).padStart(2, "0");
  return `${isPM ? "PM" : "AM"} ${h12}${d.getMinutes() ? `:${mm}` : ""}`;
}
