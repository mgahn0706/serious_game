// src/features/calendar/components/Icon.tsx
import React from "react";

export function Icon({
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
