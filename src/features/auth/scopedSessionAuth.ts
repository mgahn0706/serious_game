// ✅ 같이 필요: src/features/auth/sessionAuth.ts (서비스별 독립 세션)
// (네 프로젝트에 이 파일이 이미 있으면, 아래로 "교체"해줘)
export type AuthScope = "instagram" | "danggeun" | "everytime";

type SessionAuth = {
  loggedIn: boolean;
  user?: string;
  ts: number;
};

const keyOf = (scope: AuthScope) => `session_auth:${scope}`;

export function getSessionAuth(scope: AuthScope): SessionAuth | null {
  const raw = sessionStorage.getItem(keyOf(scope));
  if (!raw) return null;
  try {
    return JSON.parse(raw) as SessionAuth;
  } catch {
    return null;
  }
}

export function isLoggedIn(scope: AuthScope) {
  return getSessionAuth(scope)?.loggedIn === true;
}

export function setSessionAuth(scope: AuthScope, user: string) {
  const payload: SessionAuth = { loggedIn: true, user, ts: Date.now() };
  sessionStorage.setItem(keyOf(scope), JSON.stringify(payload));
}

export function clearSessionAuth(scope: AuthScope) {
  sessionStorage.removeItem(keyOf(scope));
}
