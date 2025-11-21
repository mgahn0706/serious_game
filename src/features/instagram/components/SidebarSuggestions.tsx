"use client";

import { useState } from "react";

interface SuggestedUser {
  id: string;
  username: string;
  handle: string;
  image: string;
  description: string;
}

const currentUser = {
  username: "4n_gyu",
  handle: "이민규",
  image: "/placeholder.jpg?key=gchm6",
};

const suggestedUsers: SuggestedUser[] = [
  {
    id: "1",
    username: "sh_ad_astra",
    handle: "temp_humb의 게팔 팔로우중입니다",
    image: "/placeholder.jpg?key=x8qoa",
    description: "",
  },
  {
    id: "2",
    username: "wonjunc01",
    handle: "myallstrssg의 게팔 팔로우중입니다",
    image: "/placeholder.jpg?key=cpoqe",
    description: "",
  },
  {
    id: "3",
    username: "snuclsalum",
    handle: "zzong_bbee의 게팔 팔로우중입니다",
    image: "/placeholder.jpg?key=t2blx",
    description: "",
  },
  {
    id: "4",
    username: "hoxjeong",
    handle: "wbadddy의 게팔 팔로우중입니다",
    image: "/placeholder.jpg?key=d5ra4",
    description: "",
  },
  {
    id: "5",
    username: "b.incan",
    handle: "qiwasd_01의 게팔 팔로우중입니다",
    image: "/placeholder.jpg?key=yg4w3",
    description: "",
  },
];

export default function SidebarSuggestions() {
  const [following, setFollowing] = useState<Record<string, boolean>>({});

  const toggleFollow = (id: string) => {
    setFollowing((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="p-4">
      {/* Current user */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3 flex-1">
          <img
            src={currentUser.image || "/placeholder.jpg"}
            alt="user"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm truncate">
              {currentUser.username}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {currentUser.handle}
            </p>
          </div>
        </div>
        <button className="text-primary font-semibold text-sm hover:text-primary/80 whitespace-nowrap">
          전환
        </button>
      </div>

      {/* Suggestions header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-sm text-muted-foreground">
          회원님을 위한 추천
        </h3>
        <button className="text-sm font-semibold text-foreground hover:text-muted-foreground">
          모두 보기
        </button>
      </div>

      {/* Suggested users */}
      <div className="space-y-3">
        {suggestedUsers.map((user) => (
          <div key={user.id} className="flex items-center justify-between">
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <img
                src={user.image || "/placeholder.jpg"}
                alt={user.username}
                className="w-8 h-8 rounded-full object-cover flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate">
                  {user.username}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {user.handle}
                </p>
              </div>
            </div>
            {/* <Button
              size="sm"
              variant="ghost"
              className="text-xs font-semibold whitespace-nowrap text-primary hover:bg-transparent hover:text-primary/80"
              onClick={() => toggleFollow(user.id)}
            >
              {following[user.id] ? "팔로우 중" : "팔로우"}
            </Button> */}
          </div>
        ))}
      </div>

      {/* Footer links */}
      <div className="text-xs text-muted-foreground space-y-2 mt-8 flex flex-col gap-1">
        <div className="flex flex-wrap gap-x-3 gap-y-1">
          <a href="#" className="hover:underline">
            소개
          </a>
          <a href="#" className="hover:underline">
            도움말
          </a>
          <a href="#" className="hover:underline">
            홍보 센터
          </a>
          <a href="#" className="hover:underline">
            API
          </a>
          <a href="#" className="hover:underline">
            채용 정보
          </a>
        </div>
        <div className="flex flex-wrap gap-x-3 gap-y-1">
          <a href="#" className="hover:underline">
            개인정보처리방침
          </a>
          <a href="#" className="hover:underline">
            약관
          </a>
          <a href="#" className="hover:underline">
            위치
          </a>
          <a href="#" className="hover:underline">
            Meta Verified
          </a>
        </div>
        <p className="pt-4">© 2025 INSTAGRAM FROM META</p>
      </div>
    </div>
  );
}
