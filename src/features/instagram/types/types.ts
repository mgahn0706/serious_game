export interface Post {
  id: string;
  author: string;
  authorImage: string;
  postImages: string[];
  likes: number;
  caption: string;
  comments: { author: string; text: string }[];
  timestamp: string;
  algorithmOrder: number | null;
  taggedUserIds?: string[];
}

export interface Story {
  id: string;
  username: string;
  storyImage: string;
}

export interface Account {
  id: string;
  username: string;
  image: string;
  bio: string;
  followers: number;
  following: number;
  postCount: number;
}
