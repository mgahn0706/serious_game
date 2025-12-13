export type CalendarEvent = {
  id: string;
  title: string;
  location?: string;
  start: string;
  end: string;
  variant?: "filled" | "outlined";
};
