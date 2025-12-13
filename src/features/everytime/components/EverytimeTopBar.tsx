import { Bell } from "lucide-react";

export function EverytimeTopBar() {
  return (
    <header className="w-full bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-3">
        <div className="flex items-center gap-3">
          <div className="text-2xl font-bold text-red-600">에브리타임</div>
          <div className="text-xl font-semibold">샤울대</div>
        </div>

        <div className="flex items-center gap-4">
          <Bell className="w-6 h-6 text-gray-600" />
          <div className="w-8 h-8 rounded-full bg-gray-300" />
          <div className="w-8 h-8 rounded-full bg-gray-300" />
        </div>
      </div>
    </header>
  );
}
