"use client";

import React, { useEffect, useMemo, useState } from "react";
import Sidebar from "../../features/instagram/components/Sidebar";
import { posts } from "@/features/instagram/fixtures/posts";
import {
  MessageCircle,
  SquareStack,
  X,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
} from "lucide-react";

type Post = (typeof posts)[number];

export default function Explore() {
  // ✅ algorithmOrder 정렬 (null은 뒤로)
  const sortedPosts = useMemo(() => {
    return [...posts].sort((a, b) => {
      if (a.algorithmOrder == null && b.algorithmOrder == null) return 0;
      if (a.algorithmOrder == null) return 1;
      if (b.algorithmOrder == null) return -1;
      return a.algorithmOrder - b.algorithmOrder;
    });
  }, []);

  const [openPost, setOpenPost] = useState<Post | null>(null);
  const [activeImageIdx, setActiveImageIdx] = useState<number>(0);

  const close = () => {
    setOpenPost(null);
    setActiveImageIdx(0);
  };

  const open = (p: Post) => {
    setOpenPost(p);
    setActiveImageIdx(0);
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Left Sidebar */}
      <Sidebar />

      {/* Explore Grid */}
      <div className="flex-1 flex overflow-hidden ml-64">
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-5xl mx-auto w-full px-4 py-6">
            <div className="grid grid-cols-3 md:grid-cols-4 gap-[2px] md:gap-2">
              {sortedPosts.map((post) => {
                const thumbnail =
                  post.postImages && post.postImages.length > 0
                    ? post.postImages[0]
                    : "/placeholder.jpg";
                const commentCount = post.comments?.length ?? 0;
                const isMulti = (post.postImages?.length ?? 0) > 1;

                return (
                  <button
                    key={post.id}
                    type="button"
                    onClick={() => open(post)}
                    className="relative aspect-square overflow-hidden group focus:outline-none"
                  >
                    {/* Thumbnail */}
                    <img
                      src={thumbnail}
                      alt={post.caption}
                      className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                    />

                    {/* Multi-image icon (top-right) */}
                    {isMulti && (
                      <div className="absolute top-2 right-2 z-10">
                        <SquareStack className="w-5 h-5 text-white drop-shadow" />
                      </div>
                    )}

                    {/* Hover overlay + comment count */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="flex items-center gap-2 text-white font-semibold text-lg">
                        <MessageCircle className="w-5 h-5 text-white fill-white" />
                        <span>{commentCount}</span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Post Modal (IG-style). Ignore comments */}
      {openPost && (
        <PostModal
          post={openPost}
          activeImageIdx={activeImageIdx}
          setActiveImageIdx={setActiveImageIdx}
          onClose={close}
        />
      )}
    </div>
  );
}

function PostModal({
  post,
  activeImageIdx,
  setActiveImageIdx,
  onClose,
}: {
  post: Post;
  activeImageIdx: number;
  // ✅ FIX: allow both number and updater function
  setActiveImageIdx: React.Dispatch<React.SetStateAction<number>>;
  onClose: () => void;
}) {
  const images = post.postImages ?? [];
  const hasMulti = images.length > 1;

  const prev = () => {
    if (!hasMulti) return;
    setActiveImageIdx((i) => (i - 1 + images.length) % images.length);
  };
  const next = () => {
    if (!hasMulti) return;
    setActiveImageIdx((i) => (i + 1) % images.length);
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images.length]);

  const src = images[activeImageIdx] ?? "/placeholder.jpg";

  return (
    <div
      className="fixed inset-0 z-[999] bg-black/70 flex items-center justify-center p-3 md:p-6"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Close (top-right) */}
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 md:top-6 md:right-6 text-white/90 hover:text-white"
        aria-label="Close"
      >
        <X className="w-7 h-7" />
      </button>

      {/* Modal body */}
      <div className="w-full max-w-[1080px] h-[80vh] md:h-[86vh] bg-background rounded-md overflow-hidden shadow-xl flex">
        {/* Left: Media */}
        <div className="relative flex-1 bg-black flex items-center justify-center">
          <img
            src={src}
            alt={post.caption}
            className="max-h-full max-w-full object-contain select-none"
            draggable={false}
          />

          {/* arrows */}
          {hasMulti && (
            <>
              <button
                type="button"
                onClick={prev}
                className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 w-9 h-9 md:w-10 md:h-10 rounded-full bg-black/45 hover:bg-black/60 flex items-center justify-center text-white"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                type="button"
                onClick={next}
                className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 w-9 h-9 md:w-10 md:h-10 rounded-full bg-black/45 hover:bg-black/60 flex items-center justify-center text-white"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* dots */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                {images.map((_, i) => (
                  <span
                    key={i}
                    className={`h-1.5 w-1.5 rounded-full ${
                      i === activeImageIdx ? "bg-white" : "bg-white/40"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Right: Info (Ignore comments) */}
        <div className="w-[360px] hidden md:flex flex-col border-l border-border">
          {/* header */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
            <img
              src={post.authorImage}
              alt={post.author}
              className="w-8 h-8 rounded-full object-cover bg-muted"
            />
            <div className="min-w-0">
              <div className="text-sm font-semibold truncate">
                {post.author}
              </div>
            </div>
            <button
              type="button"
              className="ml-auto text-muted-foreground hover:text-foreground"
            >
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>

          {/* caption only */}
          <div className="flex-1 overflow-y-auto px-4 py-4">
            {post.caption ? (
              <div className="text-sm leading-5">
                <span className="font-semibold mr-2">{post.author}</span>
                <span className="whitespace-pre-line">{post.caption}</span>
              </div>
            ) : (
              <div className="text-sm text-muted-foreground">
                설명이 없습니다.
              </div>
            )}

            {post.timestamp && (
              <div className="mt-3 text-[11px] text-muted-foreground">
                {post.timestamp}
              </div>
            )}
          </div>

          {/* footer placeholder */}
          <div className="border-t border-border px-4 py-3 text-xs text-muted-foreground">
            댓글은 표시하지 않음
          </div>
        </div>

        {/* Mobile: mini caption */}
        <div className="md:hidden absolute left-3 right-3 bottom-3 bg-background/95 backdrop-blur rounded-md px-3 py-2">
          <div className="flex items-center gap-2">
            <img
              src={post.authorImage}
              alt={post.author}
              className="w-7 h-7 rounded-full object-cover bg-muted"
            />
            <div className="text-sm font-semibold">{post.author}</div>
          </div>
          {post.caption && (
            <div className="mt-1 text-sm leading-5 whitespace-pre-line">
              {post.caption}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
