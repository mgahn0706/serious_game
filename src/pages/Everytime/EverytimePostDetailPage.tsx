"use client";

import { useParams, useNavigate } from "react-router-dom";
import {
  Bell,
  Heart,
  MessageCircle,
  Flag,
  ThumbsUp,
  ThumbsDown,
  Bookmark,
  Pencil,
} from "lucide-react";
import {
  everytimePosts,
  type EverytimePost,
  type EverytimeComment,
} from "../../features/everytime/fixtures/post";

/* ---------------- Page ---------------- */

export default function EverytimePostDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const post: EverytimePost | undefined = id
    ? everytimePosts.find((p) => p.id === Number(id))
    : undefined;

  if (!post) {
    return (
      <div className="min-h-screen bg-[#fafafa] text-[#333]">
        <div className="max-w-6xl mx-auto px-6 py-10 text-center text-gray-500">
          해당 게시글을 찾을 수 없습니다.
          <div className="mt-4">
            <button
              onClick={() => navigate("/everytime")}
              className="px-4 py-2 border border-red-500 text-red-500 text-sm font-semibold rounded bg-white hover:bg-red-50"
            >
              글 목록으로
            </button>
          </div>
        </div>
      </div>
    );
  }

  const commentList: EverytimeComment[] = post.commentList ?? [];

  return (
    <div className="min-h-screen bg-[#fafafa] text-[#333]">
      {/* Top Navigation (리스트 페이지와 동일) */}
      <header className="w-full bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-3">
          <div className="flex items-center gap-3">
            <div className="text-2xl font-bold text-red-600">에브리타임</div>
            <div className="text-xl font-semibold">서울대</div>
          </div>

          <nav className="flex items-center gap-8 text-sm font-medium">
            <a className="hover:text-red-600 cursor-pointer">게시판</a>
            <a className="hover:text-red-600 cursor-pointer">시간표</a>
            <a className="hover:text-red-600 cursor-pointer">강의평가</a>
            <a className="hover:text-red-600 cursor-pointer">친구</a>
            <a className="hover:text-red-600 cursor-pointer">책방</a>
            <a className="hover:text-red-600 cursor-pointer">캠퍼스픽</a>
          </nav>

          <div className="flex items-center gap-4">
            <Bell className="w-6 h-6 text-gray-600" />
            <div className="w-8 h-8 rounded-full bg-gray-300" />
            <div className="w-8 h-8 rounded-full bg-gray-300" />
          </div>
        </div>
      </header>

      {/* Main grid: 왼쪽 글 / 오른쪽 사이드바 */}
      <main className="max-w-6xl mx-auto grid grid-cols-4 gap-8 mt-4 px-6 pb-8">
        {/* LEFT: post detail (3 columns) */}
        <div className="col-span-3">
          <div className="border border-gray-200 bg-white">
            {/* Board header */}
            <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold">컴공/개발/IT 게시판</span>
                  <Flag className="w-4 h-4 text-black" />
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  컴퓨터공학, 취업/진로, 대학원 생활, IT업계 이야기
                </div>
              </div>
              <div className="text-xs text-gray-500 space-x-3">
                <button className="hover:underline">쪽지</button>
                <button className="hover:underline">신고</button>
              </div>
            </div>

            {/* Post header + body */}
            <div className="px-6 py-5 border-b border-gray-200">
              {/* Author row */}
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gray-200" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-semibold">익명</div>
                      {/* fixture엔 날짜만 있어서 시간은 더미 */}
                      <div className="text-xs text-gray-500">
                        {post.date} 01:25
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Title & content (레이아웃 유지) */}
              <div className="ml-13">
                <h1 className="text-xl font-bold mb-3">{post.title}</h1>
                <p className="text-sm leading-relaxed mb-6">
                  {post.preview || "본문 내용이 없습니다."}
                </p>
              </div>

              {/* Reactions + buttons */}
              <div className="ml-13">
                {/* Reaction counts */}
                <div className="flex items-center gap-5 text-xs text-gray-500 mb-3">
                  <div className="flex items-center gap-1">
                    <ThumbsUp className="w-4 h-4 text-red-500" />
                    <span>0</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <ThumbsDown className="w-4 h-4 text-gray-400" />
                    <span>0</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="w-4 h-4 text-gray-400" />
                    <span>{commentList.length}</span>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex gap-2">
                  <button className="px-4 py-1.5 rounded border border-gray-300 bg-gray-50 text-xs text-gray-700">
                    공감
                  </button>
                  <button className="px-4 py-1.5 rounded border border-gray-300 bg-gray-50 text-xs text-gray-700 flex items-center gap-1">
                    <Bookmark className="w-3 h-3" />
                    <span>스크랩</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Comments */}
            <div className="border-b border-gray-200">
              {commentList.map((comment) => (
                <CommentItem key={comment.id} {...comment} />
              ))}

              {commentList.length === 0 && (
                <div className="px-6 py-4 text-sm text-gray-500 border-t border-gray-100">
                  아직 댓글이 없습니다.
                </div>
              )}
            </div>

            {/* Comment input hint */}
            <div className="px-6 py-4 border-b border-gray-200 text-sm text-gray-400">
              댓글을 입력하세요.
            </div>

            {/* Bottom bar */}
            <div className="px-6 py-4 flex items-center justify-between">
              <button
                className="px-4 py-2 border border-red-500 text-red-500 text-sm font-semibold rounded bg-white hover:bg-red-50"
                onClick={() => navigate("/everytime")}
              >
                글 목록
              </button>

              <div className="flex items-center gap-3">
                <label className="flex items-center gap-1 text-xs text-gray-600">
                  <input type="checkbox" className="w-3 h-3" />
                  <span>익명</span>
                </label>
                <button className="w-9 h-9 rounded bg-red-500 flex items-center justify-center text-white hover:bg-red-600">
                  <Pencil className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: sidebar (리스트 페이지와 비슷한 느낌) */}
        <div className="col-span-1 space-y-6">
          <SidebarBox title="실시간 인기 글">
            <HotCard
              title="서울대 출입비자에 뿔나는 비자"
              likes={248}
              comments={30}
            />
            <HotCard title="모레 설문 한껀 기입" likes={96} comments={15} />
          </SidebarBox>

          <SidebarBox title="HOT 게시물">
            <ListRow
              title="수제디저트를 생일선물로 줘도 되나요"
              date="11/29 19:51"
            />
            <ListRow title="경멸은 국가를 가리지 않는다" date="11/30 19:47" />
            <ListRow title="진지하게" date="11/30 19:05" />
            <ListRow title="서울대경영이라는덴" date="11/30 17:17" />
          </SidebarBox>

          <SidebarBox title="BEST 게시판">
            <ListRow title="학교 소식" />
          </SidebarBox>

          <SidebarBox title="학교 소식">
            <p className="text-xs text-gray-700 leading-snug">
              [Signal 공약 이행 보고]
              <br />
              안녕하세요, 제16대 서울대학생회 총학생회 <b>Signal</b>입니다.
              <br />
              공약별로 이행 상황에 따라 1년간 이행한 공약 결과를 보고드립니다.
            </p>
          </SidebarBox>

          <SidebarBox title="최근 강의평">
            <p className="text-xs text-gray-700 leading-snug">
              ★★★★★ 나느김과 제자 : 김영오
              <br />
              매번 마지막 강의같긴 하지만 올해도 하는 걸 보면 내년에도 하지
              않을까...
            </p>
          </SidebarBox>
        </div>
      </main>
    </div>
  );
}

/* ---------- Comment item ---------- */

function CommentItem({ author, time, content, isReply }: EverytimeComment) {
  if (isReply) {
    return (
      <div className="px-6 py-3 border-t border-gray-100">
        <div className="ml-12 rounded bg-[#f7f7f7] px-4 py-3">
          <div className="flex items-start gap-3">
            <div className="w-7 h-7 rounded-full bg-gray-300" />
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <div>
                  <span className="text-xs font-semibold">{author}</span>
                  <span className="ml-2 text-[11px] text-gray-500">{time}</span>
                </div>
                <CommentActions small />
              </div>
              <p className="text-xs text-gray-700">{content}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-6 py-4 border-t border-gray-100">
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-full bg-gray-300" />
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <div>
              <div className="text-sm font-semibold">{author}</div>
              <div className="text-[11px] text-gray-500">{time}</div>
            </div>
            <CommentActions />
          </div>
          <p className="text-sm text-gray-800 whitespace-pre-line">{content}</p>
        </div>
      </div>
    </div>
  );
}

/* ---------- Right-side comment actions ---------- */

function CommentActions({ small = false }: { small?: boolean }) {
  const base = small ? "text-[11px]" : "text-xs";
  return (
    <div className={`${base} text-gray-400 space-x-3`}>
      {!small && <button className="hover:underline">대댓글</button>}
      <button className="hover:underline">공감</button>
      <button className="hover:underline">쪽지</button>
      <button className="hover:underline">신고</button>
    </div>
  );
}

/* ---------- Sidebar components ---------- */

function SidebarBox({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white border border-gray-300 rounded">
      <div className="px-4 py-2 border-b border-gray-200 flex items-center justify-between">
        <span className="text-sm font-semibold">{title}</span>
        <button className="text-[11px] text-gray-500 hover:underline">
          더 보기
        </button>
      </div>
      <div className="px-4 py-3 space-y-2">{children}</div>
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
    <div className="text-xs cursor-pointer hover:text-red-600">
      <div className="mb-1">{title}</div>
      <div className="flex items-center gap-4 text-[11px] text-gray-500">
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

function ListRow({ title, date }: { title: string; date?: string }) {
  return (
    <div className="flex items-center justify-between text-xs cursor-pointer hover:text-red-600">
      <span className="truncate">{title}</span>
      {date && <span className="text-[11px] text-gray-400 ml-2">{date}</span>}
    </div>
  );
}
