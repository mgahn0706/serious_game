import type { Product } from "../types/types";

export const products: Product[] = [
  {
    id: 1,
    title: "Emis 이미스 멀티 포켓 호보백 옐로우",
    price: 45000,
    location: "신당동",
    time: "2시간 전",
    imageUrl:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80",
    sellerId: 1,
    category: "여성의류",
    description: `옷정리중 입니다.
사이즈M이지만
100~105 입는분들도 맞을듯 합니다.

택만없는 거의 새거라고 보시면 됩니다.

신당역3번출구밖
직거래 선호 합니다.
택배는 4천원 추가.`,
    stats: {
      chat: 1,
      interest: 8,
      view: 599,
    },
  },
  {
    id: 2,
    title: "애플워치10 티타늄 골드 42mm",
    price: 500000,
    location: "신당동",
    time: "2시간 전",
    imageUrl:
      "https://images.unsplash.com/photo-1526434426615-4f1657843c8a?auto=format&fit=crop&w=600&q=80",
    sellerId: 1,
    category: "디지털기기",
    description: `실사용 거의 없습니다.
생활기스 없음.
풀박스.`,
    stats: {
      chat: 0,
      interest: 3,
      view: 210,
    },
  },
  {
    id: 3,
    title: "레이디가구 이안 에디션 드레스룸",
    price: 100000,
    location: "신당동",
    time: "2시간 전",
    imageUrl:
      "https://images.unsplash.com/photo-1616628188460-8fea8c78d7b7?auto=format&fit=crop&w=600&q=80",
    sellerId: 2,
    category: "가구/인테리어",
    description: `직접 가져가셔야 합니다.
분해 가능.`,
    stats: {
      chat: 2,
      interest: 5,
      view: 430,
    },
  },
];
