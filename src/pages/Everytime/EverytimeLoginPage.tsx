// src/pages/Everytime/EverytimeLoginPage.tsx
import React, { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  isLoggedIn,
  setSessionAuth,
} from "../../features/auth/scopedSessionAuth";

type LocationState = { from?: string };

// ✅ 데모 계정
const DEMO_ID = "jiyoon_o77";
const DEMO_PW = "wldbsl!7";

export default function EverytimeLoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = (location.state ?? {}) as LocationState;

  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [keep, setKeep] = useState(false); // UI only (session-based auth)
  const [error, setError] = useState<string | null>(null);

  const trimmedId = id.trim();

  const canSubmit = useMemo(
    () => trimmedId.length > 0 && pw.trim().length > 0,
    [trimmedId, pw]
  );

  React.useEffect(() => {
    if (isLoggedIn("everytime")) {
      navigate(state.from ?? "/everytime/board/0", { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

    // ✅ "works": sessionStorage에 저장 (새로고침 유지, 탭/브라우저 닫으면 초기화)
    // keep(로그인 유지)는 UI만 클론 (원하면 keep=true일 때 localStorage로 바꿀 수 있음)
    setSessionAuth("everytime", trimmedId);

    navigate(state.from ?? "/everytime/board/0", { replace: true });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* center block */}
      <div className="mx-auto flex min-h-screen max-w-5xl items-center justify-center px-6">
        <div className="w-full max-w-[420px]">
          {/* logo */}
          <div className="mb-10 text-center">
            <div className="mb-2 text-[12px] font-medium text-[#8c8c8c]">
              함께하는 대학생활
            </div>

            <div className="flex items-center justify-center gap-2">
              <div className="text-[34px] font-extrabold tracking-[-0.02em] text-[#1f1f1f]">
                에브리타임
              </div>
            </div>
          </div>

          {/* form card */}
          <form onSubmit={onSubmit} className="mx-auto w-full max-w-[380px]">
            <div className="space-y-2">
              <input
                value={id}
                onChange={(e) => {
                  setId(e.target.value);
                  if (error) setError(null);
                }}
                placeholder="아이디"
                className="h-[46px] w-full rounded-[10px] border border-[#efefef] bg-[#f5f5f5] px-4 text-[14px] text-[#222] placeholder:text-[#b3b3b3] focus:border-[#e5e5e5] focus:outline-none"
                autoComplete="username"
              />
              <input
                value={pw}
                onChange={(e) => {
                  setPw(e.target.value);
                  if (error) setError(null);
                }}
                type="password"
                placeholder="비밀번호"
                className="h-[46px] w-full rounded-[10px] border border-[#efefef] bg-[#f5f5f5] px-4 text-[14px] text-[#222] placeholder:text-[#b3b3b3] focus:border-[#e5e5e5] focus:outline-none"
                autoComplete="current-password"
              />
            </div>

            {error && (
              <div className="mt-2 text-[12px] text-red-500">{error}</div>
            )}

            <button
              type="submit"
              disabled={!canSubmit}
              className={[
                "mt-4 h-[50px] w-full rounded-[12px] text-[15px] font-bold text-white transition-opacity",
                canSubmit
                  ? "bg-[#ff1d1d] hover:opacity-95"
                  : "bg-[#ff1d1d] opacity-60",
              ].join(" ")}
            >
              에브리타임 로그인
            </button>

            {/* signup */}
          </form>

          {/* footer */}
          <div className="mt-24 text-center text-[12px] text-[#b0b0b0]">
            <div className="flex items-center justify-center gap-4">
              <button
                type="button"
                className="hover:text-[#8e8e8e]"
                onClick={() => alert("이걸 눌러보시다니 대단하시군요.")}
              >
                이용약관
              </button>
              <button
                type="button"
                className="hover:text-[#8e8e8e]"
                onClick={() => alert("아주 꼼꼼하시네요.")}
              >
                개인정보처리방침
              </button>
              <button
                type="button"
                className="hover:text-[#8e8e8e]"
                onClick={() => alert("도움이 필요하신가요?")}
              >
                문의하기
              </button>
              <span className="text-[#b0b0b0]">© 에브리타임</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
