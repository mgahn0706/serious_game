import type { Account } from "../types/types";

export const myAccount: Account = {
  id: "jiyoon_pianjy",
  username: "지윤",
  image: "/instagram/profile/placeholder.png",
  bio: "SNU COMM 25",
  followers: 150,
  following: 200,
  postCount: 1,
};

export const suggestedAccounts: Account[] = [
  {
    id: "4n_gyu",
    username: "안민규",
    image: "/instagram/profile/placeholder.png",
    bio: "",
    followers: 0,
    following: 0,
    postCount: 0,
  },
  {
    id: "seonghazeln",
    username: "김성하",
    image: "/instagram/profile/placeholder.png",
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
    image: "/instagram/profile/placeholder.png",
    bio: "🩷 @jiyoon_pianjy",
    followers: 240,
    following: 320,
    postCount: 5,
  },
  {
    id: "kevin_yoon",
    username: "Kevin Yoon",
    image: "/instagram/profile/placeholder.png",
    bio: "Travel | Photography | Foodie | Merklee College",
    followers: 500,
    following: 910,
    postCount: 15,
  },
  {
    id: "yoon_music_s2",
    username: "샤울특별시 Yoon 피아노 학원",
    image: "/instagram/profile/placeholder.png",
    bio: "샤울대입구역 3번 출구 피아노 레슨 전문 학원입니다. 모든 연령대 환영! 유학 레슨 가능.",
    followers: 134,
    following: 12,
    postCount: 20,
  },
];

const additionalAccounts: Account[] = [
  {
    id: "gusty_park",
    username: "박강산",
    image: "/instagram/profile/placeholder.png",
    bio: "Nature lover and adventure seeker.",
    followers: 350,
    following: 400,
    postCount: 8,
  },
  {
    id: "music_equipments",
    username: "음악 장비에 대한 모든 것",
    image: "/instagram/profile/music_equipments.png",
    bio: "Your go-to source for music gear reviews and tips.",
    followers: 420,
    following: 380,
    postCount: 12,
  },
  {
    id: "nvidia",
    username: "NVIDIA",
    image: "/instagram/profile/nvidia.png",
    bio: "The official NVIDIA Instagram account. #GeForce",
    followers: 20000000,
    following: 5,
    postCount: 3000,
  },
  {
    id: "namyangju_star",
    username: "카페 별다방남양주",
    image: "/instagram/profile/namyangju_star.png",
    bio: "남양주 최고의 카페! 맛있는 커피와 디저트를 즐겨보세요.",
    followers: 8000,
    following: 150,
    postCount: 250,
  },
  {
    id: "macs_euih",
    username: "꿀팁 대방출",
    image: "/instagram/profile/macs_euih.png",
    bio: "일상 생활을 더 편리하게 만드는 다양한 꿀팁을 공유합니다!",
    followers: 12000,
    following: 300,
    postCount: 180,
  },
];

export const allAccounts: Account[] = [
  myAccount,
  ...suggestedAccounts,
  ...mainAccounts,
  ...additionalAccounts,
];
