// src/pages/LoginPage.tsx
import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isLoggedIn, setSessionAuth } from "@/features/auth/scopedSessionAuth";

const AUTH_SCOPE = "instagram" as const;

// ✅ 데모용 하드코딩 계정
const DEMO_ID = "jiyoon_pianjy";
const DEMO_PW = "onaipplayer04!";

export default function LoginPage() {
  const navigate = useNavigate();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const canSubmit = useMemo(() => {
    const a = identifier.trim();
    const b = password.trim();
    return a.length >= 3 && b.length >= 4;
  }, [identifier, password]);

  // ✅ 이미 로그인 상태면 바로 홈으로
  React.useEffect(() => {
    if (isLoggedIn(AUTH_SCOPE)) navigate("/instagram", { replace: true });
  }, [navigate]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    const id = identifier.trim();
    const pw = password; // 비번은 trim 안 하는 게 안전(공백 포함 가능)

    // ✅ 검증
    if (id !== DEMO_ID || pw !== DEMO_PW) {
      setError("사용자 이름 또는 비밀번호가 올바르지 않습니다.");
      return;
    }

    // ✅ 로그인 성공 처리 (scope 별로 저장)
    setError(null);
    setSessionAuth(AUTH_SCOPE, id);
    navigate("/instagram", { replace: true });
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto flex min-h-screen max-w-5xl items-center justify-center px-6">
        <div className="flex w-full items-center justify-center gap-14">
          {/* LEFT visual */}
          <div className="relative hidden h-[520px] w-[520px] select-none md:block">
            {/* soft shadow base */}
            <div className="absolute left-1/2 top-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-[32px] bg-black/5 blur-2xl" />

            {/* back-left card */}
            <div className="absolute left-[92px] top-[172px] h-[250px] w-[170px] -rotate-[8deg] rounded-[24px] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.18)] ring-1 ring-black/5">
              <div className="h-full w-full overflow-hidden rounded-[24px]">
                <div className="h-full w-full bg-[radial-gradient(circle_at_30%_20%,#ffb6b6,transparent_55%),radial-gradient(circle_at_70%_25%,#ffd39c,transparent_55%),linear-gradient(135deg,#5b21b6,#f97316,#ef4444)]" />
              </div>
            </div>

            {/* back-right card */}
            <div className="absolute left-[322px] top-[154px] h-[260px] w-[180px] rotate-[10deg] rounded-[24px] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.18)] ring-1 ring-black/5">
              <div className="h-full w-full overflow-hidden rounded-[24px]">
                <div className="h-full w-full bg-[radial-gradient(circle_at_35%_30%,#b3e5ff,transparent_55%),radial-gradient(circle_at_75%_20%,#c4b5fd,transparent_55%),linear-gradient(135deg,#111827,#6d28d9,#0ea5e9)]" />
              </div>

              {/* small profile ring */}
              <div className="absolute bottom-[42px] left-[16px] h-14 w-14 rounded-full bg-white shadow-md">
                <div className="absolute inset-[3px] rounded-full bg-[conic-gradient(#f97316,#ef4444,#a855f7,#0ea5e9,#f97316)]" />
                <div className="absolute inset-[7px] overflow-hidden rounded-full bg-white">
                  <div className="h-full w-full bg-[radial-gradient(circle_at_30%_30%,#fff,transparent_45%),linear-gradient(135deg,#16a34a,#22c55e,#0ea5e9)]" />
                </div>
              </div>
            </div>

            {/* center phone */}
            <div className="absolute left-1/2 top-1/2 h-[410px] w-[240px] -translate-x-1/2 -translate-y-1/2 rounded-[34px] bg-white shadow-[0_24px_80px_rgba(0,0,0,0.22)] ring-1 ring-black/5">
              <div className="absolute left-1/2 top-[12px] h-6 w-[92px] -translate-x-1/2 rounded-full bg-black/10" />
              <div className="absolute inset-[10px] overflow-hidden rounded-[28px] bg-black">
                <div className="h-full w-full bg-[radial-gradient(circle_at_35%_30%,#bde0fe,transparent_55%),radial-gradient(circle_at_75%_70%,#ffd6a5,transparent_55%),linear-gradient(135deg,#0f172a,#334155,#0f172a)]" />
                {/* bottom UI hints */}
                <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-3">
                  <div className="h-8 w-40 rounded-full border border-white/35 bg-white/10" />
                  <div className="h-8 w-8 rounded-full border border-white/35 bg-white/10" />
                </div>
              </div>
            </div>

            {/* floating reactions */}
            <div className="absolute left-[142px] top-[132px] flex items-center gap-1 rounded-full bg-white px-3 py-2 text-[16px] shadow-[0_14px_40px_rgba(0,0,0,0.18)] ring-1 ring-black/5">
              <span>🔥</span>
              <span>👏</span>
              <span>💜</span>
            </div>

            {/* green badge */}
            <div className="absolute left-[414px] top-[208px] flex items-center gap-2 rounded-full bg-[#35c759] px-4 py-2 text-white shadow-[0_18px_50px_rgba(0,0,0,0.18)]">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 2l2.9 6.6 7.1.6-5.4 4.6 1.6 6.9L12 17.9 5.8 20.7 7.4 13.8 2 9.2l7.1-.6L12 2z" />
              </svg>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                aria-hidden="true"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </div>
          </div>

          {/* RIGHT login */}
          <div className="w-full max-w-[350px]">
            <div className="rounded-sm border border-gray-300 bg-white px-10 pb-6 pt-10">
              {/* Instagram logo text */}
              <div className="mb-9 text-center">
                <div
                  className="select-none text-[42px] leading-none text-[#262626]"
                  style={{
                    fontFamily:
                      '"Billabong","Instagram Sans Script","Segoe Script","Brush Script MT",cursive',
                  }}
                >
                  Instagram
                </div>
              </div>

              <form onSubmit={onSubmit} className="space-y-2">
                <input
                  value={identifier}
                  onChange={(e) => {
                    setIdentifier(e.target.value);
                    if (error) setError(null);
                  }}
                  placeholder="전화번호, 사용자 이름 또는 이메일"
                  className="h-9 w-full rounded-sm border border-gray-300 bg-[#fafafa] px-2 text-[12px] text-gray-900 placeholder:text-gray-500 focus:border-gray-400 focus:outline-none"
                  autoComplete="username"
                />
                <input
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) setError(null);
                  }}
                  type="password"
                  placeholder="비밀번호"
                  className="h-9 w-full rounded-sm border border-gray-300 bg-[#fafafa] px-2 text-[12px] text-gray-900 placeholder:text-gray-500 focus:border-gray-400 focus:outline-none"
                  autoComplete="current-password"
                />

                {error && (
                  <div className="pt-1 text-[12px] text-red-500">{error}</div>
                )}

                <button
                  type="submit"
                  disabled={!canSubmit}
                  className={[
                    "mt-2 h-8 w-full rounded-md text-[14px] font-semibold text-white transition-colors",
                    canSubmit
                      ? "bg-[#4f7cf9] hover:bg-[#3f6ff6]"
                      : "bg-[#4f7cf9]/55",
                  ].join(" ")}
                >
                  로그인
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
