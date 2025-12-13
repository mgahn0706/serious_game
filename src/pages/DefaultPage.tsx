// src/pages/DefaultPage.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Instagram,
  MessageCircle,
  ShoppingBag,
  ArrowRight,
} from "lucide-react";

const DefaultPage: React.FC = () => {
  const navigate = useNavigate();

  const apps = [
    {
      id: "instagram",
      label: "Instagram",
      desc: "피드, 스토리 및 알고리즘을 통한 단서 탐색",
      icon: Instagram,
      color: "from-pink-500 via-red-500 to-yellow-400",
      path: "/instagram",
    },
    {
      id: "everytime",
      label: "에브리타임",
      desc: "대학 커뮤니티 게시판 검색을 통한 단서 탐색",
      icon: MessageCircle,
      color: "from-rose-500 to-orange-400",
      path: "/everytime",
    },
    {
      id: "danggeun",
      label: "당근마켓 클론",
      desc: "동네 중고거래 리스트로 간접적 증거 탐색",
      icon: ShoppingBag,
      color: "from-orange-500 to-lime-400",
      path: "/danggeun",
    },
    {
      id: "calendar",
      label: "캘린더 앱",
      desc: "일정 관리를 통한 단서 추적",
      icon: MessageCircle,
      color: "from-blue-500 to-indigo-400",
      path: "/calendar",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-50">
      {/* 상단 타이틀바 */}
      <header className="border-b border-white/5 bg-black/10 backdrop-blur-sm">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-pink-500 text-xs font-semibold">
              UI
            </div>
            <div className="leading-tight">
              <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400">
                Serious Game
              </p>
              <p className="text-sm font-semibold text-slate-50">
                기말과제용 단서 수집 사이트 모음
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-slate-400">
            <span className="hidden md:inline">Vite · React · Tailwind</span>
            <span className="h-1 w-1 rounded-full bg-emerald-400" />
            <span>dev</span>
          </div>
        </div>
      </header>

      {/* 메인 섹션 */}
      <main className="mx-auto flex max-w-5xl flex-col gap-8 px-6 pb-12 pt-10">
        {/* 헤더 텍스트 */}
        <section className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="mt-4 text-3xl font-semibold leading-tight text-slate-50 md:text-4xl">
              Choose a <span className="text-emerald-300">layout</span> <br />
              to collect clues
            </h1>
            <p className="mt-3 max-w-md text-sm text-slate-400">
              아래 카드 중 하나를 선택해 각 페이지로 이동할 수 있습니다. 이
              사이트는 정상적인 게임플레이로는 도달할 수 없습니다.
            </p>
          </div>
        </section>

        {/* 카드 그리드 */}
        <section className="grid gap-4 md:grid-cols-3">
          {apps.map((app) => {
            const Icon = app.icon;
            return (
              <button
                key={app.id}
                onClick={() => navigate(app.path)}
                className="group flex flex-col rounded-2xl border border-white/8 bg-white/[0.03] p-4 text-left shadow-[0_18px_45px_rgba(15,23,42,0.72)] transition hover:-translate-y-1 hover:border-emerald-300/50 hover:bg-white/[0.06]"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr text-white shadow-inner shadow-black/30 bg-clip-padding">
                    <div
                      className={`h-full w-full rounded-xl bg-gradient-to-tr ${app.color} opacity-90`}
                    />
                    <Icon className="absolute h-4 w-4" />
                  </div>
                  <ArrowRight className="h-4 w-4 text-slate-400 transition group-hover:translate-x-1 group-hover:text-emerald-300" />
                </div>
                <div className="mt-4">
                  <h2 className="text-sm font-semibold text-slate-50">
                    {app.label}
                  </h2>
                  <p className="mt-1 text-[12px] text-slate-400">{app.desc}</p>
                </div>
                <div className="mt-4 flex items-center justify-between text-[11px] text-slate-500">
                  <span>열기</span>
                  <span className="rounded-full bg-black/40 px-2 py-0.5 text-[10px] text-slate-300">
                    {app.path}
                  </span>
                </div>
              </button>
            );
          })}
        </section>
      </main>
    </div>
  );
};

export default DefaultPage;
