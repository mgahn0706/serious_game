import type { Account } from "@/features/danggeun/types/types";

export type DanggeunChatMessage = {
  id: string;
  from: "me" | "them";
  text: string;
  time: string; // "오후 3:42"
};

/**
 * ✅ threadId = partnerAccountId
 * partnerName/avatar/temperature는 들고있지 않음 (accounts에서 resolve)
 */
export type DanggeunChatThread = {
  threadId: number; // partnerAccountId (= accounts[id])
  responseHint?: string; // "보통 1시간 이내 응답"
  dateLabel?: string; // "2021년 4월 2일"
  messages: DanggeunChatMessage[];
};

export const danggeunChatThreads: DanggeunChatThread[] = [
  {
    threadId: 3,
    responseHint: "보통 1시간 이내 응답",
    dateLabel: "2021년 4월 2일",
    messages: [
      { id: "m1", from: "me", text: "안녕하세요", time: "오후 3:42" },
      {
        id: "m2",
        from: "me",
        text: "혹시 유모차 팔렸나요?",
        time: "오후 3:42",
      },
      {
        id: "m3",
        from: "them",
        text: "아니요 아직 안팔렸어요",
        time: "오후 3:44",
      },
      { id: "m4", from: "me", text: "직거래 하고 싶은데요", time: "오후 3:44" },
      {
        id: "m5",
        from: "me",
        text: "혹시 어디서 거래하고 싶으세요?",
        time: "오후 3:44",
      },
      {
        id: "m6",
        from: "them",
        text: "내일 역삼역 앞으로 7시까지 와주실 수 있나요?\n퇴근하고 나가서 드리면 좋을 것 같아요~^^",
        time: "오후 3:45",
      },
      {
        id: "m7",
        from: "me",
        text: "네~ 그럼 7시까지 그리로 갈게요~",
        time: "오후 3:44",
      },
    ],
  },
];

// ✅ thread만 반환
export function getDanggeunChatThreadByAccountId(accountId: number) {
  return danggeunChatThreads.find((t) => t.threadId === accountId) ?? null;
}

/**
 * ✅ 화면 렌더링용: accounts에서 partner 정보를 resolve해서 합쳐줌
 * - account 없으면 null
 */
export function getDanggeunResolvedChatByAccountId(
  accountId: number,
  accounts: Account[]
) {
  const thread = getDanggeunChatThreadByAccountId(accountId);
  if (!thread) return null;

  const partner = accounts.find((a) => a.id === accountId);
  if (!partner) return null;

  return {
    thread,
    partner,
    temperatureText: `${partner.temperature.toFixed(1)}°C`,
  };
}
