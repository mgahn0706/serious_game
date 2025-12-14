import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Smile } from "lucide-react";

import { products } from "@/features/danggeun/fixtures/products";
import { accounts } from "@/features/danggeun/fixtures/accounts";
import type { Product } from "@/features/danggeun/types/types";
import DanggeunHeader from "@/features/danggeun/components/DanggeunHeader";

type TabKey = "items" | "reviews";

export default function DanggeunAccountPage() {
  const { id } = useParams<{ id: string }>();
  const accountId = Number(id);

  const account = accounts.find((a) => a.id === accountId);

  const myProducts = useMemo(() => {
    return products.filter((p) => p.sellerId === accountId);
  }, [accountId]);

  const [tab, setTab] = useState<TabKey>("items");

  // 거래후기 count: fixture에 없으면 0(혹은 임시값)
  const reviewCount = 3; // 스샷처럼 보이게. 원하면 fixture로 분리해줄게.

  if (!account) {
    return (
      <div className="min-h-screen bg-white">
        <main className="mx-auto max-w-6xl px-6 py-16">
          <div className="text-[16px] text-gray-700">
            계정을 찾을 수 없어요.
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <DanggeunHeader />

      <main className="mx-auto max-w-6xl px-6">
        {/* Profile block */}
        <section className="pt-16">
          <div className="flex items-start justify-between">
            {/* Left: avatar + name */}
            <div className="flex items-center gap-6">
              <Avatar src={account.avatarUrl} alt={account.username} />

              <div>
                <div className="text-[26px] font-bold tracking-tight text-gray-900">
                  {account.username}
                </div>
                <div className="mt-1 text-[16px] text-gray-500">
                  {account.location}
                </div>
              </div>
            </div>

            {/* Right: manner temperature */}
            <div className="flex flex-col items-end">
              <div className="flex items-center gap-2">
                <span className="text-[22px] font-bold text-sky-500">
                  {account.temperature.toFixed(1)}°C
                </span>
                <Smile className="h-6 w-6 text-amber-400" />
              </div>

              {/* mini bar */}
              <div className="mt-2 w-28">
                <div className="h-1.5 w-full rounded-full bg-gray-200 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-sky-500"
                    style={{
                      width: `${Math.max(
                        0,
                        Math.min(100, (account.temperature / 50) * 100)
                      )}%`,
                    }}
                  />
                </div>
              </div>

              <div className="mt-2 text-[14px] text-gray-400">매너온도</div>
            </div>
          </div>

          {/* Tabs */}
          <div className="mt-14 border-b border-gray-200">
            <div className="flex items-end gap-10">
              <button
                onClick={() => setTab("items")}
                className={`relative pb-4 text-[18px] font-semibold ${
                  tab === "items" ? "text-gray-900" : "text-gray-400"
                }`}
              >
                판매 물품 ({myProducts.length})
                {tab === "items" && (
                  <span className="absolute left-0 -bottom-[1px] h-[2px] w-full bg-gray-900" />
                )}
              </button>

              <button
                onClick={() => setTab("reviews")}
                className={`relative pb-4 text-[18px] font-semibold ${
                  tab === "reviews" ? "text-gray-900" : "text-gray-400"
                }`}
              >
                거래 후기 ({reviewCount})
                {tab === "reviews" && (
                  <span className="absolute left-0 -bottom-[1px] h-[2px] w-full bg-gray-900" />
                )}
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="py-10">
            {tab === "items" ? (
              <ProductsGrid products={myProducts} />
            ) : (
              <ReviewsPlaceholder />
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

/* ---------------- Header (accurate clone-ish) ---------------- */

/* ---------------- UI parts ---------------- */

function Avatar({ src, alt }: { src: string; alt: string }) {
  // 스샷처럼 회색 기본 원형 느낌 + 이미지 실패 시 fallback
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gray-200">
        <div className="h-12 w-12 rounded-full bg-gray-300" />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setFailed(true)}
      className="h-24 w-24 rounded-full object-cover"
    />
  );
}

function ProductsGrid({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return (
      <div className="py-16 text-center text-[15px] text-gray-500">
        판매 중인 물품이 없어요.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
      {products.map((p) => (
        <Link key={p.id} to={`/danggeun/products/${p.id}`} className="block">
          <article className="cursor-pointer">
            <div className="mb-3 overflow-hidden rounded-xl border border-gray-200 bg-white">
              <div className="aspect-[4/3] w-full overflow-hidden">
                <img
                  src={p.imageUrl}
                  alt={p.title}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            <div className="line-clamp-1 text-[15px] font-medium text-gray-900">
              {p.title}
            </div>

            <div className="mt-1 text-[18px] font-bold text-gray-900">
              {p.price.toLocaleString()}원
            </div>

            <div className="mt-3 text-[13px] text-gray-400">{p.location}</div>

            {/* 스샷 하단 “채팅/관심” 라인 느낌 */}
            <div className="mt-2 text-[13px] text-gray-400">
              채팅 {p.stats.chat} · 관심 {p.stats.interest}
            </div>
          </article>
        </Link>
      ))}
    </div>
  );
}

function ReviewsPlaceholder() {
  return (
    <div className="py-12 text-[15px] text-gray-500">
      거래 후기 영역은 fixture가 필요해요. (원하면 reviews fixture도 만들어줄게)
    </div>
  );
}
