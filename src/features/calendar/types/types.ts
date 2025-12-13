export type CalendarEvent = {
  id: string;
  title: string;
  start: string;
  end: string;
  location?: string;
  variant: "filled" | "outlined";
  allDay?: boolean;
  recurrence?: "yearly" | "monthly" | "weekly";
};
