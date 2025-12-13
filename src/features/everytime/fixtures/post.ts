// src/features/everytime/fixtures/data.ts
import {
  type EverytimeData,
  asBoardId,
  asPostId,
  asCommentId,
} from "../types/types";

export const everytimeData: EverytimeData = {
  boards: [
    {
      id: asBoardId("board-abroad"),
      categoryTitle: "홍보게시판",
      title: "유학 + 해외체류 게시판 ✈️",
      posts: [
        {
          id: asPostId("post-1"),
          boardId: asBoardId("board-abroad"),
          title: "교환학생 비자 질문 있어요",
          preview: "J-1 비자 준비 중인데 DS-2019 관련해서...",
          body: "상세 본문(선택)...",
          createdAt: "2025-12-14",
          likeCount: 12,
          comments: [
            {
              id: asCommentId("c-1"),
              author: { nickname: "익명", isAnonymous: true },
              content: "DS-2019는 학교 국제처에서 받아요.",
              createdAt: "2025-12-14",
              likeCount: 3,
            },
            {
              id: asCommentId("c-2"),
              author: { nickname: "익명2", isAnonymous: true },
              content: "대사관 인터뷰 예약은 빨리 잡는 게 좋아요.",
              createdAt: "2025-12-14",
              likeCount: 1,
            },
          ],
        },
      ],
    },
  ],
};
