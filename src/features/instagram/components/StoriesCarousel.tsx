// src/features/instagram/components/StoriesCarousel.tsx
"use client";

import { useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { stories } from "../fixtures/stories";
import StoryViewerModal from "./StoryViewerModal";
import { allAccounts } from "../fixtures/account";

export default function StoriesCarousel() {
  const [scrollPos, setScrollPos] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // story viewer modal
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [activeStoryId, setActiveStoryId] = useState<string | null>(null);

  const openViewer = (storyId: string) => {
    setActiveStoryId(storyId);
    setIsViewerOpen(true);
  };

  const closeViewer = () => {
    setIsViewerOpen(false);
    setActiveStoryId(null);
  };

  const scroll = (direction: "left" | "right") => {
    if (!containerRef.current) return;
    const scrollAmount = 300;
    const newPos =
      direction === "left"
        ? Math.max(0, scrollPos - scrollAmount)
        : scrollPos + scrollAmount;

    containerRef.current.scrollLeft = newPos;
    setScrollPos(newPos);
  };

  // Keep only stories that actually have story content (optional)
  const storyList = useMemo(() => stories, []);

  return (
    <>
      <div className="bg-background border-b border-border p-4 relative">
        <div className="flex gap-4 pb-2 overflow-x-hidden" ref={containerRef}>
          {storyList.map((story: any) => {
            const account = allAccounts.find(
              (acc) => acc.username === story.username
            );
            return (
              <button
                key={story.id}
                type="button"
                onClick={() => openViewer(String(story.id))}
                className="flex flex-col items-center gap-2 flex-shrink-0 group"
              >
                {/* Story ring */}
                <div
                  className={`w-16 h-16 rounded-full p-[2px] flex-shrink-0 flex items-center justify-center transition-transform group-hover:scale-110 ${
                    story.hasStory
                      ? "bg-gradient-to-br from-yellow-400 via-red-500 to-pink-600"
                      : "bg-gray-300"
                  }`}
                >
                  <div className="w-full h-full rounded-full bg-white p-[3px] overflow-hidden">
                    <img
                      src={account?.image || "/placeholder.jpg"}
                      alt={story.username}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                </div>

                <span className="text-xs font-medium truncate w-16 text-center text-foreground">
                  {story.username}
                </span>
              </button>
            );
          })}
        </div>

        {/* Scroll arrows */}
        <button
          type="button"
          onClick={() => scroll("left")}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-1 shadow z-10"
        >
          <ChevronLeft className="w-5 h-5 text-foreground" />
        </button>
        <button
          type="button"
          onClick={() => scroll("right")}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-1 shadow z-10"
        >
          <ChevronRight className="w-5 h-5 text-foreground" />
        </button>
      </div>

      {/* Story Viewer */}
      {isViewerOpen && activeStoryId && (
        <StoryViewerModal
          stories={storyList}
          initialStoryId={activeStoryId}
          onClose={closeViewer}
        />
      )}
    </>
  );
}
