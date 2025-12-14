import Sidebar from "../../features/instagram/components/Sidebar";
import PostCard from "../../features/instagram/components/PostCard";
import SidebarSuggestions from "../../features/instagram/components/SidebarSuggestions";
import StoriesCarousel from "../../features/instagram/components/StoriesCarousel";
import { posts } from "@/features/instagram/fixtures/posts";

export default function Feed() {
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
            {posts
              .sort((a, b) => {
                //random
                return 0.5 - Math.random();
              })
              .filter((post) => post.algorithmOrder === null)
              .map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
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
