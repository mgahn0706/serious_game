import { useMemo, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Smile, Ban, X } from "lucide-react";

import { products } from "@/features/danggeun/fixtures/products";
import { accounts } from "@/features/danggeun/fixtures/accounts";
import type { Product } from "@/features/danggeun/types/types";
import DanggeunHeader from "@/features/danggeun/components/DanggeunHeader";

type TabKey = "items" | "reviews";

export default function DanggeunAccountPage() {
  const { id } = useParams<{ id: string }>();
  const accountId = Number(id);

  const account = accounts.find((a) => a.id === accountId);

  const myProducts = useMemo(
    () => products.filter((p) => p.sellerId === accountId),
    [accountId]
  );

  const [tab, setTab] = useState<TabKey>("items");

  /** ===============================
   *  🚨 제재/구속 수사 설정 (추리게임용)
   *  =============================== */
  const isRestricted = account?.isRestricted || false;
  const NOTICE_DATE = "2025년 12월 10일";

  const [modalOpen, setModalOpen] = useState(false);
  useEffect(() => {
    if (isRestricted) setModalOpen(true);
  }, [isRestricted]);

  if (!account) {
    return (
      <div className="min-h-screen bg-white">
        <main className="mx-auto max-w-6xl px-6 py-20 text-gray-700">
          계정을 찾을 수 없어요.
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <DanggeunHeader />

      {/* ================= 상단 경고 배너 ================= */}
      {isRestricted && (
        <div className="border-b border-red-200 bg-red-50">
          <div className="mx-auto flex max-w-6xl items-center gap-3 px-6 py-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-red-100">
              <Ban className="h-5 w-5 text-red-600" />
            </div>
            <div className="flex-1">
              <div className="text-[14px] font-bold text-red-700">
                경찰 수사로 인해 이용이 제한된 계정입니다
              </div>
              <div className="text-[13px] text-red-600">
                {NOTICE_DATE} 기준 구속 수사 진행 중
              </div>
            </div>
            <button
              onClick={() => setModalOpen(true)}
              className="rounded-lg bg-red-600 px-3 py-1.5 text-[13px] font-semibold text-white"
            >
              상세 안내
            </button>
          </div>
        </div>
      )}

      <main className="mx-auto max-w-6xl px-6 pt-16">
        <div className="relative">
          {/* ================= 블러 처리된 본문 ================= */}
          <div
            className={
              isRestricted
                ? "pointer-events-none select-none blur-[2px] opacity-60"
                : ""
            }
          >
            {/* ===== Profile ===== */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-6">
                <Avatar src={account.avatarUrl} />

                <div>
                  <div className="text-[26px] font-bold text-gray-900">
                    {account.username}
                  </div>
                  <div className="mt-1 text-[16px] text-gray-500">
                    {account.location}
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-end">
                <div className="flex items-center gap-2">
                  <span className="text-[22px] font-bold text-sky-500">
                    {account.temperature.toFixed(1)}°C
                  </span>
                  <Smile className="h-6 w-6 text-amber-400" />
                </div>

                <div className="mt-2 w-28">
                  <div className="h-1.5 w-full rounded-full bg-gray-200">
                    <div
                      className="h-full rounded-full bg-sky-500"
                      style={{
                        width: `${Math.min(
                          100,
                          (account.temperature / 50) * 100
                        )}%`,
                      }}
                    />
                  </div>
                </div>

                <div className="mt-2 text-[14px] text-gray-400">매너온도</div>
              </div>
            </div>

            {/* ===== Tabs ===== */}
            <div className="mt-14 border-b border-gray-200">
              <div className="flex gap-10">
                <button
                  onClick={() => setTab("items")}
                  className={`relative pb-4 text-[18px] font-semibold ${
                    tab === "items" ? "text-gray-900" : "text-gray-400"
                  }`}
                >
                  판매 물품 ({myProducts.length})
                  {tab === "items" && (
                    <span className="absolute bottom-0 left-0 h-[2px] w-full bg-gray-900" />
                  )}
                </button>

                <button
                  onClick={() => setTab("reviews")}
                  className={`relative pb-4 text-[18px] font-semibold ${
                    tab === "reviews" ? "text-gray-900" : "text-gray-400"
                  }`}
                >
                  거래 후기 (3)
                  {tab === "reviews" && (
                    <span className="absolute bottom-0 left-0 h-[2px] w-full bg-gray-900" />
                  )}
                </button>
              </div>
            </div>

            {/* ===== Content ===== */}
            <div className="py-10">
              {tab === "items" ? (
                <ProductsGrid products={myProducts} />
              ) : (
                <div className="text-gray-500">
                  거래 후기는 표시할 수 없어요.
                </div>
              )}
            </div>
          </div>

          {/* ================= 블러 위 경고 카드 ================= */}
          {isRestricted && (
            <div className="absolute inset-0 flex items-start justify-center pt-10">
              <div className="max-w-xl rounded-2xl border border-red-200 bg-white p-6 shadow-xl">
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-50">
                    <Ban className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <div className="text-[16px] font-bold text-gray-900">
                      구속 수사로 인해 계정 접근이 제한되었습니다
                    </div>
                    <div className="mt-1 text-[14px] text-gray-600">
                      {NOTICE_DATE} 기준 경찰 수사 진행 중
                    </div>
                    <button
                      onClick={() => setModalOpen(true)}
                      className="mt-3 rounded-lg bg-red-600 px-4 py-2 text-[13px] font-semibold text-white"
                    >
                      자세히 보기
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* ================= 강제 모달 ================= */}
      {modalOpen && isRestricted && (
        <RestrictedModal
          noticeDate={NOTICE_DATE}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
}

/* ================= UI COMPONENTS ================= */

function Avatar({ src }: { src?: string }) {
  return src ? (
    <img
      src={src}
      className="h-24 w-24 rounded-full object-cover"
      alt="avatar"
    />
  ) : (
    <div className="h-24 w-24 rounded-full bg-gray-200" />
  );
}

function ProductsGrid({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return <div className="text-gray-500">판매 중인 물품이 없어요.</div>;
  }

  return (
    <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
      {products.map((p) => (
        <Link key={p.id} to={`/danggeun/products/${p.id}`}>
          <div>
            <div className="mb-2 overflow-hidden rounded-xl border">
              <div className="aspect-[4/3]">
                <img
                  src={p.imageUrl}
                  className="h-full w-full object-cover"
                  alt={p.title}
                />
              </div>
            </div>
            <div className="font-medium">{p.title}</div>
            <div className="font-bold">{p.price.toLocaleString()}원</div>
          </div>
        </Link>
      ))}
    </div>
  );
}

function RestrictedModal({
  noticeDate,
  onClose,
}: {
  noticeDate: string;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6">
        <div className="flex justify-between">
          <div className="text-[18px] font-bold text-gray-900">
            경찰 구속 수사 안내
          </div>
          <button onClick={onClose}>
            <X />
          </button>
        </div>

        <div className="mt-4 text-[15px] leading-7 text-gray-700">
          해당 계정은 <b>{noticeDate}</b> 기준 경찰에 의해
          <b> 구속 수사 중</b>인 상태로 확인되었습니다.
          <br />
          <br />
          이에 따라 당근 플랫폼 내 활동이 전면 또는 부분적으로 제한되며, 안전한
          거래를 위해 접근 시 각별한 주의가 필요합니다.
        </div>

        <div className="mt-6 text-right">
          <button
            onClick={onClose}
            className="rounded-lg bg-red-600 px-4 py-2 font-semibold text-white"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}
