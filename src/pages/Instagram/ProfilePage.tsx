"use client";

import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  UserPlus,
  Grid3X3,
  UserRound,
  Heart,
  MessageCircle,
} from "lucide-react";

import Sidebar from "../../features/instagram/components/Sidebar";
import { posts } from "@/features/instagram/fixtures/posts";
import { allAccounts } from "@/features/instagram/fixtures/account";

export default function ProfilePage() {
  const { id } = useParams<{ id: string }>();

  const account = allAccounts.find((acc) => acc.id === id) || null;

  const MY_ID = "jiyoon_pianjy";
  const isMyProfile = id === MY_ID;

  const [activeTab, setActiveTab] = useState<"posts" | "tagged">("posts");

  const allPosts = posts;

  // ✅ filter posts
  const userPosts = allPosts.filter((post) => post.author === id);

  const taggedPosts = allPosts.filter((post) =>
    post.taggedUserIds?.includes(id || "")
  );

  if (!account) {
    return (
      <div className="flex h-screen bg-background">
        <Sidebar />
        <div className="flex-1 flex overflow-hidden ml-64">
          <div className="flex-1 overflow-y-auto max-w-5xl mx-auto w-full px-4 md:px-10 pt-10 pb-12">
            <p className="text-center text-muted-foreground">
              존재하지 않는 사용자입니다.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />

      <div className="flex-1 flex overflow-hidden ml-64">
        <div className="flex-1 overflow-y-auto max-w-5xl mx-auto w-full px-4 md:px-10 pt-10 pb-12">
          {/* HEADER */}
          <section className="flex flex-col md:flex-row md:items-start gap-8 md:gap-14 pb-10 border-b border-border">
            {/* Profile image */}
            <div className="flex justify-center md:justify-start md:w-1/3">
              <div className="w-24 h-24 md:w-36 md:h-36 rounded-full overflow-hidden bg-muted">
                <img
                  src={account.image || "/placeholder.jpg"}
                  alt={id}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Right side */}
            <div className="flex-1 space-y-4">
              <div className="flex items-center gap-3 md:gap-4">
                <h2 className="text-2xl font-light">{id}</h2>

                {isMyProfile ? (
                  <></>
                ) : (
                  <>
                    <button className="hidden sm:inline-flex px-4 py-1.5 rounded-md bg-secondary text-sm font-semibold">
                      팔로잉
                    </button>
                    <button className="hidden sm:inline-flex px-4 py-1.5 rounded-md bg-secondary text-sm font-semibold">
                      메시지 보내기
                    </button>
                    <button className="hidden sm:inline-flex w-8 h-8 rounded-md bg-secondary items-center justify-center">
                      <UserPlus className="w-4 h-4" />
                    </button>
                  </>
                )}
              </div>

              {/* Stats */}
              <div className="flex items-center gap-6 text-sm">
                <span>
                  <span className="font-semibold">{userPosts.length}</span>{" "}
                  게시물
                </span>
                <span>
                  <span className="font-semibold">{account.followers}</span>{" "}
                  팔로워
                </span>
                <span>
                  <span className="font-semibold">{account.following}</span>{" "}
                  팔로우
                </span>
              </div>

              {/* Name */}
              <div className="text-sm font-semibold">{account.username}</div>

              {/* Username */}
              <div className="text-sm">
                <span className="font-semibold">@{id}</span>
              </div>

              {/* Bio */}
              {account.bio && (
                <div className="text-sm leading-5 whitespace-pre-line">
                  {account.bio}
                </div>
              )}
            </div>
          </section>

          {/* TABS */}
          <section className="pt-4">
            <div className="flex justify-center gap-12 text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground">
              <button
                className={`flex items-center gap-1 py-3 ${
                  activeTab === "posts"
                    ? "border-t border-foreground text-foreground"
                    : "border-t border-transparent"
                }`}
                onClick={() => setActiveTab("posts")}
              >
                <Grid3X3 className="w-3 h-3" />
                <span className="hidden sm:inline">게시물</span>
              </button>

              <button
                className={`flex items-center gap-1 py-3 ${
                  activeTab === "tagged"
                    ? "border-t border-foreground text-foreground"
                    : "border-t border-transparent"
                }`}
                onClick={() => setActiveTab("tagged")}
              >
                <UserRound className="w-3 h-3" />
                <span className="hidden sm:inline">태그됨</span>
              </button>
            </div>

            <div className="border-t border-border" />
          </section>

          {/* CONTENT */}
          <section className="mt-6">
            {activeTab === "posts" ? (
              userPosts.length > 0 ? (
                <div className="grid grid-cols-3 gap-1 md:gap-4">
                  {userPosts.map((post) => (
                    <PostGridItem key={post.id} post={post} />
                  ))}
                </div>
              ) : (
                <EmptyState text="게시물이 없습니다" />
              )
            ) : taggedPosts.length > 0 ? (
              <div className="grid grid-cols-3 gap-1 md:gap-4">
                {taggedPosts.map((post) => (
                  <PostGridItem key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <EmptyTagged />
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

/* ----------------- helpers ----------------- */

function PostGridItem({ post }: { post: any }) {
  const firstImage = post.postImages?.[0] ?? "/placeholder.jpg";
  const likeCount = post.likes ?? 0;
  const commentCount = post.comments?.length ?? 0;

  return (
    <div className="relative group aspect-square bg-muted cursor-pointer">
      <img src={firstImage} alt="" className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-6 text-white text-sm font-semibold">
        <div className="flex items-center gap-1">
          <Heart className="w-5 h-5 fill-white" />
          <span>{likeCount}</span>
        </div>
        <div className="flex items-center gap-1">
          <MessageCircle className="w-5 h-5" />
          <span>{commentCount}</span>
        </div>
      </div>
    </div>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="py-16 text-center text-muted-foreground text-sm">
      {text}
    </div>
  );
}

function EmptyTagged() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center text-muted-foreground">
      <div className="w-16 h-16 border border-muted-foreground rounded-full flex items-center justify-center mb-4">
        <UserRound className="w-8 h-8" />
      </div>
      <p className="text-sm font-semibold mb-1">태그된 사진이 없습니다</p>
      <p className="text-xs">
        사용자가 다른 사람의 사진에 태그되면 여기에 표시됩니다.
      </p>
    </div>
  );
}
