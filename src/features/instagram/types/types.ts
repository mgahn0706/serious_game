export interface Post {
  id: string;
  author: string;
  postImages: string[];
  likes: number;
  caption: string;
  comments: { author: string; text: string }[];
  timestamp: string;
  algorithmOrder: number | null;
  taggedUserIds?: string[];
}

export type Story = {
  id: string | number;
  userId: string;

  // optional fields if you already have them
  timeAgo?: string; // e.g. "6시간"
  items?: StoryItem[];
  // common alternates people use in fixtures:
  storyImage?: string;
  storyImages?: string[];
};

export type StoryItem = {
  id: string;
  type: "image"; // extend later: "video"
  src: string;
  durationMs?: number; // default 5000
};

export interface Account {
  id: string;
  username: string;
  image: string;
  bio: string;
  followers: number;
  following: number;
  postCount: number;
}
