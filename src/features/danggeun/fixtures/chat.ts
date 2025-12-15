// src/features/danggeun/fixtures/chat.ts
import type { Account } from "@/features/danggeun/types/types";

export type DanggeunChatMessage = {
  id: string;
  from: "me" | "them";
  text: string;
  time: string;
};

export type DanggeunChatThread = {
  threadId: number; // ✅ 동일 인물: 3
  responseHint?: string;
  dateLabel?: string;
  messages: DanggeunChatMessage[];
};

export const danggeunChatThreads: DanggeunChatThread[] = [
  {
    threadId: 3,
    responseHint: "보통 1시간 이내 응답",
    dateLabel: "2025년 11월 ~ 2026년 3월",
    messages: [
      // ───────── i) 답장 없음 ─────────
      {
        id: "m1",
        from: "me",
        text: "안녕하세요!",
        time: "2025.11.18 오후 7:12",
      },
      {
        id: "m2",
        from: "me",
        text: "아직 판매중인가요?",
        time: "2025.11.18 오후 7:12",
      },

      // ───────── ii) 이미 거래 성사 ─────────
      {
        id: "m3",
        from: "me",
        text: "안녕하세요",
        time: "2025.11.22 오전 10:03",
      },
      {
        id: "m4",
        from: "me",
        text: "아직 판매중인가요?",
        time: "2025.11.22 오전 10:03",
      },
      {
        id: "m5",
        from: "them",
        text: "좀 전에 다른 분이랑 거래 성사했습니다",
        time: "2025.11.22 오전 10:18",
      },
      {
        id: "m6",
        from: "me",
        text: "아 그렇군요..ㅠㅠ 네 좋은 하루 보내세요~",
        time: "2025.11.22 오전 10:19",
      },

      // ───────── iii) 네고 실패 ─────────
      {
        id: "m7",
        from: "me",
        text: "안녕하세요",
        time: "2025.12.01 오후 2:41",
      },
      {
        id: "m8",
        from: "me",
        text: "아직 판매중인가요?",
        time: "2025.12.01 오후 2:41",
      },
      {
        id: "m9",
        from: "them",
        text: "네 가능합니다.",
        time: "2025.12.01 오후 2:44",
      },
      {
        id: "m10",
        from: "me",
        text: "혹시 조금만 네고 불가능한가요?\n10%정도 네고 해주시면 안돼요?",
        time: "2025.12.01 오후 2:45",
      },
      {
        id: "m11",
        from: "them",
        text: "안 팔아요",
        time: "2025.12.01 오후 2:46",
      },
      {
        id: "m12",
        from: "me",
        text: "넵 ㅠㅠ",
        time: "2025.12.01 오후 2:46",
      },

      // ───────── 화니 사건 (성공 → 사기/협박) ─────────
      {
        id: "m13",
        from: "me",
        text: "안녕하세요",
        time: "2025.12.07 오후 6:11",
      },
      {
        id: "m14",
        from: "me",
        text: "아직 판매중인가요?",
        time: "2025.12.07 오후 6:11",
      },
      {
        id: "m15",
        from: "them",
        text: "네 가능합니다.",
        time: "2025.12.07 오후 6:13",
      },
      {
        id: "m16",
        from: "me",
        text: "혹시 조금만 네고 불가능한가요?\n10%정도 네고 해주시면 안돼요?",
        time: "2025.12.07 오후 6:14",
      },
      {
        id: "m17",
        from: "them",
        text: "네 해드릴게요",
        time: "2025.12.07 오후 6:16",
      },
      {
        id: "m18",
        from: "me",
        text: "헉! 감사합니다… 근데 혹시 여전히 너무 비싼데 할부로 50만원씩 내면 안될까요?\n제가 꼭 매달 1일에 계좌이체 해드릴게요ㅠㅠ\n지금 당장 필요한데 그 정도 돈이 없어요ㅠㅠㅠㅠㅠㅠ\n깎아주면 기스랑 하자 같은건 무시하고 쿨거래할게요",
        time: "2025.12.07 오후 6:18",
      },
      {
        id: "m19",
        from: "them",
        text: "음….곤란하긴한데 실용음악과 입시 준비하는 학생인 것 같아서 봐드릴게요\n주소 불러줘요. 계좌번호는 유리은행 123-1212-123456. 토스말고 계좌이체로 보내주세요",
        time: "2025.12.07 오후 6:23",
      },
      {
        id: "m20",
        from: "me",
        text: "넵 당연히 쿨거래죠!!! 택배비는 제가 부담하겠습니다\n매달 1일에 용돈이랑 알바비 다 들어오는 날이라 꼭 보낼게요\n제 주소는 ***-*****-*** 입니다",
        time: "2025.12.07 오후 6:25",
      },

      // ───────── 몇 달 뒤 ─────────
      {
        id: "m21",
        from: "me",
        text: "야 이 사기꾼 같은 놈아\n내 돈 다시 내놔",
        time: "2025.12.09 오전 9:12",
      },
      { id: "m22", from: "them", text: "?", time: "2025.12.09 오전 9:13" },
      {
        id: "m23",
        from: "me",
        text: "뭔 시치미야\n나한테 중국산 짭 팔아놓고 250만원 그대로 꿀꺽할 생각이었어?",
        time: "2025.12.09 오전 9:14",
      },
      {
        id: "m24",
        from: "them",
        text: "ㅋㅋㅋㅋㅋㅋ\n쿨거래하자고 한 건 그쪽임\n이미 돈 다 내서 암 것도 못하쥬???",
        time: "2025.12.09 오전 9:15",
      },
      {
        id: "m25",
        from: "me",
        text: "…….. 신고해버린다",
        time: "2025.12.09 오전 9:16",
      },
      {
        id: "m26",
        from: "them",
        text: "ㅋ 신고하기만 해봐\n어차피 나 니 주소도 알고 있음\n너 하나 입 닫게 하는 건 일도 아님",
        time: "2025.12.09 오전 9:17",
      },
    ],
  },
];

// ✅ thread만 반환
export function getDanggeunChatThreadByAccountId(accountId: number) {
  return danggeunChatThreads.find((t) => t.threadId === accountId) ?? null;
}

// ✅ 화면 렌더링용
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
