"use client";

import { useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ThumbsUp, Bookmark, MessageCircle } from "lucide-react";

import { everytimeData } from "@/features/everytime/fixtures/post";
import {
  asPostId,
  type EverytimePost,
  type EverytimeComment,
  type EverytimeBoard,
} from "@/features/everytime/types/types";

import { EverytimeTopBar } from "@/features/everytime/components/EverytimeTopBar";
import { EverytimeSidebar } from "@/features/everytime/components/Sidebar";

/* ---------------- Page ---------------- */

export default function EverytimePostDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const MY_AUTHOR_ID = "moonlight_vocal";

  // ✅ 모든 게시판에서 post 찾기 + 해당 게시판도 같이 찾기
  const { post, board } = useMemo(() => {
    if (!id)
      return { post: undefined as EverytimePost | undefined, board: null };

    const pid = asPostId(id);

    for (const b of everytimeData.boards) {
      const found = b.posts.find((p) => String(p.id) === String(pid));
      if (found) return { post: found, board: b };
    }

    return { post: undefined as EverytimePost | undefined, board: null };
  }, [id]);

  // ✅ (추가) 카테고리별 보드 묶기 — EverytimePage와 동일
  const boardsByCategory = useMemo(() => {
    const map = new Map<string, EverytimeBoard[]>();
    for (const b of everytimeData.boards) {
      const key = b.categoryTitle || "기타";
      map.set(key, [...(map.get(key) ?? []), b]);
    }
    return map;
  }, []);

  if (!post || !board) {
    return (
      <div className="min-h-screen bg-[#fafafa] text-[#333]">
        <EverytimeTopBar />
        <div className="max-w-6xl mx-auto px-6 py-10 text-center text-gray-500">
          해당 게시글을 찾을 수 없습니다.
          <div className="mt-4">
            <button
              onClick={() =>
                navigate(
                  `/everytime/board/${everytimeData.boards[0]?.id ?? "1"}`
                )
              }
              className="px-4 py-2 border border-red-500 text-red-500 text-sm font-semibold rounded bg-white hover:bg-red-50"
            >
              글 목록
            </button>
          </div>
        </div>
      </div>
    );
  }

  const commentList: EverytimeComment[] = post.comments ?? [];
  const isMyPost = post.author?.nickname === MY_AUTHOR_ID;

  const sortedComments = useMemo(() => {
    const roots = commentList.filter((c) => !c.parentCommentId);
    const replies = commentList.filter((c) => !!c.parentCommentId);

    const byParent = new Map<string, EverytimeComment[]>();
    for (const r of replies) {
      const key = String(r.parentCommentId);
      const arr = byParent.get(key) ?? [];
      arr.push(r);
      byParent.set(key, arr);
    }

    const out: EverytimeComment[] = [];
    for (const root of roots) {
      out.push(root);
      const kids = byParent.get(String(root.id)) ?? [];
      out.push(...kids);
    }

    const orphanReplies = replies.filter(
      (r) =>
        !commentList.some((c) => String(c.id) === String(r.parentCommentId))
    );
    out.push(...orphanReplies);

    return out;
  }, [commentList]);

  const authorLabel = post.author?.isAnonymous
    ? "익명"
    : post.author?.nickname ?? "익명";

  return (
    <div className="min-h-screen bg-[#fafafa] text-[#333]">
      <EverytimeTopBar />

      {/* ✅ (추가) PostDetail에서도 보드 목록 바로 보이게 */}
      <div className="w-full bg-white border-b border-gray-200 py-4">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-4 gap-6 text-sm leading-6">
          {[...boardsByCategory.entries()].map(([categoryTitle, boards]) => (
            <CategoryColumn
              key={categoryTitle}
              title={categoryTitle}
              boards={boards}
              currentBoardId={String(board.id)} // ✅ 현재 글이 속한 보드 강조
            />
          ))}
        </div>
      </div>

      <main className="max-w-6xl mx-auto grid grid-cols-4 gap-8 mt-4 px-6 pb-8">
        {/* LEFT */}
        <div className="col-span-3">
          <div className="border border-gray-200 bg-white">
            {/* Board header */}
            <div className="border-b border-gray-200 px-6 py-4">
              <div className="flex items-center gap-2">
                <span className="text-base font-semibold text-gray-900">
                  {board.title}
                </span>
              </div>
              <div className="text-sm text-gray-500 mt-1">
                {board.description ?? "게시판 설명이 없습니다."}
              </div>
            </div>

            {/* Post */}
            <div className="px-6 pt-6 pb-5 border-b border-gray-200">
              <div className="flex items-start justify-between mb-5">
                <div className="flex items-start gap-3">
                  <div
                    className="w-10 h-10 rounded-md bg-center bg-cover bg-no-repeat"
                    style={{
                      backgroundImage: "url(https://cf-fpi.everytime.kr/0.png)",
                    }}
                  />
                  <div>
                    <div className="text-xs font-semibold text-gray-700">
                      {authorLabel}
                    </div>
                    <div className="text-xs text-gray-400">
                      {post.createdAt}
                    </div>
                  </div>
                </div>

                {isMyPost && (
                  <button className="text-xs text-gray-400 hover:underline">
                    삭제
                  </button>
                )}
              </div>

              <h1 className="text-lg font-semibold mb-4 leading-snug text-gray-900">
                {post.title}
              </h1>

              <p className="text-sm leading-7 mb-8 whitespace-pre-line text-gray-800">
                {post.body ?? post.preview ?? "본문 내용이 없습니다."}
              </p>

              <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                <div className="flex items-center gap-1 text-red-500">
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span className="text-gray-500">{post.likeCount ?? 0}</span>
                </div>

                <div className="flex items-center gap-1 text-cyan-500">
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span className="text-gray-500">{commentList.length}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <button className="px-4 py-2 rounded border border-gray-200 bg-white text-xs text-gray-600 hover:bg-gray-50">
                  공감
                </button>
                <button className="px-4 py-2 rounded border border-gray-200 bg-white text-xs text-gray-600 flex items-center gap-1 hover:bg-gray-50">
                  <Bookmark className="w-3.5 h-3.5" />
                  <span>스크랩</span>
                  {post.scrapCount ? (
                    <span className="text-gray-400">({post.scrapCount})</span>
                  ) : null}
                </button>
              </div>
            </div>

            {/* Comments */}
            <div className="border-b border-gray-200">
              {sortedComments.map((comment) => (
                <CommentItem
                  key={String(comment.id)}
                  comment={comment}
                  myAuthorId={MY_AUTHOR_ID}
                />
              ))}

              {commentList.length === 0 && (
                <div className="px-6 py-4 text-sm text-gray-500 border-t border-gray-200">
                  아직 댓글이 없습니다.
                </div>
              )}
            </div>

            <div className="px-6 py-4 flex items-center justify-between">
              <button
                className="px-4 py-2 border border-red-500 text-red-500 text-sm font-semibold rounded bg-white hover:bg-red-50"
                onClick={() => navigate(`/everytime/board/${board.id}`)}
              >
                글 목록
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="col-span-1">
          <EverytimeSidebar />
        </div>
      </main>
    </div>
  );
}

/* ---------- Category Column (EverytimePage에서 그대로 복붙) ---------- */

function CategoryColumn({
  title,
  boards,
  currentBoardId,
}: {
  title: string;
  boards: EverytimeBoard[];
  currentBoardId: string;
}) {
  const navigate = useNavigate();

  return (
    <div>
      <div className="font-semibold mb-2">{title}</div>
      <ul className="space-y-0.5 text-gray-700 text-sm">
        {boards.map((b) => {
          const isActive = String(b.id) === currentBoardId;
          return (
            <li
              key={String(b.id)}
              className={`cursor-pointer py-0.5 ${
                isActive ? "text-red-600 font-semibold" : "hover:text-red-600"
              }`}
              onClick={() => navigate(`/everytime/board/${String(b.id)}`)}
            >
              {b.title}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/* ---------- Comment item ---------- */

function CommentItem({
  comment,
  myAuthorId,
}: {
  comment: EverytimeComment;
  myAuthorId: string;
}) {
  const isReply = !!comment.parentCommentId;
  const authorLabel = comment.author?.isAnonymous
    ? "익명"
    : comment.author?.nickname ?? "익명";
  const timeLabel = comment.createdAt;

  const isMine = comment.author?.nickname === myAuthorId;

  if (isReply) {
    return (
      <div className="px-6 py-3 border-t border-gray-200">
        <div className="ml-10 pl-4 border-l border-gray-200">
          <div className="flex items-start gap-3">
            <div
              className="w-7 h-7 rounded-md bg-center bg-cover bg-no-repeat"
              style={{
                backgroundImage: "url(https://cf-fpi.everytime.kr/0.png)",
              }}
            />

            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-gray-700">
                    {authorLabel}
                  </span>
                  <span className="text-xs text-gray-400">{timeLabel}</span>
                </div>
                <CommentActions
                  small
                  likeCount={comment.likeCount}
                  isMine={isMine}
                />
              </div>
              <p className="text-sm text-gray-800 leading-6 whitespace-pre-line">
                {comment.content}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-6 py-4 border-t border-gray-200">
      <div className="flex items-start gap-3">
        <div
          className="w-9 h-9 rounded-md bg-center bg-cover bg-no-repeat"
          style={{
            backgroundImage: "url(https://cf-fpi.everytime.kr/0.png)",
          }}
        />
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <div>
              <div className="text-xs font-semibold text-gray-700">
                {authorLabel}
              </div>
              <div className="text-xs text-gray-400">{timeLabel}</div>
            </div>
            <CommentActions likeCount={comment.likeCount} isMine={isMine} />
          </div>
          <p className="text-sm text-gray-800 leading-6 whitespace-pre-line">
            {comment.content}
          </p>
        </div>
      </div>
    </div>
  );
}

function CommentActions({
  likeCount,
  isMine,
}: {
  small?: boolean;
  likeCount: number;
  isMine: boolean;
}) {
  return (
    <div className="text-xs text-gray-400 space-x-4">
      <button className="hover:underline">
        공감{likeCount > 0 ? `(${likeCount})` : ""}
      </button>
      {isMine && <button className="hover:underline">삭제</button>}
    </div>
  );
}
