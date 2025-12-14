"use client";

import { useMemo, useState } from "react";
import Sidebar from "../../features/instagram/components/Sidebar";
import { posts } from "@/features/instagram/fixtures/posts";
import { MessageCircle, SquareStack } from "lucide-react";
import PostModal from "@/features/instagram/components/PostModal";

type Post = (typeof posts)[number];

export default function Explore() {
  // ✅ algorithmOrder 정렬 (null은 뒤로)
  const sortedPosts = useMemo(() => {
    return [...posts]
      .filter((post) => post.algorithmOrder !== null)
      .sort((a, b) => {
        if (a.algorithmOrder == null && b.algorithmOrder == null) return 0;
        if (a.algorithmOrder == null) return 1;
        if (b.algorithmOrder == null) return -1;
        return b.algorithmOrder - a.algorithmOrder;
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
