"use client";

import {
  Home,
  Search,
  Compass,
  Heart,
  MessageCircle,
  Plus,
  MoreHorizontal,
  User,
} from "lucide-react";
import { useState } from "react";

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div
      className={`border-r border-border bg-background transition-all duration-300 ${
        isCollapsed ? "w-20" : "w-64"
      } flex flex-col h-screen fixed left-0 top-0`}
    >
      {/* Logo */}
      <div className="p-4 border-b border-border">
        {isCollapsed ? (
          <div className="w-8 h-8 bg-black rounded text-white flex items-center justify-center font-bold text-lg">
            📷
          </div>
        ) : (
          <h1
            className="text-2xl font-light italic tracking-tight"
            style={{ fontFamily: "'Brush Script MT', cursive" }}
          >
            Instagram
          </h1>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        <NavItem icon={Home} label="홈" isCollapsed={isCollapsed} isActive />
        <NavItem icon={Search} label="검색" isCollapsed={isCollapsed} />
        <NavItem icon={Compass} label="탐색 탭" isCollapsed={isCollapsed} />
        <NavItem icon={Heart} label="릴스" isCollapsed={isCollapsed} />
        <NavItem
          icon={MessageCircle}
          label="메시지"
          isCollapsed={isCollapsed}
        />
        <NavItem icon={Plus} label="만들기" isCollapsed={isCollapsed} />
        <NavItem icon={User} label="프로필" isCollapsed={isCollapsed} />
      </nav>

      {/* Bottom Section */}
      <div className="p-4 border-t border-border space-y-2">
        <NavItem
          icon={MoreHorizontal}
          label="더 보기"
          isCollapsed={isCollapsed}
        />

        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-secondary text-foreground transition-colors"
        >
          <span className="text-lg">☰</span>
          {!isCollapsed && <span className="text-sm">더 보기</span>}
        </button>
      </div>
    </div>
  );
}

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  isCollapsed: boolean;
  isActive?: boolean;
}

function NavItem({
  icon: Icon,
  label,
  isCollapsed,
  isActive = false,
}: NavItemProps) {
  return (
    <button
      className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-all w-full text-sm ${
        isActive
          ? "bg-transparent text-foreground font-semibold"
          : "hover:bg-secondary/50 text-foreground"
      }`}
    >
      <Icon className="w-6 h-6 flex-shrink-0" />
      {!isCollapsed && <span>{label}</span>}
    </button>
  );
}
