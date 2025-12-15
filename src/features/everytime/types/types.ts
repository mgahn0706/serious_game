// src/features/everytime/types.ts

export type IdBrand<T extends string> = string & { readonly __brand: T };

export type BoardId = IdBrand<"BoardId">;
export type PostId = IdBrand<"PostId">;
export type CommentId = IdBrand<"CommentId">;

export const asBoardId = (s: string) => s as BoardId;
export const asPostId = (s: string) => s as PostId;
export const asCommentId = (s: string) => s as CommentId;

export type ISODateString = string; // "2025-12-14" 같은 형태로 쓰고 싶으면 더 좁혀도 됨.

export type EverytimeComment = {
  id: CommentId;
  author: {
    nickname: string;
    isAnonymous?: boolean;
  };
  content: string;
  createdAt: ISODateString;
  likeCount: number;
  parentCommentId?: CommentId; // 대댓글이면
};

export type EverytimePost = {
  id: PostId;
  boardId: BoardId;
  author: { nickname: string; isAnonymous: boolean };

  title: string;
  preview: string; // 리스트용 요약
  body?: string; // 상세 페이지용 본문 (선택)

  createdAt: ISODateString;

  // 통계(리스트에서 자주 씀)
  likeCount: number;
  scrapCount?: number;

  // ✅ 댓글은 “배열”로 붙여서 완전 구조화
  comments: EverytimeComment[];
};

export type EverytimeBoard = {
  id: BoardId;
  categoryTitle: string; // 예: "홍보게시판"
  title: string; // 예: "유학 + 해외체류 게시판"
  description?: string;

  posts: EverytimePost[];
};

// 최상단 데이터(앱이 들고 있는 전체 게시판들)
export type EverytimeData = {
  boards: EverytimeBoard[];
};
