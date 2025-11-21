"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Story {
  id: string;
  username: string;
  image: string;
  hasStory: boolean;
}

const stories: Story[] = [
  {
    id: "1",
    username: "thdnwn0",
    image: "/placeholder.jpg",
    hasStory: true,
  },
  {
    id: "2",
    username: "mobeau_sh",
    image: "/placeholder.jpg",
    hasStory: true,
  },
  {
    id: "3",
    username: "01_doubl...",
    image: "/placeholder.jpg",
    hasStory: true,
  },
  {
    id: "4",
    username: "poikliothe...",
    image: "/placeholder.jpg",
    hasStory: true,
  },
  {
    id: "5",
    username: "youngjin_...",
    image: "/placeholder.jpg",
    hasStory: true,
  },
  {
    id: "6",
    username: "horangrin",
    image: "/placeholder.jpg",
    hasStory: true,
  },
];

export default function StoriesCarousel() {
  const [scrollPos, setScrollPos] = useState(0);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (containerRef.current) {
      const scrollAmount = 300;
      const newPos =
        direction === "left"
          ? Math.max(0, scrollPos - scrollAmount)
          : scrollPos + scrollAmount;
      containerRef.current.scrollLeft = newPos;
      setScrollPos(newPos);
    }
  };

  return (
    <div className="bg-background border-b border-border p-4 relative">
      <div className="flex gap-4 pb-2 overflow-x-hidden" ref={containerRef}>
        {stories.map((story) => (
          <button
            key={story.id}
            className="flex flex-col items-center gap-2 flex-shrink-0 group"
          >
            {/* Story ring with gradient border */}
            <div
              className={`w-16 h-16 rounded-full p-[2px] flex-shrink-0 flex items-center justify-center transition-transform group-hover:scale-110 ${
                story.hasStory
                  ? "bg-gradient-to-br from-yellow-400 via-red-500 to-pink-600"
                  : "bg-gray-300"
              }`}
            >
              <div className="w-full h-full rounded-full bg-white p-[3px] overflow-hidden">
                <img
                  src={story.image || "/placeholder.jpg"}
                  alt={story.username}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </div>
            <span className="text-xs font-medium truncate w-16 text-center text-foreground">
              {story.username}
            </span>
          </button>
        ))}
      </div>

      {/* Scroll arrows */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-1 shadow z-10"
      >
        <ChevronLeft className="w-5 h-5 text-foreground" />
      </button>
      <button
        onClick={() => scroll("right")}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-1 shadow z-10"
      >
        <ChevronRight className="w-5 h-5 text-foreground" />
      </button>
    </div>
  );
}

import React from "react";
