"use client";

import type React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Bell,
  Heart,
  MessageCircle,
  ChevronDown,
  Search as SearchIcon,
} from "lucide-react";
import {
  everytimePosts,
  type EverytimePost,
} from "../../features/everytime/fixtures/post";

export default function EverytimePage() {
  const [searchTerm, setSearchTerm] = useState("");

  const normalized = searchTerm.trim().toLowerCase();

  const filteredPosts = normalized
    ? everytimePosts.filter((post) => {
        const text = (post.title + " " + post.preview).toLowerCase();
        return text.includes(normalized);
      })
    : everytimePosts;

  return (
    <div className="min-h-screen bg-[#fafafa] text-[#333]">
      {/* Top Navigation */}
      <header className="w-full bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-3">
          {/* Logo left */}
          <div className="flex items-center gap-3">
            <div className="text-2xl font-bold text-red-600">에브리타임</div>
            <div className="text-xl font-semibold">서울대</div>
          </div>

          {/* Navbar center */}
          <nav className="flex items-center gap-8 text-sm font-medium">
            <a className="hover:text-red-600 cursor-pointer">게시판</a>
            <a className="hover:text-red-600 cursor-pointer">시간표</a>
            <a className="hover:text-red-600 cursor-pointer">강의평가</a>
            <a className="hover:text-red-600 cursor-pointer">친구</a>
            <a className="hover:text-red-600 cursor-pointer">책방</a>
            <a className="hover:text-red-600 cursor-pointer">캠퍼스픽</a>
          </nav>

          {/* Right icons */}
          <div className="flex items-center gap-4">
            <Bell className="w-6 h-6 text-gray-600" />
            <div className="w-8 h-8 rounded-full bg-gray-300" />
            <div className="w-8 h-8 rounded-full bg-gray-300" />
          </div>
        </div>
      </header>

      {/* Category Dropdown */}
      <div className="w-full bg-white border-b border-gray-200 py-4">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-4 gap-6 text-sm leading-6">
          <CategoryColumn
            title="자유게시판"
            items={[
              "비밀게시판",
              "새내기게시판",
              "시사·이슈",
              "정보게시판",
              "이벤트게시판",
            ]}
          />

          <CategoryColumn
            title="홍보게시판"
            items={[
              "동아리·학회",
              "취업·진로",
              "LEET 게시판",
              "CPA 게시판",
              "행사/세미나 게시판",
              "학회/대외활동 게시판",
            ]}
          />

          <CategoryColumn
            title="경영대학 게시판"
            items={[
              "전기과 게시판",
              "경제 게시판",
              "관악사 게시판",
              "전공/과목 게시판",
              "기타 게시판",
            ]}
          />

          <CategoryColumn
            title="교환학생 게시판"
            items={[
              "유학/해외체류 게시판",
              "드론·모빌리티 게시판",
              "IT·기술 게시판",
              "KBO 게시판",
              "군인 게시판",
            ]}
          />
        </div>
      </div>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto grid grid-cols-4 gap-8 mt-6 px-6">
        {/* Left 3-column – Posts */}
        <div className="col-span-3">
          <h2 className="text-xl font-semibold mb-4">유학 + 해외체류 게시판</h2>

          {/* Write box */}
          <div className="bg-white border border-gray-300 rounded p-4 mb-4">
            <input
              type="text"
              placeholder="새 글을 작성해보세요!"
              className="w-full bg-transparent outline-none text-sm"
            />
          </div>

          {/* Posts from fixtures (filtered) */}
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => <Post key={post.id} {...post} />)
          ) : (
            <div className="bg-white border border-gray-300 rounded p-6 mb-3 text-sm text-gray-500">
              검색 결과가 없습니다.
            </div>
          )}

          {/* Search Bar + Next Button */}
          <div className="mt-6 flex items-center justify-between">
            {/* Search box */}
            <div className="flex items-center border border-gray-300 rounded-md px-4 py-2 w-full max-w-xl bg-white">
              {/* Dropdown (전체) */}
              <button className="flex items-center gap-1 text-sm text-gray-700 mr-4">
                <span>전체</span>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </button>

              {/* Divider */}
              <div className="h-5 w-px bg-gray-300 mr-4" />

              {/* Input */}
              <input
                type="text"
                placeholder="검색어를 입력하세요."
                className="flex-1 text-sm text-gray-800 placeholder-gray-400 outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

              {/* Search icon */}
              <SearchIcon className="w-5 h-5 text-gray-500 ml-3" />
            </div>

            {/* Next button (아직 기능 없음, UI만) */}
            <button className="ml-6 px-5 py-2 border border-red-500 text-red-500 text-sm font-semibold rounded-md hover:bg-red-50">
              다음 &gt;
            </button>
          </div>
        </div>

        {/* Right 1-column Sidebar */}
        <div className="col-span-1 space-y-6">
          <SidebarBox title="실시간 인기 글">
            <HotCard
              title="서울대 출입비자에 뿔나는 비자"
              likes={244}
              comments={30}
            />
            <HotCard title="모레 설문 한거 기억" likes={96} comments={15} />
          </SidebarBox>

          <SidebarBox title="HOT 게시물">
            <ListText title="수제 디저트를 생일선물로 줘도 되나요" />
            <ListText title="경찰은 국가를 가지지 않는다" />
            <ListText title="진지하게" />
            <ListText title="서울대경영아닌데" />
          </SidebarBox>

          <SidebarBox title="BEST 게시물">
            <ListText title="학교 소식" />
            <ListText title="Signal 공약 이행 보고" />
          </SidebarBox>
        </div>
      </main>
    </div>
  );
}

/* ---------------- Components ---------------- */

function CategoryColumn({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <div className="font-semibold mb-2">{title}</div>
      <ul className="space-y-1 text-gray-700 text-sm">
        {items.map((item) => (
          <li key={item} className="cursor-pointer hover:text-red-600">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Post({ id, title, date, preview, comments = 0 }: EverytimePost) {
  const navigate = useNavigate();

  return (
    <div
      className="bg-white border border-gray-300 rounded p-4 mb-3 text-sm cursor-pointer hover:bg-gray-50"
      onClick={() => navigate(`/everytime/${id}`)}
    >
      <div className="font-semibold mb-1">{title}</div>
      <div className="text-gray-600 mb-2 line-clamp-2">{preview}</div>
      <div className="flex items-center gap-4 text-gray-400 text-xs">
        <span>{date}</span>
        {comments > 0 && (
          <span className="flex items-center gap-1 text-blue-500">
            <MessageCircle className="w-3 h-3" /> {comments}
          </span>
        )}
      </div>
    </div>
  );
}

function SidebarBox({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white border border-gray-300 rounded p-4">
      <div className="font-semibold text-sm mb-2">{title}</div>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function HotCard({
  title,
  likes,
  comments,
}: {
  title: string;
  likes: number;
  comments: number;
}) {
  return (
    <div className="text-sm cursor-pointer hover:text-red-600">
      <div>{title}</div>
      <div className="flex items-center gap-4 text-xs text-gray-500">
        <span className="flex items-center gap-1">
          <Heart className="w-3 h-3" /> {likes}
        </span>
        <span className="flex items-center gap-1">
          <MessageCircle className="w-3 h-3" /> {comments}
        </span>
      </div>
    </div>
  );
}

function ListText({ title }: { title: string }) {
  return (
    <div className="text-sm cursor-pointer hover:text-red-600">{title}</div>
  );
}
