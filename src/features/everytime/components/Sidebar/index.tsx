// components/layout/EverytimeSidebar.tsx
import { SidebarBox } from "../Sidebar/SidebarBox";
import { ListRow } from "../Sidebar/ListRow";
import { RealtimePostCard } from "./RealTimePostCard";

import { everytimeData } from "@/features/everytime/fixtures/post";
import type { EverytimePost } from "@/features/everytime/types/types";

const HOT_POST_COUNT = 4;
const TRENDING_POST_COUNT = 2;

type PostWithBoard = {
  post: EverytimePost;
  boardTitle: string;
};

export function EverytimeSidebar() {
  const all: PostWithBoard[] = everytimeData.boards.flatMap((b) =>
    b.posts.map((post) => ({ post, boardTitle: b.title }))
  );

  // HOT: 좋아요 top N
  const hot = [...all]
    .sort((a, b) => (b.post.likeCount ?? 0) - (a.post.likeCount ?? 0))
    .slice(0, HOT_POST_COUNT);

  // 실시간 인기 글: 그냥 적당히 앞에서 2개(더미지만 클릭됨)
  const trending = all.slice(0, TRENDING_POST_COUNT);

  // date 포맷은 스샷처럼 "12/14 00:58" 이런 느낌이면 여기서 만들어도 됨.
  const toHotDate = (iso: string) => iso; // 최소 변경: 일단 createdAt 그대로

  return (
    <div className="space-y-6">
      <SidebarBox title="실시간 인기 글">
        {trending.map(({ post, boardTitle }) => (
          <RealtimePostCard
            key={String(post.id)}
            postId={String(post.id)}
            title={post.title}
            preview={post.preview}
            boardTitle={boardTitle}
            likeCount={post.likeCount ?? 0}
            commentCount={post.comments.length}
          />
        ))}
      </SidebarBox>

      <SidebarBox title="HOT 게시물" rightText="더 보기">
        {hot.map(({ post }) => (
          <ListRow
            key={String(post.id)}
            title={post.title}
            date={toHotDate(post.createdAt)}
            postId={String(post.id)}
          />
        ))}
      </SidebarBox>
    </div>
  );
}
