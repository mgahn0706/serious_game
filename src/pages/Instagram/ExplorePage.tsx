import Sidebar from "../../features/instagram/components/Sidebar";
import { posts } from "@/features/instagram/fixtures/posts";
import { MessageCircle, SquareStack } from "lucide-react";

export default function Explore() {
  return (
    <div className="flex h-screen bg-background">
      {/* Left Sidebar */}
      <Sidebar />

      {/* Explore Grid */}
      <div className="flex-1 flex overflow-hidden ml-64">
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-5xl mx-auto w-full px-4 py-6">
            <div className="grid grid-cols-3 md:grid-cols-4 gap-[2px] md:gap-2">
              {posts.map((post) => {
                const thumbnail =
                  post.postImages && post.postImages.length > 0
                    ? post.postImages[0]
                    : "/placeholder.jpg";
                const commentCount = post.comments?.length ?? 0;
                const isMulti = post.postImages?.length > 1;

                return (
                  <button
                    key={post.id}
                    type="button"
                    className="relative aspect-square overflow-hidden group focus:outline-none"
                  >
                    {/* 썸네일 이미지 */}
                    <img
                      src={thumbnail}
                      alt={post.caption}
                      className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                    />

                    {/* 여러 장 아이콘 (오른쪽 위) */}
                    {isMulti && (
                      <div className="absolute top-2 right-2 z-10">
                        <SquareStack className="w-5 h-5 text-white drop-shadow" />
                      </div>
                    )}

                    {/* 호버 오버레이 + 댓글 수 */}
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
    </div>
  );
}
