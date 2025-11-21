"use client";

import PostCard from "../features/instagram/components/PostCard";
import Sidebar from "../features/instagram/components/Sidebar";
import SidebarSuggestions from "../features/instagram/components/SidebarSuggestions";
import StoriesCarousel from "../features/instagram/components/StoriesCarousel";

export default function InstagramPage() {
  return (
    <div className="flex h-screen bg-background">
      {/* Left Sidebar */}
      <Sidebar />

      {/* Main Feed */}
      <div className="flex-1 flex overflow-hidden ml-64">
        <div className="flex-1 overflow-y-auto border-r border-border max-w-2xl mx-auto w-full">
          {/* Stories */}
          <StoriesCarousel />

          {/* Posts */}
          <div className="divide-y divide-border">
            <PostCard
              author="ysang_1120"
              authorImage="placeholder.jpg"
              postImages={["placeholder.jpg"]}
              likes={14}
              caption="... 더 보기"
              comments={[{ author: "dawnn_tarot", text: "응고" }]}
              timestamp="2025.09-11"
            />
            <PostCard
              author="dawnn_tarot"
              authorImage="/placeholder.jpg"
              postImages={["/placeholder.jpg"]}
              likes={23}
              caption="좋은 글귀..."
              comments={[]}
              timestamp="2 hours ago"
            />
          </div>
        </div>

        {/* Right Sidebar - Suggestions */}
        <div className="hidden lg:block w-80 overflow-y-auto border-l border-border">
          <SidebarSuggestions />
        </div>
      </div>
    </div>
  );
}
