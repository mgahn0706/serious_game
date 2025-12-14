// src/features/instagram/components/StoryViewerModal.tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  X,
  MoreHorizontal,
  Send,
  Heart,
  Plus,
} from "lucide-react";
import type { Story, StoryItem } from "../types/types";
import { allAccounts } from "../fixtures/account";
import { NavLink } from "react-router-dom";

function clamp(n: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, n));
}

/**
 * StoryItem list normalization:
 * - items 있으면 items 사용
 * - storyImages/storyImage 있으면 그걸로 image item 생성
 * - 마지막 fallback은 avatar(계정 이미지)로 처리하도록, 외부에서 avatarFallback을 주입
 */
function normalizeStoryItems(
  story: Story,
  avatarFallback: string
): StoryItem[] {
  if (story.items && story.items.length > 0) return story.items;

  if (story.storyImages && story.storyImages.length > 0) {
    return story.storyImages.map((src, idx) => ({
      id: `${story.id}-img-${idx}`,
      type: "image",
      src,
      durationMs: 5000,
    }));
  }

  if (story.storyImage) {
    return [
      {
        id: `${story.id}-img-0`,
        type: "image",
        src: story.storyImage,
        durationMs: 5000,
      },
    ];
  }

  // ✅ never break: show avatar as story content
  return [
    {
      id: `${story.id}-fallback`,
      type: "image",
      src: avatarFallback || "/placeholder.jpg",
      durationMs: 5000,
    },
  ];
}

export default function StoryViewerModal({
  stories,
  initialStoryId,
  onClose,
}: {
  stories: Story[];
  initialStoryId: string;
  onClose: () => void;
}) {
  // ✅ userId -> account lookup map (Story.userId === account.id 기준)
  const accountById = useMemo(() => {
    const m = new Map<string, (typeof allAccounts)[number]>();
    for (const acc of allAccounts) {
      m.set(String(acc.id), acc);
    }
    return m;
  }, []);

  const getAccountByUserId = (userId?: string) => {
    if (!userId) return undefined;
    return accountById.get(String(userId));
  };

  const getAvatarByUserId = (userId?: string) => {
    return getAccountByUserId(userId)?.image || "/placeholder.jpg";
  };

  const getDisplayNameByUserId = (userId?: string) => {
    const acc = getAccountByUserId(userId);
    // 인스타처럼 위에는 보통 id(핸들)가 뜸. 없으면 username 등 fallback
    return acc?.id || acc?.username || String(userId ?? "");
  };

  const storyIndex0 = useMemo(() => {
    const idx = stories.findIndex(
      (s) => String(s.id) === String(initialStoryId)
    );
    return idx >= 0 ? idx : 0;
  }, [stories, initialStoryId]);

  const [storyIdx, setStoryIdx] = useState(storyIndex0);
  const [itemIdx, setItemIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  // 0..1 progress for current item
  const [progress, setProgress] = useState(0);

  const rafRef = useRef<number | null>(null);
  const lastTsRef = useRef<number | null>(null);

  const safeStoryIdx = clamp(storyIdx, 0, Math.max(0, stories.length - 1));
  const currentStory = stories[safeStoryIdx];

  const currentAvatar = useMemo(
    () => getAvatarByUserId(currentStory?.userId),
    [currentStory?.userId, accountById]
  );

  const currentItems = useMemo(
    () => normalizeStoryItems(currentStory, currentAvatar),
    [currentStory, currentAvatar]
  );

  const safeItemIdx = clamp(itemIdx, 0, Math.max(0, currentItems.length - 1));
  const currentItem = currentItems[safeItemIdx];
  const durationMs = currentItem?.durationMs ?? 5000;

  // side previews
  const prevStory = safeStoryIdx > 0 ? stories[safeStoryIdx - 1] : null;
  const nextStory =
    safeStoryIdx < stories.length - 1 ? stories[safeStoryIdx + 1] : null;

  const goPrev = () => {
    if (itemIdx > 0) {
      setItemIdx((x) => x - 1);
      setProgress(0);
      return;
    }
    if (safeStoryIdx > 0) {
      const newStoryIdx = safeStoryIdx - 1;
      const avatar = getAvatarByUserId(stories[newStoryIdx]?.userId);
      const items = normalizeStoryItems(stories[newStoryIdx], avatar);
      setStoryIdx(newStoryIdx);
      setItemIdx(Math.max(0, items.length - 1));
      setProgress(0);
      return;
    }
    setProgress(0);
  };

  const goNext = () => {
    if (itemIdx < currentItems.length - 1) {
      setItemIdx((x) => x + 1);
      setProgress(0);
      return;
    }
    if (safeStoryIdx < stories.length - 1) {
      setStoryIdx((x) => x + 1);
      setItemIdx(0);
      setProgress(0);
      return;
    }
    onClose();
  };

  // ESC + arrow key nav
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
      if (e.key === " ") setPaused((p) => !p);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [safeStoryIdx, itemIdx, currentItems.length, onClose]);

  // reset when story changes
  useEffect(() => {
    setItemIdx(0);
    setProgress(0);
  }, [safeStoryIdx]);

  // progress player
  useEffect(() => {
    if (paused) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      lastTsRef.current = null;
      return;
    }

    const tick = (ts: number) => {
      if (lastTsRef.current == null) lastTsRef.current = ts;
      const dt = ts - lastTsRef.current;
      lastTsRef.current = ts;

      setProgress((p) => p + dt / durationMs);
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      lastTsRef.current = null;
    };
  }, [paused, durationMs]);

  // auto-advance
  useEffect(() => {
    if (progress >= 1) {
      setProgress(0);
      goNext();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progress]);

  const timeAgo = currentStory?.timeAgo ?? "6시간";
  const currentDisplayName = getDisplayNameByUserId(currentStory?.userId);

  // ✅ preview helper: story의 첫 item 또는 avatar 보여주기
  const previewSrc = (s: Story) => {
    const avatar = getAvatarByUserId(s.userId);
    const items = normalizeStoryItems(s, avatar);
    return items[0]?.src || avatar || "/placeholder.jpg";
  };

  const previewName = (s: Story) => getDisplayNameByUserId(s.userId);

  return (
    <div className="fixed inset-0 z-[999] bg-black/90 flex items-center justify-center">
      {/* close on background click */}
      <button
        type="button"
        aria-label="Close story viewer background"
        className="absolute inset-0 cursor-default"
        onClick={onClose}
      />

      <div className="relative z-[1000] w-full max-w-[1200px] px-6 flex items-center justify-center gap-8">
        {/* LEFT preview */}
        <div className="hidden md:flex items-center justify-center w-[220px]">
          {prevStory ? (
            <div className="relative w-[180px] h-[320px] rounded-2xl overflow-hidden bg-white/5 border border-white/10">
              <img
                src={previewSrc(prevStory)}
                alt={`${previewName(prevStory)} preview`}
                className="w-full h-full object-cover opacity-70"
              />
              <div className="absolute inset-0 bg-black/30" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white/80 text-sm font-medium">
                  {previewName(prevStory)}
                </span>
              </div>
            </div>
          ) : (
            <div className="w-[180px] h-[320px]" />
          )}
        </div>

        {/* CENTER story panel */}
        <div className="relative w-[380px] h-[680px] max-w-[92vw] max-h-[86vh] rounded-[18px] overflow-hidden bg-black border border-white/15 shadow-2xl">
          {/* Top progress bars */}
          <div className="absolute top-0 left-0 right-0 p-3 pt-3 z-20">
            <div className="flex gap-1.5">
              {currentItems.map((_, i) => {
                const filled =
                  i < safeItemIdx
                    ? 1
                    : i === safeItemIdx
                    ? clamp(progress, 0, 1)
                    : 0;
                return (
                  <div
                    key={i}
                    className="h-[2px] flex-1 bg-white/30 rounded-full overflow-hidden"
                  >
                    <div
                      className="h-full bg-white rounded-full"
                      style={{ width: `${filled * 100}%` }}
                    />
                  </div>
                );
              })}
            </div>

            {/* Header */}
            <div className="mt-3 flex items-center justify-between">
              <NavLink to={`/instagram/profile/${currentStory?.userId}`}>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-white/10">
                    <img
                      src={currentAvatar}
                      alt={currentDisplayName}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-white text-sm font-semibold">
                      {currentDisplayName}
                    </span>
                    <span className="text-white/70 text-xs">{timeAgo}</span>
                  </div>
                </div>
              </NavLink>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setPaused((p) => !p)}
                  className="p-2 rounded-full hover:bg-white/10 text-white"
                  aria-label={paused ? "Play" : "Pause"}
                >
                  {paused ? (
                    <Play className="w-4 h-4" />
                  ) : (
                    <Pause className="w-4 h-4" />
                  )}
                </button>
                <button
                  type="button"
                  className="p-2 rounded-full hover:bg-white/10 text-white"
                  aria-label="More"
                >
                  <MoreHorizontal className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-white/10 text-white"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Story media */}
          <div className="absolute inset-0">
            <img
              src={currentItem?.src || "/placeholder.jpg"}
              alt="Story"
              className="w-full h-full object-cover"
              draggable={false}
            />
            <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/50 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-52 bg-gradient-to-t from-black/55 to-transparent" />
          </div>

          {/* Click zones (prev/next) */}
          <div className="absolute inset-0 z-10 flex">
            <button
              type="button"
              className="w-1/2 h-full"
              aria-label="Previous"
              onClick={goPrev}
            />
            <button
              type="button"
              className="w-1/2 h-full"
              aria-label="Next"
              onClick={goNext}
            />
          </div>

          {/* Bottom reply UI */}
          <div className="absolute left-0 right-0 bottom-0 z-20 p-3">
            <div className="flex items-center gap-2">
              <div className="flex-1">
                <div className="h-11 rounded-full border border-white/30 bg-black/20 px-4 flex items-center">
                  <span className="text-white/70 text-sm">답글...</span>
                </div>
              </div>

              <button
                type="button"
                className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/15 flex items-center justify-center text-white"
                aria-label="Create"
              >
                <Plus className="w-5 h-5" />
              </button>
              <button
                type="button"
                className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/15 flex items-center justify-center text-white"
                aria-label="Like"
              >
                <Heart className="w-5 h-5" />
              </button>
              <button
                type="button"
                className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/15 flex items-center justify-center text-white"
                aria-label="Send"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Left/Right chevrons on the panel */}
          {safeStoryIdx > 0 && (
            <button
              type="button"
              onClick={goPrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-30 w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center text-white"
              aria-label="Previous story"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}
          {safeStoryIdx < stories.length - 1 && (
            <button
              type="button"
              onClick={goNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-30 w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center text-white"
              aria-label="Next story"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* RIGHT preview */}
        <div className="hidden md:flex items-center justify-center w-[220px]">
          {nextStory ? (
            <div className="relative w-[180px] h-[320px] rounded-2xl overflow-hidden bg-white/5 border border-white/10">
              <img
                src={previewSrc(nextStory)}
                alt={`${previewName(nextStory)} preview`}
                className="w-full h-full object-cover opacity-70"
              />
              <div className="absolute inset-0 bg-black/30" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white/80 text-sm font-medium">
                  {previewName(nextStory)}
                </span>
              </div>
            </div>
          ) : (
            <div className="w-[180px] h-[320px]" />
          )}
        </div>
      </div>
    </div>
  );
}
