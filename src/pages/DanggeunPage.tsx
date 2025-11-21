// src/App.tsx
import React from "react";
import {
  MapPin,
  ChevronDown,
  ChevronRight,
  Search,
  Filter,
  CheckCircle2,
  Circle,
} from "lucide-react";

type Product = {
  id: number;
  title: string;
  price: string;
  location: string;
  time: string;
  imageUrl: string;
};

const products: Product[] = [
  {
    id: 1,
    title: "Emis 이미스 멀티 포켓 호보백 옐로우",
    price: "45,000원",
    location: "신당동 · 꼴릐 ·",
    time: "2시간 전",
    imageUrl:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 2,
    title: "애플워치10 티타늄 골드 42mm",
    price: "500,000원",
    location: "신당동 · 꼴릐 ·",
    time: "2시간 전",
    imageUrl:
      "https://images.unsplash.com/photo-1526434426615-4f1657843c8a?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 3,
    title: "레이디가구 이안 에디션 드레스룸",
    price: "100,000원",
    location: "신당동 · 꼴릐 ·",
    time: "2시간 전",
    imageUrl:
      "https://images.unsplash.com/photo-1616628188460-8fea8c78d7b7?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 4,
    title: "Creative Sound Blaster X3 DAC",
    price: "60,000원",
    location: "신당동 · 꼴릐 ·",
    time: "2시간 전",
    imageUrl:
      "https://images.unsplash.com/photo-1511391037251-0a3d8e1bcd3c?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 5,
    title: "(새상품) 베트레스크 버블 펫 애견 건조기",
    price: "95,000원",
    location: "신당동 · 꼴릐 ·",
    time: "2시간 전",
    imageUrl:
      "https://images.unsplash.com/photo-1525253086316-d0c936c814f8?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 6,
    title: "음료 빵 모음 약수동 베이커리",
    price: "4,500원",
    location: "신당동 · 꼴릐 ·",
    time: "2시간 전",
    imageUrl:
      "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 7,
    title: "샤넬 클래식 미듐 캐비어 은장",
    price: "14,800,000원",
    location: "신당동 · 꼴릐 ·",
    time: "2시간 전",
    imageUrl:
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 8,
    title: "유니클로 검정 맨투맨",
    price: "4,000원",
    location: "신당동 · 꼴릐 ·",
    time: "2시간 전",
    imageUrl:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=600&q=80",
  },
];

const DangguenPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-carrotGrayBg">
      <Header />
      <MainContent />
    </div>
  );
};

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-20 border-b border-carrotBorder bg-white">
      {/* 상단 네비 */}
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <div className="flex items-center gap-2">
          {/* 로고 영역 */}
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-carrot">
              <span className="text-lg font-bold text-white">당</span>
            </div>
            <span className="text-[18px] font-semibold text-carrotText">
              당근
            </span>
          </div>
          {/* 위치 선택 */}
          <button className="ml-4 flex items-center gap-1 rounded-full border border-transparent px-3 py-1 text-[13px] text-carrotText hover:bg-gray-100">
            <MapPin className="h-4 w-4 text-carrot" />
            <span className="font-medium">신당동</span>
            <ChevronDown className="h-4 w-4 text-gray-500" />
          </button>
        </div>

        {/* 상단 메뉴 */}
        <nav className="flex items-center gap-7 text-[14px] font-medium text-gray-800">
          <button className="text-carrot">중고거래</button>
          <button className="hover:text-carrot">부동산</button>
          <button className="hover:text-carrot">중고차</button>
          <button className="hover:text-carrot">알바</button>
          <button className="hover:text-carrot">동네업체</button>
          <button className="hover:text-carrot">동네생활</button>
          <button className="hover:text-carrot">모임</button>
        </nav>

        {/* 우측 앱 다운로드 버튼 */}
        <button className="rounded-full bg-carrot px-4 py-1.5 text-[13px] font-semibold text-white">
          앱 다운로드
        </button>
      </div>

      {/* 검색바 */}
      <div className="border-t border-carrotBorder bg-white">
        <div className="mx-auto flex max-w-6xl items-center gap-4 px-6 py-3">
          <div className="flex items-center rounded-full border border-carrotBorder bg-[#f9fafb] px-4 py-2 flex-1">
            <Search className="mr-2 h-4 w-4 text-gray-400" />
            <input
              className="h-5 w-full bg-transparent text-[13px] outline-none placeholder:text-gray-400"
              placeholder="검색어를 입력해주세요"
            />
          </div>
          <button className="flex h-9 w-9 items-center justify-center rounded-full bg-carrot text-white">
            <Search className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* 카테고리 탭 */}
      <div className="border-t border-carrotBorder bg-white">
        <div className="mx-auto flex max-w-6xl items-center gap-3 overflow-x-auto px-6 py-2 text-[13px] text-gray-600">
          {[
            "인기 검색어",
            "여성의류",
            "자전거",
            "아이들",
            "컴퓨터",
            "냉장고",
            "굿즈",
            "골프",
            "닌텐도",
            "다이슨",
            "캠핑",
            "포토카드",
            "에어팟",
            "버즈",
            "스타벅스",
          ].map((cat, idx) => (
            <button
              key={cat}
              className={`whitespace-nowrap rounded-full px-3 py-1 ${
                idx === 0
                  ? "bg-gray-100 font-medium text-carrot"
                  : "hover:bg-gray-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};

const MainContent: React.FC = () => {
  return (
    <main className="mx-auto flex max-w-6xl gap-8 px-6 pb-10 pt-6">
      <FilterSidebar />
      <section className="flex-1">
        {/* 위치 경로 */}
        <div className="mb-2 flex items-center gap-1 text-[12px] text-gray-500">
          <span>홈</span>
          <ChevronRight className="h-3 w-3" />
          <span>중고거래</span>
        </div>

        {/* 제목 */}
        <h1 className="mb-1 text-[22px] font-semibold text-carrotText">
          서울특별시 중구 신당동 중고거래
        </h1>

        {/* 정렬 / 총 개수 */}
        <div className="mb-4 flex items-center justify-between text-[12px] text-gray-500">
          <div>총 3,184개</div>
          <button className="flex items-center gap-1 rounded-full border border-carrotBorder px-3 py-1 hover:bg-gray-50">
            <Filter className="h-3.5 w-3.5" />
            <span>최신순</span>
            <ChevronDown className="h-3 w-3" />
          </button>
        </div>

        {/* 상품 그리드 */}
        <ProductGrid />
      </section>
    </main>
  );
};

const FilterSidebar: React.FC = () => {
  return (
    <aside className="w-[230px] shrink-0">
      {/* 필터 섹션 */}
      <div className="mb-4 text-[13px] font-semibold text-gray-900">필터</div>

      {/* 거래 가능만 보기 */}
      <div className="mb-4">
        <div className="mb-2 text-[13px] font-medium text-gray-900">
          거래 가능만 보기
        </div>
        <button className="flex items-center gap-2 text-[13px] text-gray-700">
          <CheckCircle2 className="h-4 w-4 text-carrot" />
          <span>지금 당장 거래 가능한 상품만 보기</span>
        </button>
      </div>

      {/* 위치 */}
      <div className="mb-5 border-t border-carrotBorder pt-4">
        <div className="mb-2 flex items-center justify-between text-[13px] font-medium text-gray-900">
          <span>위치</span>
          <button className="text-[12px] text-carrot">초기화</button>
        </div>
        <div className="mb-2 text-[12px] text-gray-500">서울특별시 중구</div>

        <div className="space-y-1">
          {["신당동", "약수동", "황학동", "명동", "중림동", "다산동"].map(
            (dong, idx) => (
              <button
                key={dong}
                className="flex items-center gap-2 text-[13px] text-gray-800"
              >
                {idx === 0 ? (
                  <CheckCircle2 className="h-4 w-4 text-carrot" />
                ) : (
                  <Circle className="h-4 w-4 text-gray-400" />
                )}
                <span>{dong}</span>
              </button>
            )
          )}
        </div>

        <button className="mt-2 flex items-center gap-1 text-[12px] text-gray-500">
          <span>더보기</span>
          <ChevronDown className="h-3 w-3" />
        </button>
      </div>

      {/* 카테고리 */}
      <div className="border-t border-carrotBorder pt-4">
        <div className="mb-2 text-[13px] font-medium text-gray-900">
          카테고리
        </div>
        <div className="space-y-1 text-[13px] text-gray-800">
          {[
            "디지털기기",
            "생활가전",
            "가구/인테리어",
            "생활/주방",
            "유아동",
          ].map((cat) => (
            <button
              key={cat}
              className="flex items-center gap-2 text-left hover:text-carrot"
            >
              <Circle className="h-4 w-4 text-gray-300" />
              <span>{cat}</span>
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
};

const ProductGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-6 md:grid-cols-3 lg:grid-cols-4">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
};

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <article className="cursor-pointer">
      <div className="mb-2 overflow-hidden rounded-[14px] border border-[#e5e7eb] bg-white">
        <div className="aspect-[4/3] w-full overflow-hidden">
          <img
            src={product.imageUrl}
            alt={product.title}
            className="h-full w-full object-cover transition-transform duration-200 hover:scale-105"
          />
        </div>
      </div>
      <h2 className="line-clamp-2 text-[14px] font-normal text-gray-900">
        {product.title}
      </h2>
      <div className="mt-1 text-[15px] font-semibold text-gray-900">
        {product.price}
      </div>
      <div className="mt-0.5 text-[12px] text-gray-500">
        {product.location} {product.time}
      </div>
    </article>
  );
};

export default DangguenPage;
