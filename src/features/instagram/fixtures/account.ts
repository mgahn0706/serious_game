import type { Account } from "../types/types";

export const myAccount: Account = {
  id: "jiyoon_pianjy",
  username: "지윤",
  image: "placeholder.jpg",
  bio: "SNU COMM 25",
  followers: 150,
  following: 200,
  postCount: 1,
};

export const suggestedAccounts: Account[] = [
  {
    id: "4n_gyu",
    username: "안민규",
    image: "placeholder.jpg",
    bio: "",
    followers: 0,
    following: 0,
    postCount: 0,
  },
  {
    id: "seonghazeln",
    username: "김성하",
    image: "placeholder.jpg",
    bio: "",
    followers: 0,
    following: 0,
    postCount: 0,
  },
];

const mainAccounts: Account[] = [
  {
    id: "kim_hwan",
    username: "김승환",
    image: "nvidia.jpg",
    bio: "🩷 @jiyoon_pianjy",
    followers: 240,
    following: 320,
    postCount: 5,
  },
  {
    id: "kevin_yoon",
    username: "Kevin Yoon",
    image: "placeholder.jpg",
    bio: "Travel | Photography | Foodie",
    followers: 500,
    following: 910,
    postCount: 15,
  },
];

const additionalAccounts: Account[] = [
  {
    id: "gusty_park",
    username: "박강산",
    image: "placeholder.jpg",
    bio: "Nature lover and adventure seeker.",
    followers: 350,
    following: 400,
    postCount: 8,
  },
  {
    id: "sumin_lee",
    username: "이수민",
    image: "placeholder.jpg",
    bio: "Food enthusiast and home chef.",
    followers: 420,
    following: 380,
    postCount: 12,
  },
  {
    id: "nvidia",
    username: "NVIDIA",
    image: "nvidia.jpg",
    bio: "The official NVIDIA Instagram account. #GeForce",
    followers: 20000000,
    following: 5,
    postCount: 3000,
  },
];

export const allAccounts: Account[] = [
  myAccount,
  ...suggestedAccounts,
  ...mainAccounts,
  ...additionalAccounts,
];
