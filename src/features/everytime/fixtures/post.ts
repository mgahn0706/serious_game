// src/features/everytime/fixtures/data.ts
import {
  type EverytimeData,
  asBoardId,
  asPostId,
  asCommentId,
} from "../types/types";

export const everytimeData: EverytimeData = {
  boards: [
    {
      id: asBoardId("board-abroad"),
      categoryTitle: "홍보게시판",
      title: "유학 + 해외체류 게시판 ✈️",
      posts: [
        // ===============================
        // 0) 미끼용 일반 유학 글
        // ===============================
        {
          id: asPostId("post-visa"),
          boardId: asBoardId("board-abroad"),
          title: "교환학생 비자 질문 있어요",
          preview: "J-1 비자 준비 중인데 DS-2019 관련해서...",
          body: "상세 본문(선택)...",
          createdAt: "2025-12-14",
          likeCount: 12,
          comments: [
            {
              id: asCommentId("c-visa-1"),
              author: { nickname: "익명", isAnonymous: true },
              content: "DS-2019는 학교 국제처에서 받아요.",
              createdAt: "2025-12-14",
              likeCount: 3,
            },
            {
              id: asCommentId("c-visa-2"),
              author: { nickname: "익명2", isAnonymous: true },
              content: "대사관 인터뷰 예약은 빨리 잡는 게 좋아요.",
              createdAt: "2025-12-14",
              likeCount: 1,
            },
          ],
        },

        // ===============================
        // 1) 유학 검색하면 걸리는 추천글 (A/B/C 후보 3개 노출)
        // ===============================
        {
          id: asPostId("post-music-abroad-reco"),
          boardId: asBoardId("board-abroad"),
          title: "실용음악 유학 대학 추천 부탁 (후보 3개로 좁혔어요)",
          preview:
            "상버드대학교 / 웨일대학교 / 머클리 음대 중 고민 중인데 현실 조언 부탁드립니다",
          body: `
실용음악(보컬/작곡) 쪽 유학 준비 중입니다.
검색해보니 아래 3곳이 제일 많이 나오더라고요.

- 상버드대학교
- 웨일대학교
- 머클리 음대

광고 말고… 실제로 준비/재학/졸업하신 분들
분위기나 준비 방향(포폴/오디션/영어/세션 등) 현실적으로 조언 부탁드려요.
`,
          createdAt: "2025-11-03",
          likeCount: 61,
          comments: [
            {
              id: asCommentId("c-reco-1"),
              author: { nickname: "익명", isAnonymous: true },
              content:
                "상버드대학교는 그냥 전반적으로 ‘정석’ 느낌이에요. 정보도 많고요.",
              createdAt: "2025-11-03",
              likeCount: 11,
            },
            {
              id: asCommentId("c-reco-2"),
              author: { nickname: "익명", isAnonymous: true },
              content:
                "웨일대학교는 학교 네임이 주는 안정감은 있는데, 결국 본인 활동이 중요합니다.",
              createdAt: "2025-11-04",
              likeCount: 7,
            },
            {
              id: asCommentId("c-reco-3"),
              author: { nickname: "익명", isAnonymous: true },
              content:
                "머클리 음대는… 여기 게시판에 글 하나 떠돌아요. 그거 한번 보고 판단하세요.",
              createdAt: "2025-11-04",
              likeCount: 23,
            },
          ],
        },

        // ===============================
        // 2) A대학 관련 글(떡밥 없음)
        // ===============================
        {
          id: asPostId("post-sangbird-qna"),
          boardId: asBoardId("board-abroad"),
          title: "상버드대학교 실용음악 오디션 준비, 보통 뭐부터 하세요?",
          preview:
            "레퍼토리/포폴/세션 경험 중 뭐가 제일 중요할까요? 준비 루틴 공유 부탁",
          body: `
상버드대학교 실용음악(보컬/작곡) 쪽 지원 고민 중입니다.
오디션 준비 루틴이랑 포폴 구성(곡 수/길이/장르 다양성) 어떻게 잡으셨나요?

학원/컨설팅 얘기 말고, 실제로 준비했던 분들 경험이 궁금합니다.
`,
          createdAt: "2025-10-06",
          likeCount: 39,
          comments: [
            {
              id: asCommentId("c-sang-1"),
              author: { nickname: "익명", isAnonymous: true },
              content:
                "레퍼토리 2~3개 확실히 + 녹음 퀄리티가 체감상 제일 중요했어요.",
              createdAt: "2025-10-06",
              likeCount: 8,
            },
            {
              id: asCommentId("c-sang-2"),
              author: { nickname: "익명", isAnonymous: true },
              content:
                "포폴은 ‘다양성’보다 ‘완성도’가 낫습니다. 심플하게 가도 돼요.",
              createdAt: "2025-10-06",
              likeCount: 4,
            },
          ],
        },

        // ===============================
        // 3) B대학 관련 글(떡밥 없음)
        // ===============================
        {
          id: asPostId("post-whale-qna"),
          boardId: asBoardId("board-abroad"),
          title:
            "웨일대학교 실용음악 유학 준비하신 분… 생활/커뮤니티 어떤가요?",
          preview:
            "한국인 커뮤니티 도움 많이 받나요? 적응 팁(하우징/세션/알바) 있으면 부탁!",
          body: `
웨일대학교 쪽으로 준비하는 중인데,
학교 정보는 많은데 ‘생활’ 쪽 정보가 너무 안 보이네요.

하우징, 세션 구하는 방법, 커뮤니티 분위기, 적응 팁 있으면 공유 부탁드려요.
`,
          createdAt: "2025-09-28",
          likeCount: 27,
          comments: [
            {
              id: asCommentId("c-whale-1"),
              author: { nickname: "익명", isAnonymous: true },
              content:
                "학교 커뮤니티는 평범한데, 결국 본인이 사람을 어떻게 만나느냐가 커요.",
              createdAt: "2025-09-28",
              likeCount: 5,
            },
            {
              id: asCommentId("c-whale-2"),
              author: { nickname: "익명2", isAnonymous: true },
              content:
                "한국인 단톡은 있긴 한데 ‘정보’보다 ‘사람’ 구하는 느낌이라 기대는 마세요.",
              createdAt: "2025-09-29",
              likeCount: 3,
            },
          ],
        },

        // ===============================
        // 4) C대학(머클리 음대) — 문제 글 + 딸 댓글로 '딸도 읽음' 암시
        // (직접 배경 설명 금지: 그냥 커뮤니티 떡밥처럼)
        // ===============================
        {
          id: asPostId("post-mucklee-korean"),
          boardId: asBoardId("board-abroad"),
          title:
            "머클리 음대에서 한국인 유학생 안 뽑는 이유 (지원 고민이면 읽어보셈)",
          preview:
            "단정은 못 하지만… 요즘 지원 준비하는 사람들 멘탈 깨지는 케이스 봄",
          body: `
머클리 음대 준비하시는 분들 요즘 많아서 글 남겨요.

‘무조건 안 뽑는다’ 이런 단정은 아니고,
특정 커뮤니티에서 오래전부터 떠돌던 얘기가 있어요.
학교/학과 쪽 분위기가 예전 같지 않다는 말도 있고요.

지원 전에는 이런 글도 한번쯤 보고,
본인 상황에 맞게 판단하는 게 좋을 듯합니다.
(댓글로 싸우자고 쓴 글 아님)
`,
          createdAt: "2025-10-21",
          likeCount: 197,
          comments: [
            {
              id: asCommentId("c-muck-1"),
              author: { nickname: "익명", isAnonymous: true },
              content:
                "이 글 때문에 지금 며칠째 검색 중… 근데 확실한 소스가 없어서 더 불안함.",
              createdAt: "2025-10-21",
              likeCount: 26,
            },
            {
              id: asCommentId("c-muck-2"),
              author: { nickname: "익명2", isAnonymous: true },
              content:
                "‘예전 사건’이란 말만 돌고 구체 얘기는 다들 피하더라… 뭐가 있긴 한가 봄.",
              createdAt: "2025-10-22",
              likeCount: 19,
            },
            {
              id: asCommentId("c-muck-3"),
              author: { nickname: "익명3", isAnonymous: true },
              content:
                "지원 준비반 쪽에서도 이 얘기 한 번씩 나오긴 함. 근데 다들 말을 아끼는 느낌.",
              createdAt: "2025-10-22",
              likeCount: 12,
            },
            {
              id: asCommentId("c-muck-daughter"),
              author: { nickname: "moonlight_vocal", isAnonymous: false },
              content:
                "헉… 이런 얘기 있는 줄은 몰랐어요. 링크랑 같이 저장해둘게요. 감사합니다.",
              createdAt: "2025-10-22",
              likeCount: 6,
            },
          ],
        },
      ],
    },
  ],
};
