import type { Product } from "../types/types";

export const products: Product[] = [
  // ================= sellerId: 1 =================
  {
    id: 1,
    title: "닌텐도 스위치 2 (본체 + 조이콘)",
    price: 420000,
    location: "압구정동",
    time: "2시간 전",
    imageUrl:
      "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&fit=crop&w=600&q=80",
    sellerId: 1,
    category: "디지털기기",
    description: `구매 후 거의 사용하지 않았습니다.
실내에서만 사용했고 상태 매우 좋습니다.
박스 및 구성품 모두 있습니다.

신당역 인근 직거래 선호합니다.`,
    stats: {
      chat: 3,
      interest: 12,
      view: 680,
    },
  },
  {
    id: 3,
    title: "유심 칩 (미개봉)",
    price: 5000,
    location: "압구정동",
    time: "5시간 전",
    imageUrl:
      "https://i.namu.wiki/i/v7sM90pQKRCVT3PwDqDY0QdYM3RoxnjHPWEDstxAuP2iCkev3xOojgW20NK0w4gVJJo4guvOD7_-mLyLsz3CLg.webp",
    sellerId: 1,
    category: "기타 중고물품",
    description: `사용하지 않은 유심입니다.
개봉 안 했습니다.

직거래 / 택배 모두 가능.`,
    stats: {
      chat: 0,
      interest: 2,
      view: 120,
    },
  },
  {
    id: 4,
    title: "USB-C 멀티 허브",
    price: 18000,
    location: "압구정동",
    time: "1일 전",
    imageUrl:
      "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=600&q=80",
    sellerId: 1,
    category: "디지털기기",
    description: `노트북 바꾸면서 필요 없어졌습니다.
정상 작동합니다.`,
    stats: {
      chat: 0,
      interest: 4,
      view: 260,
    },
  },

  // ================= sellerId: 2 =================
  {
    id: 5,
    title: "생활 자전거",
    price: 120000,
    location: "신사동",
    time: "1일 전",
    imageUrl:
      "https://images.unsplash.com/photo-1518655048521-f130df041f66?auto=format&fit=crop&w=600&q=80",
    sellerId: 2,
    category: "자전거",
    description: `출퇴근용으로 사용했습니다.
브레이크, 기어 정상 작동. 근데 앞바퀴가 없어요`,
    stats: {
      chat: 2,
      interest: 6,
      view: 390,
    },
  },
  {
    id: 6,
    title: "소형 냉장고",
    price: 80000,
    location: "신사동",
    time: "2일 전",
    imageUrl:
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80",
    sellerId: 2,
    category: "생활가전",
    description: `원룸에서 사용했습니다.
직접 가져가셔야 합니다.`,
    stats: {
      chat: 1,
      interest: 5,
      view: 340,
    },
  },
  {
    id: 7,
    title: "산업용 파이프 (남은 자재)",
    price: 30000,
    location: "신사동",
    time: "3일 전",
    imageUrl:
      "https://images.unsplash.com/photo-1601297183305-6df142704ea2?auto=format&fit=crop&w=600&q=80",
    sellerId: 2,
    category: "기타 중고물품",
    description: `공사 후 남은 자재입니다.
여러 개 있습니다.`,
    stats: {
      chat: 0,
      interest: 1,
      view: 90,
    },
  },

  // ================= sellerId: 3 =================
  {
    id: 8,
    title: "Komplete Kontrol S88 마스터키보드",
    price: 900000,
    location: "삼성동",
    time: "12일 전",
    imageUrl:
      "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=600&q=80",
    sellerId: 3,
    category: "악기",
    description: `실용음악과 입시 준비용으로 사용했습니다.
건반 상태 매우 좋습니다.
직거래만 가능합니다.`,
    stats: {
      chat: 4,
      interest: 15,
      view: 820,
    },
  },
  {
    id: 9,
    title: "Adam Audio A7V 스튜디오 모니터 스피커 (1조)",
    price: 1600000,
    location: "삼성동",
    time: "14일 전",
    imageUrl:
      "https://images.unsplash.com/photo-1598387993441-a364f854c3e1?auto=format&fit=crop&w=600&q=80",
    sellerId: 3,
    category: "악기",
    description: `홈레코딩용으로 사용했습니다.
음질 문제 전혀 없습니다.
박스 있습니다.`,
    stats: {
      chat: 5,
      interest: 18,
      view: 1100,
    },
  },

  // ================= 추가: 인기 검색어 커버 (sellerId 4~10) =================

  // 여성의류
  {
    id: 10,
    title: "여성 롱코트 (울 혼방)",
    price: 45000,
    location: "논현1동",
    time: "6시간 전",
    imageUrl:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=600&q=80",
    sellerId: 4,
    category: "여성의류",
    description: `드라이 완료.
하자 없고 상태 좋아요.`,
    stats: { chat: 1, interest: 9, view: 510 },
  },

  // 컴퓨터
  {
    id: 11,
    title: "게이밍 키보드 (기계식)",
    price: 35000,
    location: "역삼2동",
    time: "1일 전",
    imageUrl:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80",
    sellerId: 5,
    category: "컴퓨터",
    description: `청소해서 보관 중입니다.
키감 좋고 LED 정상.`,
    stats: { chat: 0, interest: 6, view: 420 },
  },
  {
    id: 12,
    title: "모니터 27인치 (FHD)",
    price: 90000,
    location: "대치1동",
    time: "2일 전",
    imageUrl:
      "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?auto=format&fit=crop&w=600&q=80",
    sellerId: 5,
    category: "컴퓨터",
    description: `불량화소 없고 정상 동작합니다.
직거래만.`,
    stats: { chat: 2, interest: 7, view: 610 },
  },

  // 굿즈 / 포토카드 / 스타벅스
  {
    id: 13,
    title: "아이돌 공식 굿즈 세트 (미개봉 포함)",
    price: 40000,
    location: "청담동",
    time: "3시간 전",
    imageUrl:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80",
    sellerId: 6,
    category: "굿즈",
    description: `정리하면서 내놓습니다.
구성은 사진대로입니다.`,
    stats: { chat: 1, interest: 11, view: 530 },
  },
  {
    id: 14,
    title: "포토카드 묶음 (하자 없음)",
    price: 25000,
    location: "도곡1동",
    time: "5시간 전",
    imageUrl:
      "https://contents.kyobobook.co.kr/sih/fit-in/375x0/gift/pdt/1757/S1666603323322.jpg",
    sellerId: 6,
    category: "포토카드",
    description: `중복 정리합니다.
상태 최상.`,
    stats: { chat: 2, interest: 14, view: 720 },
  },
  {
    id: 15,
    title: "스타벅스 한정 텀블러 (미사용)",
    price: 25000,
    location: "삼성1동",
    time: "2시간 전",
    imageUrl:
      "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&w=600&q=80",
    sellerId: 7,
    category: "스타벅스",
    description: `선물 받았는데 사용 안 했습니다.`,
    stats: { chat: 2, interest: 12, view: 510 },
  },

  // 골프
  {
    id: 16,
    title: "골프 드라이버 (헤드커버 포함)",
    price: 180000,
    location: "대치4동",
    time: "1일 전",
    imageUrl:
      "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&w=600&q=80",
    sellerId: 7,
    category: "골프",
    description: `사용감 조금 있지만 성능 문제 없습니다.`,
    stats: { chat: 1, interest: 6, view: 410 },
  },

  // 닌텐도 (추가)
  {
    id: 17,
    title: "닌텐도 스위치 게임 칩 (인기 타이틀)",
    price: 45000,
    location: "논현2동",
    time: "4시간 전",
    imageUrl:
      "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&fit=crop&w=600&q=80",
    sellerId: 1,
    category: "닌텐도",
    description: `칩만 판매합니다.
직거래/택배 가능 (택배비 별도).`,
    stats: { chat: 2, interest: 9, view: 420 },
  },

  // 다이슨
  {
    id: 18,
    title: "다이슨 무선 청소기 (정상작동)",
    price: 220000,
    location: "압구정동",
    time: "4시간 전",
    imageUrl:
      "https://dyson-h.assetsadobe2.com/is/image/content/dam/dyson/leap-petite-global/markets/korea/products/floorcare/v8-origin/V8OriginKR_PDP.png?fmt=png-alpha&scl=1&fmt=png-alpha",
    sellerId: 8,
    category: "다이슨",
    description: `흡입력 문제 없습니다.
사용감은 조금 있어요.`,
    stats: { chat: 3, interest: 13, view: 740 },
  },

  // 캠핑
  {
    id: 19,
    title: "캠핑용 접이식 테이블 + 의자 2개",
    price: 70000,
    location: "일원본동",
    time: "6시간 전",
    imageUrl:
      "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&w=600&q=80",
    sellerId: 9,
    category: "캠핑",
    description: `보관가방 포함.
사용감 적습니다.`,
    stats: { chat: 1, interest: 8, view: 360 },
  },

  // 아이들 (추가)
  {
    id: 20,
    title: "유아 책 전집 (10권)",
    price: 25000,
    location: "개포4동",
    time: "1일 전",
    imageUrl:
      "https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=600&q=80",
    sellerId: 9,
    category: "아이들",
    description: `찢김 없이 상태 좋아요.`,
    stats: { chat: 0, interest: 5, view: 240 },
  },

  // 에어팟
  {
    id: 21,
    title: "에어팟 프로 1세대 (정품)",
    price: 130000,
    location: "역삼1동",
    time: "2시간 전",
    imageUrl:
      "https://cdsassets.apple.com/live/SZLF0YNV/images/sp/111861_airpods_pro_case__eqmrrx2cfpkm_large.png",
    sellerId: 10,
    category: "에어팟",
    description: `정품이고 정상 작동합니다.
케이스 포함.`,
    stats: { chat: 4, interest: 16, view: 860 },
  },

  // 버즈
  {
    id: 22,
    title: "갤럭시 버즈2 (케이스 포함)",
    price: 90000,
    location: "개포2동",
    time: "3시간 전",
    imageUrl:
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=600&q=80",
    sellerId: 8,
    category: "버즈",
    description: `정상 작동합니다.
생활기스 조금.`,
    stats: { chat: 2, interest: 8, view: 370 },
  },
];
