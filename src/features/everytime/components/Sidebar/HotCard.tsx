import { Heart, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function HotCard({
  title,
  likes,
  comments,
  postId,
}: {
  title: string;
  likes: number;
  comments: number;
  postId?: string;
}) {
  const navigate = useNavigate();

  return (
    <div
      className={`text-xs ${postId ? "cursor-pointer hover:text-red-600" : ""}`}
      onClick={() => {
        if (postId) navigate(`/everytime/${postId}`);
      }}
    >
      <div className="mb-1">{title}</div>
      <div className="flex items-center gap-4 text-[11px] text-gray-500">
        <span className="flex items-center gap-1">
          <Heart className="w-3 h-3" /> {likes}
        </span>
        <span className="flex items-center gap-1">
          <MessageCircle className="w-3 h-3" /> {comments}
        </span>
      </div>
    </div>
  );
}
