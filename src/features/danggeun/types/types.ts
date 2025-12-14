export type Account = {
  id: number;
  username: string;
  location: string;
  temperature: number; // 매너온도
  avatarUrl: string;
};

export type Product = {
  id: number;
  title: string;
  price: number; // number로 통일 (표시는 formatter)
  location: string;
  time: string;
  imageUrl: string;
  sellerId: number;

  // detail용
  category: string;
  description: string;
  stats: {
    chat: number;
    interest: number;
    view: number;
  };
};
