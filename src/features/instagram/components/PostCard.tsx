"use client";

import { useMemo, useState } from "react";
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import type { Post } from "../types/types";
import { allAccounts } from "../fixtures/account";
import { NavLink } from "react-router-dom";

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const {
    author,
    postImages = [],
    likes,
    caption,
    comments = [],
    timestamp,
  } = post;

  const authorAccount = useMemo(() => {
    return allAccounts.find((acc) => String(acc.id) === String(author));
  }, [author]);

  const authorImage = authorAccount?.image || "/placeholder.jpg";

  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // ✅ derived likes (no double update bug)
  const displayedLikes = useMemo(() => {
    const base = typeof likes === "number" ? likes : 0;
    return base + (isLiked ? 1 : 0);
  }, [likes, isLiked]);

  const handleLike = () => {
    setIsLiked((prev) => !prev);
  };

  const handleImageNav = (direction: "prev" | "next") => {
    if (postImages.length <= 1) return;
    if (direction === "prev") {
      setCurrentImageIndex((prev) =>
        prev === 0 ? postImages.length - 1 : prev - 1
      );
    } else {
      setCurrentImageIndex((prev) =>
        prev === postImages.length - 1 ? 0 : prev + 1
      );
    }
  };

  return (
    <div className="bg-background py-0 border-b border-border">
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <NavLink
          to={`/instagram/profile/${author}`}
          className="flex items-center gap-3"
        >
          <img
            src={authorImage}
            alt={author}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <p className="font-semibold text-sm">{author}</p>
            <p className="text-xs text-muted-foreground">{timestamp}</p>
          </div>
        </NavLink>

        <button className="hover:bg-secondary p-2 rounded-full transition-colors">
          <MoreHorizontal className="w-5 h-5 text-foreground" />
        </button>
      </div>

      {/* Image Carousel */}
      <div className="relative overflow-hidden bg-gray-100 aspect-square group">
        <img
          src={postImages[currentImageIndex] || "/placeholder.jpg"}
          alt="post"
          className="w-full h-full object-cover"
        />

        {postImages.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => handleImageNav("prev")}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => handleImageNav("next")}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {postImages.map((_, idx) => (
                <button
                  type="button"
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    idx === currentImageIndex ? "bg-white" : "bg-white/50"
                  }`}
                  aria-label={`Go to image ${idx + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={handleLike}
            className="hover:opacity-70 transition-opacity"
            aria-label="Like"
          >
            <Heart
              className={`w-6 h-6 ${
                isLiked ? "fill-red-500 text-red-500" : "text-foreground"
              }`}
            />
          </button>

          <button
            type="button"
            className="hover:opacity-70 transition-opacity"
            aria-label="Comment"
          >
            <MessageCircle className="w-6 h-6 text-foreground" />
          </button>

          <button
            type="button"
            className="hover:opacity-70 transition-opacity"
            aria-label="Share"
          >
            <Share2 className="w-6 h-6 text-foreground" />
          </button>
        </div>

        <button
          type="button"
          onClick={() => setIsSaved((s) => !s)}
          className="hover:opacity-70 transition-opacity"
          aria-label="Save"
        >
          <Bookmark
            className={`w-6 h-6 ${
              isSaved ? "fill-foreground" : "text-foreground"
            }`}
          />
        </button>
      </div>

      {/* Likes */}
      <div className="px-4">
        <p className="font-semibold text-sm">
          좋아요 {displayedLikes.toLocaleString()}개
        </p>
      </div>

      {/* Caption */}
      <div className="px-4 py-2">
        <p className="text-sm">
          <span className="font-semibold">{author}</span> {caption}
        </p>
      </div>

      {/* Comments preview */}
      {comments.length > 0 && (
        <div className="px-4 py-2">
          {comments.map((comment, idx) => (
            <p key={idx} className="text-sm">
              <span className="font-semibold">{comment.author}</span>{" "}
              {comment.text}
            </p>
          ))}
        </div>
      )}

      <div className="px-4 py-2 text-sm text-muted-foreground cursor-pointer hover:text-foreground mb-4">
        댓글 모두 보기
      </div>
    </div>
  );
}
