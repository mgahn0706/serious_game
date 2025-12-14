"use client";

import type React from "react";
import { Home, Search, Compass } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { allAccounts } from "../fixtures/account";

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Search popout toggle
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Search input + loading
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const searchTimerRef = useRef<number | null>(null);

  // remember previous collapsed state
  const prevCollapsedRef = useRef<boolean>(false);

  const location = useLocation();
  const navigate = useNavigate();

  const MY_USERNAME = "jiyoon_pianjy";

  const closeSearch = () => {
    setIsSearchOpen(false);
    setIsCollapsed(prevCollapsedRef.current);
    setQuery("");
    setIsSearching(false);
    if (searchTimerRef.current) {
      window.clearTimeout(searchTimerRef.current);
      searchTimerRef.current = null;
    }
  };

  const go = (to: string) => {
    closeSearch();
    navigate(to);
  };

  const openSearch = () => {
    if (!isSearchOpen) {
      prevCollapsedRef.current = isCollapsed;
      setIsCollapsed(true);
    }
    setIsSearchOpen(true);
  };

  const toggleSearch = () => {
    if (isSearchOpen) closeSearch();
    else openSearch();
  };

  // ESC closes search
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeSearch();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // 🔍 SEARCH LOGIC (Instagram-ish: prefix-first, fallback to includes)
  const trimmed = query.trim();
  const q = trimmed.toLowerCase();

  const searchResults =
    q.length === 0
      ? []
      : (() => {
          // 1) prefix match first (id/username)
          const prefix = allAccounts
            .filter((acc) => {
              const id = acc.id.toLowerCase();
              const username = (acc.username ?? "").toLowerCase();
              return id.startsWith(q) || username.startsWith(q);
            })
            // within prefix, stronger first: exact id > id prefix > username prefix
            .sort((a, b) => {
              const aId = a.id.toLowerCase();
              const bId = b.id.toLowerCase();
              const aUser = (a.username ?? "").toLowerCase();
              const bUser = (b.username ?? "").toLowerCase();

              const aScore =
                (aId === q ? 0 : aId.startsWith(q) ? 1 : 3) +
                (aUser.startsWith(q) ? 0.5 : 0);
              const bScore =
                (bId === q ? 0 : bId.startsWith(q) ? 1 : 3) +
                (bUser.startsWith(q) ? 0.5 : 0);

              if (aScore !== bScore) return aScore - bScore;
              if (a.id.length !== b.id.length) return a.id.length - b.id.length;
              return a.id.localeCompare(b.id);
            });

          if (prefix.length > 0) return prefix.slice(0, 20);

          // 2) only if no prefix matches: includes fallback
          const includes = allAccounts
            .filter((acc) => {
              const id = acc.id.toLowerCase();
              const username = (acc.username ?? "").toLowerCase();
              return id.includes(q) || username.includes(q);
            })
            .sort((a, b) => {
              const aId = a.id.toLowerCase();
              const bId = b.id.toLowerCase();
              const aUser = (a.username ?? "").toLowerCase();
              const bUser = (b.username ?? "").toLowerCase();

              const aScore =
                (aId.includes(q) ? 0 : 2) + (aUser.includes(q) ? 0.5 : 0);
              const bScore =
                (bId.includes(q) ? 0 : 2) + (bUser.includes(q) ? 0.5 : 0);

              if (aScore !== bScore) return aScore - bScore;
              if (a.id.length !== b.id.length) return a.id.length - b.id.length;
              return a.id.localeCompare(b.id);
            });

          return includes.slice(0, 20);
        })();

  return (
    <>
      {/* MAIN SIDEBAR */}
      <div
        className={`border-r border-border bg-background transition-all duration-300 ${
          isCollapsed ? "w-20" : "w-64"
        } flex flex-col h-screen fixed left-0 top-0 z-30`}
      >
        {/* Logo */}
        <div className="p-4 border-b border-border">
          {isCollapsed ? (
            <div className="w-8 h-8 bg-white rounded flex items-center justify-center font-bold text-lg">
              IK
            </div>
          ) : (
            <h1
              className="text-2xl font-light italic tracking-tight"
              style={{ fontFamily: "'Brush Script MT', cursive" }}
            >
              Instakilogram
            </h1>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          <NavButton
            icon={Home}
            label="홈"
            isCollapsed={isCollapsed}
            active={location.pathname === "/instagram" && !isSearchOpen}
            onClick={() => go("/instagram")}
          />

          <NavButton
            icon={Search}
            label="검색"
            isCollapsed={isCollapsed}
            active={isSearchOpen}
            onClick={toggleSearch}
          />

          <NavButton
            icon={Compass}
            label="탐색 탭"
            isCollapsed={isCollapsed}
            active={
              location.pathname.startsWith("/instagram/explore") &&
              !isSearchOpen
            }
            onClick={() => go("/instagram/explore")}
          />
        </nav>

        {/* Profile */}
        <div className="p-4 border-t border-border space-y-2">
          <button
            onClick={() => go(`/instagram/profile/${MY_USERNAME}`)}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg transition-colors ${
              location.pathname.startsWith("/instagram/profile") &&
              !isSearchOpen
                ? "bg-secondary/30 font-semibold"
                : "hover:bg-secondary/50"
            }`}
          >
            <div className="w-6 h-6 rounded-full overflow-hidden bg-muted flex-shrink-0">
              <img
                src="/instagram/profile/placeholder.png"
                alt={MY_USERNAME}
                className="w-full h-full object-cover"
              />
            </div>
            {!isCollapsed && <span className="text-sm">프로필</span>}
          </button>

          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="w-full flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-secondary text-foreground transition-colors"
          >
            <span className="text-lg">☰</span>
            {!isCollapsed && <span className="text-sm">더 보기</span>}
          </button>
        </div>
      </div>

      {/* SEARCH PANEL */}
      <div
        className={[
          "fixed top-0 h-screen w-[420px] bg-background border-r border-border z-20",
          isCollapsed ? "left-20" : "left-64",
          "transition-transform duration-300 ease-out",
          isSearchOpen ? "translate-x-0" : "-translate-x-[460px]",
          isSearchOpen ? "pointer-events-auto" : "pointer-events-none",
        ].join(" ")}
      >
        {/* Header */}
        <div className="px-5 py-5">
          <h2 className="text-2xl font-semibold">검색</h2>
        </div>

        {/* Search input */}
        <div className="px-5 pb-4">
          <div className="relative">
            <input
              placeholder="검색"
              value={query}
              onChange={(e) => {
                const value = e.target.value;
                setQuery(value);

                if (searchTimerRef.current) {
                  window.clearTimeout(searchTimerRef.current);
                }
                setIsSearching(value.trim().length > 0);
                searchTimerRef.current = window.setTimeout(() => {
                  setIsSearching(false);
                }, 400);
              }}
              className="w-full rounded-full bg-secondary px-4 py-2.5 text-sm outline-none pr-10"
            />
            <button
              className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-muted flex items-center justify-center text-muted-foreground"
              onClick={() => {
                setQuery("");
                setIsSearching(false);
                if (searchTimerRef.current) {
                  window.clearTimeout(searchTimerRef.current);
                  searchTimerRef.current = null;
                }
              }}
            >
              ×
            </button>
          </div>
        </div>

        <div className="border-b border-border" />

        {/* Section header */}
        <div className="px-5 pt-4 pb-2">
          <span className="text-sm font-semibold">
            {trimmed.length === 0 ? "최근 검색 항목" : "검색 결과"}
          </span>
        </div>

        {/* List */}
        <div className="px-2">
          {trimmed.length === 0 ? (
            RECENTS.map((item) => {
              const account = allAccounts.find((acc) => acc.id === item);
              if (!account) return null;

              return (
                <button
                  key={account.id}
                  onClick={() => go(`/instagram/profile/${account.id}`)}
                  className="w-full flex items-center gap-3 px-3 py-3 hover:bg-secondary/40 rounded-xl"
                >
                  <div className="w-11 h-11 rounded-full overflow-hidden bg-muted">
                    <img
                      src={account.image}
                      alt={account.id}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="text-sm font-semibold">{account.id}</div>
                    <div className="text-xs text-muted-foreground">
                      {account.username}
                    </div>
                  </div>
                </button>
              );
            })
          ) : isSearching ? (
            <SearchSkeleton />
          ) : searchResults.length > 0 ? (
            searchResults.slice(0, 5).map((account) => (
              <button
                key={account.id}
                onClick={() => go(`/instagram/profile/${account.id}`)}
                className="w-full flex items-center gap-3 px-3 py-3 hover:bg-secondary/40 rounded-xl"
              >
                <div className="w-11 h-11 rounded-full overflow-hidden bg-muted">
                  <img
                    src={account.image}
                    alt={account.id}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 text-left">
                  <div className="text-sm font-semibold">{account.id}</div>
                  <div className="text-xs text-muted-foreground">
                    {account.username}
                  </div>
                </div>
              </button>
            ))
          ) : (
            <div className="py-8 text-center text-sm text-muted-foreground">
              검색 결과가 없습니다
            </div>
          )}
        </div>
      </div>

      {/* Backdrop */}
      <button
        onClick={closeSearch}
        className={[
          "fixed inset-0 z-10 bg-black/0",
          "transition-opacity duration-300",
          isSearchOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0",
        ].join(" ")}
      />
    </>
  );
}

const RECENTS = ["kim_hwan"];

function SearchSkeleton() {
  return (
    <div className="space-y-4 px-3 py-4 animate-pulse">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-muted" />
          <div className="flex-1 space-y-2">
            <div className="h-3 w-40 bg-muted rounded" />
            <div className="h-3 w-28 bg-muted rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}

interface NavButtonProps {
  icon: React.ElementType;
  label: string;
  isCollapsed: boolean;
  active?: boolean;
  onClick: () => void;
}

function NavButton({
  icon: Icon,
  label,
  isCollapsed,
  active,
  onClick,
}: NavButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-all w-full text-sm ${
        active ? "bg-secondary/30 font-semibold" : "hover:bg-secondary/50"
      }`}
    >
      <Icon className="w-6 h-6 flex-shrink-0" />
      {!isCollapsed && <span>{label}</span>}
    </button>
  );
}
