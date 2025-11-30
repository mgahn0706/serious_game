// src/features/everytime/fixtures/posts.ts

export interface EverytimeComment {
  id: number;
  author: string;
  time: string;
  content: string;
  isReply?: boolean;
}

export interface EverytimePost {
  id: number;
  title: string;
  date: string;
  preview: string;
  comments?: number;
  commentList?: EverytimeComment[]; // <-- 댓글 목록 추가
}

export const everytimePosts: EverytimePost[] = [
  {
    id: 1,
    title: "2026 가을 유학",
    date: "11/17",
    preview:
      "이번에 유학 지원 하시는 분들 시간 이제 진짜 얼마 안 남았습니다! 다들 화이팅 해요!",
    comments: 2,
    commentList: [
      {
        id: 1,
        author: "익명",
        time: "11/17 14:30",
        content: "화이팅입니다!!",
      },
      {
        id: 2,
        author: "익명2",
        time: "11/17 16:11",
        content: "저도 지원해요 :)",
      },
    ],
  },

  {
    id: 2,
    title: "미국 대학원 어드미션 후기 – 8/9(화) 9:00PM",
    date: "08/17",
    preview:
      "안녕하세요, 올해 미국 대학원 유학 준비 중인 서울대 공공정책대학원생입니다...",
    comments: 3,
    commentList: [
      {
        id: 1,
        author: "익명",
        time: "08/17 20:32",
        content: "와 후기 감사합니다!",
      },
      {
        id: 2,
        author: "익명2",
        time: "08/17 20:51",
        content: "발표 너무 떨릴듯",
      },
      {
        id: 3,
        author: "익명3",
        time: "08/17 21:10",
        content: "도움 많이 됐어요!",
      },
    ],
  },

  {
    id: 3,
    title: "미국 대학원 입시",
    date: "03/25",
    preview:
      "안녕하세요 혹시 서울대학교 내 2026 미국 대학원 입학을 위한 팁 있나요?",
    comments: 1,
    commentList: [
      {
        id: 1,
        author: "익명",
        time: "03/25 12:11",
        content: "GPA랑 SOP 준비가 핵심이에요!",
      },
    ],
  },

  {
    id: 4,
    title: "교환학생/유학생 상담을 위한 1:1 서비스",
    date: "11/02",
    preview:
      "교환학생을 위한 정보 세션을 열고자 합니다. 관련 경험 있으신 분들은...",
    comments: 0,
    commentList: [],
  },
];
