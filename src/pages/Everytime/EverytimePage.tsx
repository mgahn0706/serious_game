"use client";

import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { ChevronDown, Search as SearchIcon, MessageCircle } from "lucide-react";

import { everytimeData } from "@/features/everytime/fixtures/post";
import type {
  EverytimeBoard,
  EverytimePost,
} from "@/features/everytime/types/types";

// ✅ 공통 컴포넌트들
import { EverytimeTopBar } from "@/features/everytime/components/EverytimeTopBar";
import { EverytimeSidebar } from "@/features/everytime/components/Sidebar";

export default function EverytimePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const { boardId } = useParams(); // ✅ /everytime/board/:boardId

  // ✅ pagination
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 5;

  // ✅ 현재 선택된 board 결정 (없으면 0번 fallback)
  const board: EverytimeBoard = useMemo(() => {
    if (!boardId) return everytimeData.boards[0];
    return (
      everytimeData.boards.find((b) => String(b.id) === boardId) ??
      everytimeData.boards[0]
    );
  }, [boardId]);

  const posts = board.posts;
  const normalized = searchTerm.trim().toLowerCase();

  const filteredPosts = useMemo(() => {
    if (!normalized) return posts;
    return posts.filter((post) => {
      const text = (post.title + " " + post.preview).toLowerCase();
      return text.includes(normalized);
    });
  }, [normalized, posts]);

  // ✅ 검색어/보드 바뀌면 1페이지로
  useMemo(() => {
    setPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [normalized, String(board.id)]);

  // ✅ paginate
  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / PAGE_SIZE));
  const pagePosts = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filteredPosts.slice(start, start + PAGE_SIZE);
  }, [filteredPosts, page]);

  // ✅ 카테고리별 보드 묶기 (데이터에 categoryTitle이 이미 있음)
  const boardsByCategory = useMemo(() => {
    const map = new Map<string, EverytimeBoard[]>();
    for (const b of everytimeData.boards) {
      const key = b.categoryTitle || "기타";
      map.set(key, [...(map.get(key) ?? []), b]);
    }
    return map;
  }, []);

  return (
    <div className="min-h-screen bg-[#fafafa] text-[#333]">
      <EverytimeTopBar />

      {/* ✅ Category Dropdown: “진짜 보드”로 렌더링 */}
      <div className="w-full bg-white border-b border-gray-200 py-4">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-4 gap-6 text-sm leading-6">
          {[...boardsByCategory.entries()].map(([categoryTitle, boards]) => (
            <CategoryColumn
              key={categoryTitle}
              title={categoryTitle}
              boards={boards}
              currentBoardId={String(board.id)}
            />
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto grid grid-cols-4 gap-8 mt-6 px-6">
        {/* Left 3-column – Posts */}
        <div className="col-span-3">
          <h2 className="text-xl font-semibold mb-4">{board.title}</h2>

          {pagePosts.length > 0 ? (
            pagePosts.map((post) => <Post key={String(post.id)} {...post} />)
          ) : (
            <div className="bg-white border border-gray-300 rounded p-6 mb-2 text-sm text-gray-500">
              검색 결과가 없습니다.
            </div>
          )}

          {/* Search Bar + Pagination */}
          <div className="mt-6 flex items-center justify-between">
            <div className="flex items-center border border-gray-300 rounded-md px-4 py-2 w-full max-w-xl bg-white">
              <button className="flex items-center gap-1 text-sm text-gray-700 mr-4">
                <span>전체</span>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </button>

              <div className="h-5 w-px bg-gray-300 mr-4" />

              <input
                type="text"
                placeholder="검색어를 입력하세요."
                className="flex-1 text-sm text-gray-800 placeholder-gray-400 outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

              <SearchIcon className="w-5 h-5 text-gray-500 ml-3" />
            </div>

            <div className="ml-6 flex items-center gap-2">
              <button
                className="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-semibold rounded-md bg-white hover:bg-gray-50 disabled:opacity-50"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page <= 1}
              >
                이전
              </button>

              <div className="text-xs text-gray-500 min-w-[72px] text-center">
                {page} / {totalPages}
              </div>

              <button
                className="px-4 py-2 border border-red-500 text-red-500 text-sm font-semibold rounded-md hover:bg-red-50 disabled:opacity-50"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page >= totalPages}
              >
                다음 &gt;
              </button>
            </div>
          </div>
        </div>

        {/* Right 1-column */}
        <EverytimeSidebar />
      </main>
    </div>
  );
}

/* ---------------- Components ---------------- */

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
      {/* ✅ reduce margin */}
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

// ✅ 타입에 맞게: createdAt / comments.length
function Post({ id, title, createdAt, preview, comments }: EverytimePost) {
  const navigate = useNavigate();
  const commentCount = comments.length;

  return (
    <div
      className="bg-white border border-gray-300 rounded p-3 mb-2 text-sm cursor-pointer hover:bg-gray-50"
      onClick={() => navigate(`/everytime/${String(id)}`)}
    >
      <div className="font-semibold mb-1">{title}</div>
      <div className="text-gray-600 mb-2 line-clamp-2">{preview}</div>
      <div className="flex items-center gap-4 text-gray-400 text-xs">
        <span>{createdAt}</span>
        {commentCount > 0 && (
          <span className="flex items-center gap-1 text-blue-500">
            <MessageCircle className="w-3 h-3" /> {commentCount}
          </span>
        )}
      </div>
    </div>
  );
}
