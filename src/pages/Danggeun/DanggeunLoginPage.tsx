import React, { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { isLoggedIn, setSessionAuth } from "@/features/auth/scopedSessionAuth";

type LocationState = {
  from?: string;
};

const AUTH_SCOPE = "danggeun" as const;

const DEMO_ID = "ohyass0202";
const DEMO_PW = "wldbs4676!";

export default function DanggeunLoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = (location.state ?? {}) as LocationState;

  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [error, setError] = useState<string | null>(null);

  const trimmedId = id.trim();
  const canSubmit = useMemo(
    () => trimmedId.length >= 3 && pw.length >= 4,
    [trimmedId, pw]
  );

  // ✅ 이미 로그인돼 있으면 바로 홈
  React.useEffect(() => {
    if (isLoggedIn(AUTH_SCOPE)) {
      navigate(state.from ?? "/danggeun", { replace: true });
    }
  }, [navigate]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    // ✅ 아이디/비번 검증 (데모)
    if (trimmedId !== DEMO_ID || pw !== DEMO_PW) {
      setError("아이디 또는 비밀번호가 올바르지 않습니다.");
      return;
    }

    setError(null);

    // ✅ 로그인 성공 처리 (sessionStorage)
    setSessionAuth(AUTH_SCOPE, trimmedId);

    navigate(state.from ?? "/danggeun", { replace: true });
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto flex min-h-screen max-w-5xl items-start justify-center px-6 pt-16">
        <div className="w-full max-w-[520px]">
          {/* ================= LOGO ================= */}
          <div className="mb-12 flex items-center gap-2">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#ff6f0f]">
              <span className="h-3 w-3 rounded-full bg-white" />
            </span>
            <span className="text-[22px] font-extrabold text-[#ff6f0f]">
              당근
            </span>
          </div>

          {/* ================= TITLE ================= */}
          <h1 className="mb-3 text-[36px] font-bold text-[#111]">
            당근 계정으로 로그인
          </h1>
          <p className="mb-12 text-[18px] text-[#6b7280]">
            가입한 계정 정보를 입력해 주세요
          </p>

          {/* ================= FORM ================= */}
          <form onSubmit={onSubmit}>
            {/* 아이디 */}
            <label className="mb-2 block text-[16px] font-semibold text-[#111]">
              아이디
            </label>
            <input
              value={id}
              onChange={(e) => {
                setId(e.target.value);
                if (error) setError(null);
              }}
              placeholder="아이디를 입력해 주세요"
              className="mb-4 h-[64px] w-full rounded-[10px] border border-[#d1d5db] px-4 text-[18px] text-[#111] placeholder:text-[#9ca3af] focus:border-[#ff6f0f] focus:outline-none"
              autoComplete="username"
            />

            {/* 비밀번호 */}
            <label className="mb-2 block text-[16px] font-semibold text-[#111]">
              비밀번호
            </label>
            <input
              value={pw}
              onChange={(e) => {
                setPw(e.target.value);
                if (error) setError(null);
              }}
              type="password"
              placeholder="비밀번호를 입력해 주세요"
              className="mb-2 h-[64px] w-full rounded-[10px] border border-[#d1d5db] px-4 text-[18px] text-[#111] placeholder:text-[#9ca3af] focus:border-[#ff6f0f] focus:outline-none"
              autoComplete="current-password"
            />

            {/* 에러 메시지 (semantic 유지하면서 추가) */}
            {error && (
              <div className="mb-4 mt-1 text-[13px] text-red-500">{error}</div>
            )}

            <button
              type="submit"
              disabled={!canSubmit}
              className={[
                "mt-2 h-[64px] w-full rounded-[12px] text-[20px] font-bold text-white transition-opacity",
                canSubmit
                  ? "bg-[#ff6f0f] hover:opacity-95"
                  : "bg-[#ff6f0f] opacity-50",
              ].join(" ")}
            >
              로그인
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
