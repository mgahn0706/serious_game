"use client";

import { useState } from "react";
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface Comment {
  author: string;
  text: string;
}

interface PostCardProps {
  author: string;
  authorImage: string;
  postImages: string[];
  likes: number;
  caption: string;
  comments: Comment[];
  timestamp: string;
}

export default function PostCard({
  author,
  authorImage,
  postImages,
  likes,
  caption,
  comments,
  timestamp,
}: PostCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [currentLikes, setCurrentLikes] = useState(likes);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setCurrentLikes(isLiked ? currentLikes - 1 : currentLikes + 1);
  };

  const handleImageNav = (direction: "prev" | "next") => {
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
        <div className="flex items-center gap-3">
          <img
            src={authorImage || "/placeholder.jpg"}
            alt={author}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <p className="font-semibold text-sm">{author}</p>
            <p className="text-xs text-muted-foreground">{timestamp}</p>
          </div>
        </div>
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
              onClick={() => handleImageNav("prev")}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleImageNav("next")}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Image indicator dots */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {postImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    idx === currentImageIndex ? "bg-white" : "bg-white/50"
                  }`}
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
            onClick={handleLike}
            className="hover:opacity-70 transition-opacity"
          >
            <Heart
              className={`w-6 h-6 ${
                isLiked ? "fill-red-500 text-red-500" : "text-foreground"
              }`}
            />
          </button>
          <button className="hover:opacity-70 transition-opacity">
            <MessageCircle className="w-6 h-6 text-foreground" />
          </button>
          <button className="hover:opacity-70 transition-opacity">
            <Share2 className="w-6 h-6 text-foreground" />
          </button>
        </div>
        <button
          onClick={() => setIsSaved(!isSaved)}
          className="hover:opacity-70 transition-opacity"
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
          좋아요 {currentLikes.toLocaleString()}개
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

      {/* Comments link */}
      <div className="px-4 py-2 text-sm text-muted-foreground cursor-pointer hover:text-foreground">
        댓글 모두 보기
      </div>

      {/* Comment input */}
      <div className="flex items-center gap-3 px-4 py-3 border-t border-border">
        <input
          type="text"
          placeholder="댓글 달기..."
          className="flex-1 bg-transparent text-sm outline-none placeholder-muted-foreground"
        />
        <button className="text-primary font-semibold text-sm hover:text-primary/80">
          게시
        </button>
      </div>
    </div>
  );
}
