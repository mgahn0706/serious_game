import { useMemo, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Smile, Ban, X, MessageCircle } from "lucide-react";

import { products } from "@/features/danggeun/fixtures/products";
import { accounts } from "@/features/danggeun/fixtures/accounts";
import { getDanggeunResolvedChatByAccountId } from "@/features/danggeun/fixtures/chat";

import type { Product, Account } from "@/features/danggeun/types/types";
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
   *  🚨 제재 설정 (추리게임용)
   *  =============================== */
  const isRestricted = account?.isRestricted || false;
  const NOTICE_DATE = "2025년 12월 10일";

  const [modalOpen, setModalOpen] = useState(false);
  useEffect(() => {
    if (isRestricted) setModalOpen(true);
  }, [isRestricted]);

  /** ===============================
   *  💬 채팅 상태
   *  =============================== */
  const [chatOpen, setChatOpen] = useState(false);

  // ✅ thread는 fixture에서, partner 정보는 accounts에서 resolve
  const resolvedChat = useMemo(() => {
    if (!account) return null;
    return getDanggeunResolvedChatByAccountId(account.id, accounts);
  }, [account]);

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
              className="cursor-pointer rounded-lg bg-red-600 px-3 py-1.5 text-[13px] font-semibold text-white transition hover:brightness-95 active:brightness-90"
            >
              상세 안내
            </button>
          </div>
        </div>
      )}

      <main className="mx-auto max-w-6xl px-6 pt-16">
        <div className="relative">
          {/* ✅ blur만, 클릭 막지 않음 */}
          <div
            className={isRestricted ? "select-none blur-[2px] opacity-60" : ""}
          >
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

            <div className="mt-14 border-b border-gray-200">
              <div className="flex gap-10">
                <button
                  onClick={() => setTab("items")}
                  className={[
                    "relative pb-4 text-[18px] font-semibold transition",
                    "cursor-pointer hover:text-gray-900",
                    tab === "items" ? "text-gray-900" : "text-gray-400",
                  ].join(" ")}
                >
                  판매 물품 ({myProducts.length})
                  {tab === "items" && (
                    <span className="absolute bottom-0 left-0 h-[2px] w-full bg-gray-900" />
                  )}
                </button>

                <button
                  onClick={() => setTab("reviews")}
                  className={[
                    "relative pb-4 text-[18px] font-semibold transition",
                    "cursor-pointer hover:text-gray-900",
                    tab === "reviews" ? "text-gray-900" : "text-gray-400",
                  ].join(" ")}
                >
                  거래 후기 (3)
                  {tab === "reviews" && (
                    <span className="absolute bottom-0 left-0 h-[2px] w-full bg-gray-900" />
                  )}
                </button>
              </div>
            </div>

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

          {isRestricted && (
            <div className="absolute inset-0 flex items-start justify-center pt-10 pointer-events-none">
              <div className="pointer-events-auto max-w-xl rounded-2xl border border-red-200 bg-white p-6 shadow-xl">
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
                      className="mt-3 cursor-pointer rounded-lg bg-red-600 px-4 py-2 text-[13px] font-semibold text-white transition hover:brightness-95 active:brightness-90"
                    >
                      자세히 보기
                    </button>
                    <div className="mt-2 text-[12px] text-gray-500">
                      (채팅 열람은 가능하지만, 메시지 전송은 제한됩니다)
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* ✅ 채팅 버튼은 항상 클릭 가능 */}
      <button
        onClick={() => setChatOpen(true)}
        className="fixed bottom-6 right-6 z-[2000] inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#ff6f0f] text-white shadow-[0_18px_50px_rgba(0,0,0,0.25)] transition hover:brightness-95 active:brightness-90 cursor-pointer"
        aria-label="message"
      >
        <MessageCircle className="h-7 w-7" />
      </button>

      {/* ✅ 채팅: 있으면 채팅, 없으면 "채팅 없음" 모달 */}
      {chatOpen &&
        (resolvedChat ? (
          <DanggeunChatModalReadOnly
            onClose={() => setChatOpen(false)}
            partner={resolvedChat.partner}
            temperatureText={resolvedChat.temperatureText}
            responseHint={resolvedChat.thread.responseHint}
            dateLabel={resolvedChat.thread.dateLabel}
            messages={resolvedChat.thread.messages}
            isRestricted={isRestricted}
          />
        ) : (
          <DanggeunChatModalEmpty
            onClose={() => setChatOpen(false)}
            partner={account}
            temperatureText={`${account.temperature.toFixed(1)}°C`}
            isRestricted={isRestricted}
          />
        ))}

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
    <img src={src} className="h-24 w-24 rounded-full object-cover" />
  ) : (
    <div className="h-24 w-24 rounded-full bg-gray-200" />
  );
}

function ProductsGrid({ products }: { products: Product[] }) {
  if (products.length === 0)
    return <div className="text-gray-500">판매 중인 물품이 없어요.</div>;

  return (
    <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
      {products.map((p) => (
        <Link key={p.id} to={`/danggeun/products/${p.id}`}>
          <div className="cursor-pointer">
            <div className="mb-2 overflow-hidden rounded-xl border transition hover:shadow-md">
              <div className="aspect-[4/3]">
                <img src={p.imageUrl} className="h-full w-full object-cover" />
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

/* ================= CHAT MODAL (READ ONLY) ================= */

function DanggeunChatModalReadOnly({
  onClose,
  partner,
  temperatureText,
  responseHint,
  dateLabel,
  messages,
  isRestricted,
}: {
  onClose: () => void;
  partner: Account;
  temperatureText: string;
  responseHint?: string;
  dateLabel?: string;
  messages: { id: string; from: "me" | "them"; text: string; time: string }[];
  isRestricted: boolean;
}) {
  return (
    <div className="fixed inset-0 z-[3000] flex items-center justify-center bg-black/40 p-6">
      <div className="relative w-full max-w-[1100px] overflow-hidden rounded-[28px] bg-white shadow-[0_24px_80px_rgba(0,0,0,0.25)]">
        <div className="flex items-center justify-between px-8 py-5">
          <div className="flex items-center gap-4">
            <img
              src={partner.avatarUrl}
              className="h-10 w-10 rounded-full object-cover"
              alt="avatar"
            />
            <div>
              <div className="flex items-center gap-2">
                <div className="text-[18px] font-bold text-[#111]">
                  {partner.username}
                </div>
                <div className="rounded-full border border-[#d9d9d9] bg-white px-2 py-0.5 text-[12px] font-semibold text-[#444]">
                  {temperatureText}
                </div>
              </div>
              {responseHint && (
                <div className="text-[13px] text-[#9a9a9a]">{responseHint}</div>
              )}
            </div>
          </div>

          <button
            onClick={onClose}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full transition hover:bg-black/5 active:bg-black/10 cursor-pointer"
            aria-label="close"
          >
            <X className="h-5 w-5 text-[#333]" />
          </button>
        </div>

        <div className="h-px bg-[#efefef]" />

        <div className="relative h-[680px] bg-white">
          <div className="h-full overflow-y-auto px-12 py-8">
            {dateLabel && (
              <div className="mb-10 flex justify-center">
                <div className="rounded-full border border-[#e6e6e6] bg-white px-4 py-2 text-[13px] text-[#7a7a7a] shadow-sm">
                  {dateLabel}
                </div>
              </div>
            )}

            <div className="space-y-5 pb-10">
              {messages.map((m) => {
                const isMe = m.from === "me";
                return (
                  <div
                    key={m.id}
                    className={`flex items-end gap-3 ${
                      isMe ? "justify-end" : "justify-start"
                    }`}
                  >
                    {!isMe && (
                      <img
                        src={partner.avatarUrl}
                        alt="avatar"
                        className="h-9 w-9 rounded-full object-cover"
                      />
                    )}

                    <div
                      className={`max-w-[520px] ${isMe ? "text-right" : ""}`}
                    >
                      <div
                        className={[
                          "inline-block rounded-[18px] px-5 py-3 text-[15px] leading-6 shadow-sm",
                          isMe
                            ? "bg-[#ff6f0f] text-white"
                            : "bg-[#f2f3f5] text-[#222]",
                        ].join(" ")}
                        style={{ whiteSpace: "pre-wrap" }}
                      >
                        {m.text}
                      </div>

                      <div
                        className={`mt-1 text-[12px] text-[#b0b0b0] ${
                          isMe ? "pr-1" : "pl-1"
                        }`}
                      >
                        {m.time}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {isRestricted && (
            <div className="absolute bottom-0 left-0 right-0 bg-white px-10 pb-8 pt-5">
              <div className="rounded-[14px] border border-[#f1c7c7] bg-[#fff7f7] px-5 py-4 text-[14px] text-[#a13b3b]">
                경찰 수사로 인해 <b>메시지 전송 기능이 제한</b>되었습니다.
                (열람만 가능)
              </div>
            </div>
          )}
        </div>

        <div className="pointer-events-none absolute inset-0 rounded-[28px] ring-1 ring-black/5" />
      </div>
    </div>
  );
}

/* ================= CHAT MODAL (EMPTY) ================= */

function DanggeunChatModalEmpty({
  onClose,
  partner,
  temperatureText,
  isRestricted,
}: {
  onClose: () => void;
  partner: Account;
  temperatureText: string;
  isRestricted: boolean;
}) {
  return (
    <div className="fixed inset-0 z-[3000] flex items-center justify-center bg-black/40 p-6">
      <div className="relative w-full max-w-[1100px] overflow-hidden rounded-[28px] bg-white shadow-[0_24px_80px_rgba(0,0,0,0.25)]">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-5">
          <div className="flex items-center gap-4">
            <img
              src={partner.avatarUrl}
              className="h-10 w-10 rounded-full object-cover"
              alt="avatar"
            />
            <div>
              <div className="flex items-center gap-2">
                <div className="text-[18px] font-bold text-[#111]">
                  {partner.username}
                </div>
                <div className="rounded-full border border-[#d9d9d9] bg-white px-2 py-0.5 text-[12px] font-semibold text-[#444]">
                  {temperatureText}
                </div>
              </div>
              <div className="text-[13px] text-[#9a9a9a]">
                채팅 내역이 없어요
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full transition hover:bg-black/5 active:bg-black/10 cursor-pointer"
            aria-label="close"
          >
            <X className="h-5 w-5 text-[#333]" />
          </button>
        </div>

        <div className="h-px bg-[#efefef]" />

        {/* Body */}
        <div className="relative h-[680px] bg-white">
          <div className="h-full px-12 py-12 flex items-center justify-center">
            <div className="max-w-md text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#fff1e8]">
                <MessageCircle className="h-7 w-7 text-[#ff6f0f]" />
              </div>
              <div className="text-[18px] font-bold text-[#111]">
                아직 대화가 없어요
              </div>
              <div className="mt-2 text-[14px] leading-6 text-[#6b6b6b]">
                이 판매자와 진행한 채팅이 없습니다.
              </div>

              {isRestricted && (
                <div className="mt-6 rounded-[14px] border border-[#f1c7c7] bg-[#fff7f7] px-5 py-4 text-[14px] text-[#a13b3b] text-left">
                  경찰 수사로 인해 <b>메시지 전송 기능이 제한</b>되었습니다.
                  (열람만 가능)
                </div>
              )}

              <div className="mt-6 flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-xl border border-[#e6e6e6] bg-white px-5 py-2.5 text-[14px] font-semibold text-[#333] hover:bg-black/[0.03]"
                >
                  닫기
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-0 rounded-[28px] ring-1 ring-black/5" />
      </div>
    </div>
  );
}

/* ================= MODAL ================= */

function RestrictedModal({
  noticeDate,
  onClose,
}: {
  noticeDate: string;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[2500] flex items-center justify-center bg-black/50">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6">
        <div className="flex justify-between">
          <div className="text-[18px] font-bold text-gray-900">
            경찰 구속 수사 안내
          </div>
          <button
            onClick={onClose}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full transition hover:bg-black/5 active:bg-black/10 cursor-pointer"
          >
            <X />
          </button>
        </div>

        <div className="mt-4 text-[15px] leading-7 text-gray-700">
          해당 계정은 <b>{noticeDate}</b> 기준 경찰에 의해 <b>구속 수사 중</b>인
          상태로 확인되었습니다.
          <br />
          <br />
          이에 따라 당근 플랫폼 내 활동이 전면 또는 부분적으로 제한되며, 안전한
          거래를 위해 접근 시 각별한 주의가 필요합니다.
        </div>

        <div className="mt-6 text-right">
          <button
            onClick={onClose}
            className="cursor-pointer rounded-lg bg-red-600 px-4 py-2 font-semibold text-white transition hover:brightness-95 active:brightness-90"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}
