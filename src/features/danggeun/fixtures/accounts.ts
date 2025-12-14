import type { Account } from "../types/types";

export const accounts: Account[] = [
  {
    id: 1,
    username: "범돌이",
    location: "신당동",
    temperature: 41.1,
    avatarUrl:
      "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=200",
  },
  {
    id: 2,
    username: "꼴릐",
    location: "약수동",
    temperature: 36.5,
    avatarUrl:
      "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200",
  },
  {
    id: 3,
    username: "냥냥이",
    location: "강남구",
    temperature: 0,
    avatarUrl:
      "https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?w=200",
    isRestricted: true,
  },
];
