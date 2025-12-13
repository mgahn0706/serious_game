// components/Sidebar/ListRow.tsx
import { useNavigate } from "react-router-dom";

export function ListRow({
  title,
  date,
  postId,
}: {
  title: string;
  date?: string;
  postId?: string;
}) {
  const navigate = useNavigate();

  return (
    <div
      className={`px-4 py-2.5 border-t border-gray-200 flex items-center justify-between ${
        postId ? "cursor-pointer hover:bg-gray-50" : ""
      }`}
      onClick={() => postId && navigate(`/everytime/${postId}`)}
    >
      <span className="text-sm text-gray-800 truncate">{title}</span>
      {date && (
        <span className="text-xs text-gray-400 ml-3 whitespace-nowrap">
          {date}
        </span>
      )}
    </div>
  );
}
