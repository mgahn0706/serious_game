// src/App.tsx
import React, { useMemo, useState } from "react";
import { ChevronDown, ChevronRight, Search, Filter } from "lucide-react";
import { Link } from "react-router-dom";
import { products } from "@/features/danggeun/fixtures/products";
import type { Product } from "@/features/danggeun/types/types";
import DanggeunHeader from "@/features/danggeun/components/DanggeunHeader";

type SortKey = "latest" | "priceAsc" | "priceDesc";

const CATEGORY_TABS = [
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
] as const;

const DangguenPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>(
    CATEGORY_TABS[0]
  );
  const [sortKey, setSortKey] = useState<SortKey>("latest");

  const normalized = searchTerm.trim().toLowerCase();

  const filtered = useMemo(() => {
    // 1) category filter
    const byCategory =
      selectedCategory === "인기 검색어"
        ? products
        : products.filter((p) => p.category === selectedCategory);

    // 2) search filter (title + description + category)
    const bySearch = !normalized
      ? byCategory
      : byCategory.filter((p) => {
          const hay = `${p.title} ${p.description ?? ""} ${
            p.category ?? ""
          }`.toLowerCase();
          return hay.includes(normalized);
        });

    // 3) sort
    const sorted = [...bySearch];
    sorted.sort((a, b) => {
      if (sortKey === "latest") {
        // fixture에 createdAt이 있으면 그걸 쓰고, 없으면 id desc (목록 최신 느낌)
        const aT =
          typeof (a as any).createdAt === "number"
            ? (a as any).createdAt
            : a.id;
        const bT =
          typeof (b as any).createdAt === "number"
            ? (b as any).createdAt
            : b.id;
        return bT - aT;
      }
      if (sortKey === "priceAsc") return a.price - b.price;
      return b.price - a.price; // priceDesc
    });

    return sorted;
  }, [normalized, selectedCategory, sortKey]);

  return (
    <div className="min-h-screen bg-carrotGrayBg">
      <Header
        searchTerm={searchTerm}
        onChangeSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        onChangeCategory={setSelectedCategory}
        sortKey={sortKey}
        onChangeSortKey={setSortKey}
        totalCount={filtered.length}
      />
      <MainContent products={filtered} />
    </div>
  );
};

const Header: React.FC<{
  searchTerm: string;
  onChangeSearchTerm: (v: string) => void;
  selectedCategory: string;
  onChangeCategory: (v: string) => void;
  sortKey: SortKey;
  onChangeSortKey: (v: SortKey) => void;
  totalCount: number;
}> = ({
  searchTerm,
  onChangeSearchTerm,
  selectedCategory,
  onChangeCategory,
  sortKey,
  onChangeSortKey,
}) => {
  const [isSortOpen, setIsSortOpen] = useState(false);

  const sortLabel =
    sortKey === "latest"
      ? "최신순"
      : sortKey === "priceAsc"
      ? "가격 낮은순"
      : "가격 높은순";

  return (
    <header className="sticky top-0 z-20 border-b border-carrotBorder bg-white">
      <DanggeunHeader />
      {/* 검색바 */}
      <div className="border-t border-carrotBorder bg-white">
        <div className="mx-auto flex max-w-6xl items-center gap-4 px-6 py-3">
          <div className="flex items-center rounded-full border border-carrotBorder bg-[#f9fafb] px-4 py-2 flex-1">
            <Search className="mr-2 h-4 w-4 text-gray-400" />
            <input
              value={searchTerm}
              onChange={(e) => onChangeSearchTerm(e.target.value)}
              className="h-5 w-full bg-transparent text-[13px] outline-none placeholder:text-gray-400"
              placeholder="검색어를 입력해주세요"
            />
          </div>
          <button
            onClick={() => {
              // 버튼은 UX상 존재만. 이미 입력 즉시 반영이라 no-op.
            }}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-carrot text-white"
          >
            <Search className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* 카테고리 탭 */}
      <div className="border-t border-carrotBorder bg-white">
        <div className="mx-auto flex max-w-6xl items-center gap-3 overflow-x-auto px-6 py-2 text-[13px] text-gray-600">
          {CATEGORY_TABS.map((cat) => {
            const active = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => onChangeCategory(cat)}
                className={`whitespace-nowrap rounded-full px-3 py-1 ${
                  active
                    ? "bg-gray-100 font-medium text-carrot"
                    : "hover:bg-gray-100"
                }`}
              >
                {cat}
              </button>
            );
          })}

          {/* 정렬 드롭다운 (헤더에도 붙여서 바로 조작 가능하게) */}
          <div className="ml-auto relative shrink-0">
            <button
              onClick={() => setIsSortOpen((v) => !v)}
              className="flex items-center gap-1 rounded-full border border-carrotBorder px-3 py-1 hover:bg-gray-50"
            >
              <Filter className="h-3.5 w-3.5" />
              <span>{sortLabel}</span>
              <ChevronDown className="h-3 w-3" />
            </button>

            {isSortOpen && (
              <div className="absolute right-0 mt-2 w-44 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
                {[
                  { key: "latest" as const, label: "최신순" },
                  { key: "priceAsc" as const, label: "가격 낮은순" },
                  { key: "priceDesc" as const, label: "가격 높은순" },
                ].map((opt) => (
                  <button
                    key={opt.key}
                    onClick={() => {
                      onChangeSortKey(opt.key);
                      setIsSortOpen(false);
                    }}
                    className={`flex w-full items-center justify-between px-3 py-2 text-left text-[13px] hover:bg-gray-50 ${
                      sortKey === opt.key
                        ? "font-semibold text-gray-900"
                        : "text-gray-700"
                    }`}
                  >
                    <span>{opt.label}</span>
                    {sortKey === opt.key ? (
                      <span className="text-carrot">●</span>
                    ) : (
                      <span className="text-transparent">●</span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

const MainContent: React.FC<{ products: Product[] }> = ({ products }) => {
  return (
    <main className="mx-auto flex max-w-6xl gap-8 px-6 pb-10 pt-6">
      <section className="flex-1">
        {/* 위치 경로 */}
        <div className="mb-2 flex items-center gap-1 text-[12px] text-gray-500">
          <span>홈</span>
          <ChevronRight className="h-3 w-3" />
          <span>중고거래</span>
        </div>

        {/* 제목 */}
        <h1 className="mb-1 text-[22px] font-semibold text-carrotText">
          서울특별시 강남구 중고거래
        </h1>

        {/* 정렬 / 총 개수 (실제 필터 결과 반영) */}
        <div className="mb-4 flex items-center justify-between text-[12px] text-gray-500">
          <div>총 {products.length.toLocaleString()}개</div>
        </div>

        {/* 상품 그리드 */}
        <ProductGrid products={products} />
      </section>
    </main>
  );
};

const ProductGrid: React.FC<{ products: Product[] }> = ({ products }) => {
  if (products.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-gray-200 bg-white p-10 text-center text-[14px] text-gray-500">
        검색 결과가 없어요.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-6 md:grid-cols-3 lg:grid-cols-4">
      {products.map((p) => (
        <Link key={p.id} to={`/danggeun/products/${p.id}`} className="block">
          <ProductCard product={p} />
        </Link>
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

      {/* price가 number인 fixture 기준 */}
      <div className="mt-1 text-[15px] font-semibold text-gray-900">
        {product.price.toLocaleString()}원
      </div>

      <div className="mt-0.5 text-[12px] text-gray-500">
        {product.location} {product.time}
      </div>
    </article>
  );
};

export default DangguenPage;
