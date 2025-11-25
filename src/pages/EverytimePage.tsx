import React from "react";
import {
  Search,
  Bell,
  User2,
  PencilLine,
  MessageCircle,
  Bookmark,
  ChevronRight,
  Dot,
  Heart,
} from "lucide-react";

type Post = {
  id: number;
  title: string;
  meta: string;
};

type BoardColumn = {
  id: string;
  name: string;
  accent?: "red";
  posts: Post[];
};

const leftQuickLinks = [
  { label: "내가 쓴 글", icon: PencilLine },
  { label: "댓글 단 글", icon: MessageCircle },
  { label: "내 스크랩", icon: Bookmark },
];

const centerBoards: BoardColumn[] = [
  {
    id: "free",
    name: "자유게시판",
    accent: "red",
    posts: [
      { id: 1, title: "사주팔자 사람", meta: "54분 전" },
      { id: 2, title: "알구엔년무얼보다", meta: "11/22 00:46" },
      { id: 3, title: "옛날엔", meta: "11/22 00:32" },
      { id: 4, title: "4만원원본 글 돈인가여", meta: "11/22 00:18" },
    ],
  },
  {
    id: "secret",
    name: "비밀게시판",
    accent: "red",
    posts: [
      { id: 1, title: "자랑하는 여자", meta: "방금 전" },
      { id: 2, title: "전여친이랑 헷갈려?", meta: "11/22 00:40" },
      { id: 3, title: "연애상담 좀만요", meta: "11/22 00:19" },
      { id: 4, title: "문명할래요", meta: "11/22 00:11" },
    ],
  },
  {
    id: "alumni",
    name: "졸업생게시판",
    posts: [
      {
        id: 1,
        title: "인턴 동기 탈탈나 당해보니 진짜 거짓말같더라",
        meta: "29분 전",
      },
      {
        id: 2,
        title: "에어팟 프로3 지하철에서만 사용 안하는 이유",
        meta: "11/22 00:36",
      },
      { id: 3, title: "나이 먹고 커뮤에서 싸우는 건", meta: "11/22 00:24" },
      { id: 4, title: "무인양품 바지 왜이리 비싸지", meta: "11/22 00:15" },
    ],
  },
  {
    id: "freshman",
    name: "새내기게시판",
    posts: [
      { id: 1, title: "2학번인데 생얼임", meta: "11/22 00:47" },
      { id: 2, title: "학교생활 팁 알려주세요", meta: "11/22 00:41" },
      { id: 3, title: "기숙사 룸메 구해요", meta: "11/22 00:23" },
      { id: 4, title: "CC 해본 사람 후기좀요", meta: "11/22 00:10" },
    ],
  },
  {
    id: "issue",
    name: "시사·이슈",
    posts: [
      { id: 1, title: "야구 국대 명단 나옴", meta: "11/22 00:53" },
      { id: 2, title: "MBC 뉴스 댓글 상황", meta: "11/22 00:36" },
      { id: 3, title: "시험기간 지하철 상황 레전드", meta: "11/22 00:21" },
      { id: 4, title: "주식시장 요즘 왜 이럼", meta: "11/22 00:09" },
    ],
  },
  {
    id: "market",
    name: "장터게시판",
    posts: [
      { id: 1, title: "아이패드 미니 6세대 판매합니다", meta: "11/22 00:48" },
      { id: 2, title: "전공책 일괄 3만원", meta: "11/22 00:35" },
      { id: 3, title: "기숙사 침대 무료 나눔", meta: "11/22 00:20" },
      { id: 4, title: "중고 자전거 팝니다", meta: "11/22 00:05" },
    ],
  },
];

const hotPosts: Post[] = [
  {
    id: 1,
    title: "학원생인가 이래도 되는건가?",
    meta: "자유게시판 · 댓글 50 · 07:27",
  },
  {
    id: 2,
    title: "강점 분석",
    meta: "비밀게시판 · 댓글 48 · 01:18",
  },
];

const rightSections = [
  {
    id: "realtime",
    title: "실시간 인기 글",
    posts: hotPosts,
  },
  {
    id: "hot",
    title: "HOT 게시물",
    posts: [
      { id: 3, title: "이거면 되나요..", meta: "어제 19:23" },
      { id: 4, title: "야베 자취요리 2탄", meta: "어제 20:30" },
      { id: 5, title: "이재명은 선공의 자질이 있음", meta: "어제 19:48" },
      { id: 6, title: "파슬리 숨음", meta: "어제 17:08" },
    ],
  },
  {
    id: "best",
    title: "BEST 게시판",
    posts: [
      { id: 7, title: "서울대생 월평균 지출 정리", meta: "이번주" },
      { id: 8, title: "장학금 정보 총정리", meta: "이번주" },
    ],
  },
  {
    id: "news",
    title: "학교 소식",
    posts: [
      {
        id: 9,
        title: "[SNU 연구실 안전보건 공모전 안내 리마인드]",
        meta: "학생지원팀",
      },
    ],
  },
];

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-etGrayBg">
      <Header />
      <main className="mx-auto flex max-w-6xl gap-4 px-4 pb-10 pt-4">
        <LeftSidebar />
        <CenterColumn />
        <RightSidebar />
      </main>
    </div>
  );
};

const Header: React.FC = () => {
  return (
    <header className="border-b border-gray-200 bg-white">
      {/* 상단 로고 + 계정 */}
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-etRed text-white text-xl font-bold">
              :)
            </div>
            <div className="leading-tight">
              <div className="text-[11px] text-gray-500">에브리타임</div>
              <div className="text-[15px] font-bold text-gray-900">서울대</div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3 text-[11px] text-gray-600">
          <button className="rounded border border-gray-300 px-3 py-1">
            로그인
          </button>
          <button className="rounded border border-gray-300 px-3 py-1">
            회원가입
          </button>
        </div>
      </div>

      {/* 상단 메뉴바 */}
      <nav className="border-t border-gray-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4">
          <ul className="flex gap-6 py-2 text-[13px]">
            <li className="border-b-2 border-etRed pb-1 font-semibold text-etRed">
              게시판
            </li>
            <li className="pb-1 text-gray-700 hover:text-etRed">시간표</li>
            <li className="pb-1 text-gray-700 hover:text-etRed">강의실</li>
            <li className="pb-1 text-gray-700 hover:text-etRed">학점계산기</li>
            <li className="pb-1 text-gray-700 hover:text-etRed">친구</li>
            <li className="pb-1 text-gray-700 hover:text-etRed">책방</li>
            <li className="pb-1 text-gray-700 hover:text-etRed">캠퍼스픽</li>
          </ul>
          <div className="flex items-center gap-3 py-2 text-xs text-gray-500">
            <button className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-300 bg-gray-50">
              <Bell className="h-4 w-4" />
            </button>
            <button className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-300 bg-gray-50">
              <User2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </nav>

      {/* 게시판 카테고리 줄 */}
      <div className="border-t border-gray-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap gap-x-10 gap-y-1 px-4 py-3 text-[11px] leading-5 text-gray-700">
          <CategoryColumn
            title="자유게시판"
            items={["자유게시판", "비밀게시판", "졸업생게시판", "새내기게시판"]}
          />
          <CategoryColumn
            title="홍보게시판"
            items={["홍보게시판", "동아리홍보"]}
          />
          <CategoryColumn
            title="취업·진로"
            items={["취업·진로", "LEET 게시판", "CPA 게시판"]}
          />
          <CategoryColumn
            title="총학생회"
            items={["총학생회", "신문사", "방송국"]}
          />
          <CategoryColumn
            title="경제 게시판"
            items={["경영/경제게시판", "금융투자게시판", "부동산게시판"]}
          />
          <CategoryColumn
            title="두근두근 소개팅"
            items={["군인/미필", "공무원시험", "고시게시판"]}
          />
        </div>
      </div>
    </header>
  );
};

const CategoryColumn: React.FC<{ title: string; items: string[] }> = ({
  title,
  items,
}) => {
  return (
    <div className="min-w-[130px]">
      <div className="mb-0.5 text-[11px] font-semibold text-gray-800">
        {title}
      </div>
      <div className="flex flex-col gap-0.5">
        {items.map((item) => (
          <button
            key={item}
            className="flex items-center text-left text-[11px] text-gray-700 hover:text-etRed"
          >
            <Dot className="mr-0.5 h-3 w-3 text-etRed" />
            <span>{item}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

const LeftSidebar: React.FC = () => {
  return (
    <aside className="w-[210px] shrink-0">
      {/* 프로필 카드 */}
      <div className="mb-3 rounded border border-gray-200 bg-white">
        <div className="border-b border-gray-200 px-3 py-2 text-[11px] font-semibold text-gray-700">
          시리어스 게임
        </div>
        <div className="flex items-center gap-3 px-3 py-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full border border-gray-300 text-[10px]">
            LOGO
          </div>
          <div className="text-[11px]">
            <div className="font-semibold text-gray-800">알민구</div>
            <div className="mt-1 flex gap-2">
              <button className="rounded bg-etRed px-3 py-1 text-[11px] text-white">
                내 정보
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 내 활동 */}
      <div className="mb-3 rounded border border-gray-200 bg-white">
        {leftQuickLinks.map((item, idx) => (
          <button
            key={item.label}
            className={`flex w-full items-center justify-between px-3 py-2 text-[11px] ${
              idx !== leftQuickLinks.length - 1
                ? "border-b border-gray-100"
                : ""
            } hover:bg-gray-50`}
          >
            <span className="flex items-center gap-2">
              <item.icon className="h-4 w-4 text-gray-500" />
              {item.label}
            </span>
            <ChevronRight className="h-3 w-3 text-gray-400" />
          </button>
        ))}
      </div>

      {/* 광고 자리 1 */}
      <div className="rounded border border-gray-200 bg-white p-3 text-center text-[11px] text-gray-500">
        <div className="mb-2 font-semibold text-gray-700">
          STANLEY 광고 영역
        </div>
        <div className="h-32 rounded bg-gray-100" />
      </div>
    </aside>
  );
};

const CenterColumn: React.FC = () => {
  return (
    <section className="flex-1 max-w-[570px]">
      {/* 상단 큰 배너 */}
      <div className="mb-3 flex h-36 items-center rounded border border-gray-200 bg-gradient-to-r from-[#3b8ad9] to-[#ed4f7d] px-6 py-4 text-white">
        <div>
          <div className="text-[11px] font-semibold">겨울 프사 찍기 좋은</div>
          <div className="mt-1 text-2xl font-bold">
            대형 크리스마스 트리 맛집
          </div>
          <div className="mt-1 text-xs font-medium">
            Merry &amp; Bright TIMES SQUARE
          </div>
        </div>
      </div>

      {/* 게시판 2열 그리드 */}
      <div className="grid grid-cols-2 gap-3">
        {centerBoards.map((board) => (
          <BoardCard key={board.id} board={board} />
        ))}
      </div>
    </section>
  );
};

const BoardCard: React.FC<{ board: BoardColumn }> = ({ board }) => {
  return (
    <div className="rounded border border-gray-200 bg-white">
      <div
        className={`border-b px-3 py-2 text-[11px] font-semibold ${
          board.accent === "red"
            ? "border-etRed text-etRed"
            : "border-gray-100 text-gray-800"
        }`}
      >
        {board.name}
      </div>
      <ul className="divide-y divide-gray-100">
        {board.posts.map((post) => (
          <li
            key={post.id}
            className="flex items-center justify-between px-3 py-1.5"
          >
            <div className="mr-2 flex-1 truncate text-[11px] text-gray-900">
              {post.title}
            </div>
            <div className="whitespace-nowrap text-[10px] text-gray-400">
              {post.meta}
            </div>
          </li>
        ))}
      </ul>
      <div className="border-t border-gray-100 px-3 py-1.5 text-right text-[10px] text-gray-400">
        더 보기 &gt;
      </div>
    </div>
  );
};

const RightSidebar: React.FC = () => {
  return (
    <aside className="w-[260px] shrink-0">
      {/* 검색창 */}
      <div className="mb-3 rounded border border-gray-200 bg-white px-3 py-2">
        <div className="flex items-center gap-2 rounded border border-gray-200 bg-gray-50 px-2 py-1.5">
          <Search className="h-4 w-4 text-gray-400" />
          <input
            className="h-5 w-full bg-transparent text-[11px] outline-none placeholder:text-gray-400"
            placeholder="전체 게시판의 글을 검색하세요!"
          />
        </div>
      </div>

      {/* 오른쪽 섹션들 */}
      <div className="space-y-3">
        {rightSections.map((section) => (
          <div
            key={section.id}
            className="rounded border border-gray-200 bg-white"
          >
            <div className="flex items-center justify-between border-b border-gray-100 px-3 py-2 text-[11px] font-semibold text-etBlue">
              <span>{section.title}</span>
              <button className="text-[10px] text-gray-400">
                더 보기 &gt;
              </button>
            </div>
            <ul className="divide-y divide-gray-100">
              {section.posts.map((p, idx) => (
                <li key={p.id} className="px-3 py-2">
                  <div className="text-[11px] text-gray-900">{p.title}</div>
                  <div className="mt-0.5 flex items-center justify-between">
                    <span className="text-[10px] text-gray-400">{p.meta}</span>
                    {/* 인기글엔 아이콘 살짝 */}
                    {section.id === "realtime" && idx === 0 && (
                      <span className="flex items-center gap-2 text-[10px] text-gray-500">
                        <span className="inline-flex items-center gap-0.5">
                          <Heart className="h-3 w-3 text-etRed" />
                          <span>50</span>
                        </span>
                        <span className="inline-flex items-center gap-0.5">
                          <MessageCircle className="h-3 w-3" />
                          <span>77</span>
                        </span>
                        <Bookmark className="h-3 w-3" />
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default App;
