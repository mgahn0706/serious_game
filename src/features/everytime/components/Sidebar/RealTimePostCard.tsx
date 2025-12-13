// components/Sidebar/RealtimePostCard.tsx
import { ThumbsUp, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function RealtimePostCard({
  title,
  preview,
  boardTitle,
  likeCount,
  commentCount,
  postId,
}: {
  title: string;
  preview: string;
  boardTitle: string;
  likeCount: number;
  commentCount: number;
  postId: string;
}) {
  const navigate = useNavigate();

  return (
    <button
      className="w-full text-left px-4 py-3 border-t border-gray-200 hover:bg-gray-50"
      onClick={() => navigate(`/everytime/${postId}`)}
    >
      {/* 제목 */}
      <div className="text-sm font-semibold text-gray-800 mb-1">{title}</div>

      {/* 미리보기 */}
      <div className="text-xs text-gray-500 leading-relaxed line-clamp-2 mb-2">
        {preview}
      </div>

      {/* 메타 정보 */}
      <div className="flex items-center gap-3 text-xs text-gray-400">
        <span>{boardTitle}</span>

        <span className="flex items-center gap-1 text-red-500">
          <ThumbsUp className="w-3 h-3" />
          {likeCount}
        </span>

        <span className="flex items-center gap-1 text-cyan-500">
          <MessageCircle className="w-3 h-3" />
          {commentCount}
        </span>
      </div>
    </button>
  );
}
