import { ChevronRight, Smile } from "lucide-react";
import { Link, useParams } from "react-router-dom";

import { products } from "@/features/danggeun/fixtures/products";
import { accounts } from "@/features/danggeun/fixtures/accounts";

export default function DanggeunDetailPage() {
  const { id } = useParams<{ id: string }>();

  const product = products.find((p) => p.id === Number(id));
  const seller = accounts.find((a) => a.id === product?.sellerId);

  if (!product || !seller) {
    return (
      <main className="mx-auto max-w-6xl px-6 py-10">
        <div className="text-[16px] text-gray-700">상품을 찾을 수 없어요.</div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-6">
      {/* Breadcrumb (clickable -> home) */}

      <div className="mb-4 flex items-center gap-1 text-[12px] text-gray-500">
        <Link to="/danggeun" className="hover:text-gray-700">
          홈
        </Link>
        <ChevronRight className="h-3 w-3" />
        <Link to="/danggeun" className="hover:text-gray-700">
          중고거래
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-gray-700">{product.title}</span>
      </div>

      <div className="flex gap-10">
        {/* LEFT – Image + seller (more like screenshot) */}
        <div className="w-[430px]">
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
            <div className="relative">
              <img
                src={product.imageUrl}
                alt={product.title}
                className="w-full object-cover"
              />

              {/* carousel dots (visual only, for accuracy) */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    className={`h-1.5 w-1.5 rounded-full ${
                      i === 0 ? "bg-white" : "bg-white/40"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Seller row under image (as in screenshot) */}
          <div className="mt-5 flex items-center justify-between">
            <Link
              to={`/danggeun/account/${seller.id}`}
              className="flex items-center gap-3"
            >
              <img
                src={seller.avatarUrl}
                alt={seller.username}
                className="h-12 w-12 rounded-full object-cover"
              />
              <div>
                <div className="text-[16px] font-semibold text-gray-900">
                  {seller.username}
                </div>
                <div className="mt-0.5 text-[13px] text-gray-500">
                  {seller.location}
                </div>
              </div>
            </Link>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 text-[16px] font-semibold text-emerald-600">
                <span>{seller.temperature.toFixed(1)}°C</span>
                <Smile className="h-5 w-5 text-amber-400" />
              </div>
              <div className="text-[13px] text-gray-500">매너온도</div>
            </div>
          </div>
        </div>

        {/* RIGHT – Info + CTA (remove heart/share for accuracy) */}
        <div className="flex-1">
          <h1 className="text-[28px] font-bold text-gray-900">
            {product.title}
          </h1>

          <div className="mt-2 text-[13px] text-gray-500">
            {product.category} · {product.time}
          </div>

          <div className="mt-4 text-[30px] font-bold text-gray-900">
            {product.price.toLocaleString()}원
          </div>

          <div className="mt-8 whitespace-pre-line text-[15px] leading-7 text-gray-800">
            {product.description}
          </div>

          {/* stats right above CTA (as in screenshot) */}
          <div className="mt-10 text-[13px] text-gray-400">
            채팅 {product.stats.chat} · 관심 {product.stats.interest} · 조회{" "}
            {product.stats.view}
          </div>

          <button className="mt-4 h-12 w-full rounded-lg bg-carrot text-[15px] font-semibold text-white">
            당근 앱에서 보기
          </button>
        </div>
      </div>
    </main>
  );
}
