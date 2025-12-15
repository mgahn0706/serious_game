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
      id: asBoardId("1"), // board-abroad
      categoryTitle: "홍보게시판",
      title: "유학 + 해외체류 게시판 ✈️",
      posts: [
        // ===============================
        // 0) 미끼용 일반 유학 글
        // ===============================
        {
          id: asPostId("101"),
          boardId: asBoardId("1"),
          author: { nickname: "익명", isAnonymous: true },
          title: "교환학생 비자 질문 있어요",
          preview: "J-1 비자 준비 중인데 DS-2019 관련해서...",
          body: "어떻게 해야할지 잘 모르겠어요. 도움 부탁드립니다.",
          createdAt: "2025-12-14",
          likeCount: 1,
          comments: [
            {
              id: asCommentId("1001"),
              author: { nickname: "익명", isAnonymous: true },
              content: "DS-2019는 학교 국제처에서 받아요.",
              createdAt: "2025-12-14",
              likeCount: 3,
            },
            {
              id: asCommentId("1002"),
              author: { nickname: "익명2", isAnonymous: true },
              content: "대사관 인터뷰 예약은 빨리 잡는 게 좋아요.",
              createdAt: "2025-12-14",
              likeCount: 1,
            },
          ],
        },

        // ===============================
        // 1) 유학 검색하면 걸리는 추천글
        // ===============================
        {
          id: asPostId("102"),
          boardId: asBoardId("1"),
          author: { nickname: "익명", isAnonymous: true },
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
          likeCount: 1,
          comments: [
            {
              id: asCommentId("1003"),
              author: { nickname: "익명", isAnonymous: true },
              content:
                "상버드대학교는 그냥 전반적으로 ‘정석’ 느낌이에요. 정보도 많고요.",
              createdAt: "2025-11-03",
              likeCount: 11,
            },
            {
              id: asCommentId("1004"),
              author: { nickname: "익명", isAnonymous: true },
              content:
                "웨일대학교는 학교 네임이 주는 안정감은 있는데, 결국 본인 활동이 중요합니다.",
              createdAt: "2025-11-04",
              likeCount: 7,
            },
            {
              id: asCommentId("1005"),
              author: { nickname: "익명", isAnonymous: true },
              content:
                "머클리 음대는… 여기 게시판에 글 하나 떠돌아요. 그거 한번 보고 판단하세요.",
              createdAt: "2025-11-04",
              likeCount: 23,
            },
          ],
        },

        // ===============================
        // 2) A대학 관련 글
        // ===============================
        {
          id: asPostId("103"),
          boardId: asBoardId("1"),
          author: { nickname: "익명", isAnonymous: true },
          title: "상버드대학교 실용음악 오디션 준비, 보통 뭐부터 하세요?",
          preview:
            "레퍼토리/포폴/세션 경험 중 뭐가 제일 중요할까요? 준비 루틴 공유 부탁",
          body: `
상버드대학교 실용음악(보컬/작곡) 쪽 지원 고민 중입니다.
오디션 준비 루틴이랑 포폴 구성(곡 수/길이/장르 다양성) 어떻게 잡으셨나요?

학원/컨설팅 얘기 말고, 실제로 준비했던 분들 경험이 궁금합니다.
`,
          createdAt: "2025-10-06",
          likeCount: 9,
          comments: [
            {
              id: asCommentId("1006"),
              author: { nickname: "익명", isAnonymous: true },
              content:
                "레퍼토리 2~3개 확실히 + 녹음 퀄리티가 체감상 제일 중요했어요.",
              createdAt: "2025-10-06",
              likeCount: 8,
            },
            {
              id: asCommentId("1007"),
              author: { nickname: "익명", isAnonymous: true },
              content:
                "포폴은 ‘다양성’보다 ‘완성도’가 낫습니다. 심플하게 가도 돼요.",
              createdAt: "2025-10-06",
              likeCount: 4,
            },
          ],
        },

        // ===============================
        // 3) B대학 관련 글
        // ===============================
        {
          id: asPostId("104"),
          boardId: asBoardId("1"),
          author: { nickname: "익명", isAnonymous: true },
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
              id: asCommentId("1008"),
              author: { nickname: "익명", isAnonymous: true },
              content:
                "학교 커뮤니티는 평범한데, 결국 본인이 사람을 어떻게 만나느냐가 커요.",
              createdAt: "2025-09-28",
              likeCount: 5,
            },
            {
              id: asCommentId("1009"),
              author: { nickname: "익명2", isAnonymous: true },
              content:
                "한국인 단톡은 있긴 한데 ‘정보’보다 ‘사람’ 구하는 느낌이라 기대는 마세요.",
              createdAt: "2025-09-29",
              likeCount: 3,
            },
          ],
        },

        // ===============================
        // 4) C대학(머클리 음대) 문제 글
        // ===============================
        {
          id: asPostId("105"),
          boardId: asBoardId("1"),
          author: { nickname: "익명", isAnonymous: true },
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
          likeCount: 17,
          comments: [
            {
              id: asCommentId("1010"),
              author: { nickname: "익명", isAnonymous: true },
              content:
                "이 글 때문에 지금 며칠째 검색 중… 근데 확실한 소스가 없어서 더 불안함.",
              createdAt: "2025-10-21",
              likeCount: 26,
            },
            {
              id: asCommentId("1011"),
              author: { nickname: "익명2", isAnonymous: true },
              content:
                "‘예전 사건’이란 말만 돌고 구체 얘기는 다들 피하더라… 뭐가 있긴 한가 봄.",
              createdAt: "2025-10-22",
              likeCount: 19,
            },
            {
              id: asCommentId("1012"),
              author: { nickname: "익명3", isAnonymous: true },
              content:
                "지원 준비반 쪽에서도 이 얘기 한 번씩 나오긴 함. 근데 다들 말을 아끼는 느낌.",
              createdAt: "2025-10-22",
              likeCount: 12,
            },
            {
              id: asCommentId("1013"),
              author: { nickname: "moonlight_vocal", isAnonymous: true },
              content:
                "헉… 이런 얘기 있는 줄은 몰랐어요. 링크랑 같이 저장해둘게요. 감사합니다.",
              createdAt: "2025-10-22",
              likeCount: 6,
            },
          ],
        },

        // ===============================
        // 5) moonlight_vocal이 쓴 유학 게시판 글
        // ===============================
        {
          id: asPostId("106"),
          boardId: asBoardId("1"),
          author: { nickname: "moonlight_vocal", isAnonymous: true },
          title: "머클리음대 왜 한국인 안뽑나요? 글",
          preview:
            "최근에 ‘한국인 잘 안 뽑는다’ 얘기 많이 보이는데, 진짜 이유 아는 분 있나요?",
          body: `
요즘 유학 준비하면서 머클리 관련 글 검색하다가
"한국인 유학생 잘 안 뽑는다" 이런 말이 계속 보여서요.

혹시 실제로 경험한 분 있나요?
(지원/오디션/학과/포폴 쪽에서 뭐가 문제인지 등)

카더라 말고, 아는 범위에서라도 정보 공유 부탁드립니다.
`,
          createdAt: "2025-12-05",
          likeCount: 4,
          comments: [],
        },

        // ===============================
        // 6) (추가) 지도교수 관심 없음
        // ===============================
        {
          id: asPostId("107"),
          boardId: asBoardId("1"),
          author: { nickname: "익명", isAnonymous: true },
          title: "아 유학가고싶은데 지도교수는 나한테 관심도 없음",
          preview: "컨택/추천서 생각하면 막막함… 그냥 포기해야 하나",
          body: `
유학(특히 박사/석박) 쪽으로 마음이 있는데,
정작 지도교수는 나한테 관심도 없는 느낌이라 너무 막막합니다.

미팅 잡아도 반응이 미지근하고,
추천서나 컨택 생각하면 더 답답하고요.

비슷한 상황에서 어떻게 풀었는지 경험담 있으면 공유 부탁드립니다.
`,
          createdAt: "2025-12-13",
          likeCount: 3,
          comments: [
            {
              id: asCommentId("1016"),
              author: { nickname: "익명2", isAnonymous: true },
              content:
                "관심 없으면 더더욱 기록 남기는 게 중요해요. 미팅 요약 메일 보내두기 추천.",
              createdAt: "2025-12-13",
              likeCount: 7,
            },
          ],
        },

        // ===============================
        // 7) (추가) 미박 가고 싶다
        // ===============================
        {
          id: asPostId("108"),
          boardId: asBoardId("1"),
          author: { nickname: "익명", isAnonymous: true },
          title: "미박 가고 싶다",
          preview: "근데 내가 될까… 준비 방향이 너무 막연함",
          body: `
미국 박사 진짜 가고 싶은데
요즘은 준비해야 할 게 너무 많아서 막막하네요.

연구실적/추천서/컨택/영어/펀딩…
다들 어디서부터 정리하셨어요?

현실 조언 부탁드립니다.
`,
          createdAt: "2025-12-13",
          likeCount: 9,
          comments: [
            {
              id: asCommentId("1017"),
              author: { nickname: "익명", isAnonymous: true },
              content:
                "일단 분야 좁히고, 그 분야 톱 컨퍼런스 논문 20개부터 읽어봐요.",
              createdAt: "2025-12-13",
              likeCount: 10,
            },
          ],
        },

        // ===============================
        // 8) (추가) 도와줬다가 책잡힐 듯
        // ===============================
        {
          id: asPostId("109"),
          boardId: asBoardId("1"),
          author: { nickname: "익명", isAnonymous: true },
          title:
            "주변에 박사 유학 때문에 고민하는 사람 있는데, 괜히 도와줬다가 책 잡힐듯. 그냥 무시하는게 미덕이겠지?",
          preview: "조언해줘도 결국 내 탓 할 것 같아서 고민됨",
          body: `
주변에 박사 유학 때문에 고민하는 사람 있는데,
괜히 도와줬다가 나중에 안 풀리면 내가 뭐라 한 거로 책 잡힐까봐 고민입니다.

조언을 어디까지 해주는 게 적당할까요?
그냥 "정보는 여기" 정도만 던지고 거리 두는 게 맞겠죠?

비슷한 경험 있는 분들 어떻게 하셨나요.
`,
          createdAt: "2025-12-13",
          likeCount: 3,
          comments: [
            {
              id: asCommentId("1018"),
              author: { nickname: "익명3", isAnonymous: true },
              content:
                "정답 알려주려 하지 말고 옵션만 정리해주면 책 잡힐 확률 줄어요.",
              createdAt: "2025-12-13",
              likeCount: 12,
            },
            {
              id: asCommentId("1019"),
              author: { nickname: "익명2", isAnonymous: true },
              content:
                "결정은 본인이 하게 하고, '내가 아는 선에서' 라는 단서 꼭 붙이세요.",
              createdAt: "2025-12-13",
              likeCount: 9,
            },
          ],
        },
      ],
    },

    // =========================================
    // 자유게시판
    // =========================================
    {
      id: asBoardId("2"), // board-free
      categoryTitle: "자유게시판",
      title: "자유게시판",
      posts: [
        // ===============================
        // 0) moonlight_vocal - 당근마켓 사기 경험 공유 (정보글, 좋아요 낮음)
        // ===============================
        {
          id: asPostId("201"),
          boardId: asBoardId("2"),
          author: { nickname: "moonlight_vocal", isAnonymous: true },
          title: "당근마켓 사기 경험 공유 (진짜 조심하세요)",
          preview:
            "직거래로 안심했다가 당했음… 제가 겪은 흐름이랑 피하는 팁 적어봄",
          body: `
당근마켓 하다가 사기 비슷한 걸 처음 겪어서 공유합니다.

- 처음엔 친절하게 응대함
- '지금 급해서' / '대신 송금하면 가져다준다' 식으로 흐름 유도
- 계좌/번호 바뀌는 타이밍이 나오고
- 결정적으로 "쿨거래" 유도

결론: 직거래도 '장소/시간/신분확인/계좌명' 하나라도 이상하면 바로 빠져야 합니다.
저처럼 멘탈 흔들려서 급하게 결제하지 마세요... 내 스피커 ㅠㅠ
`,
          createdAt: "2025-12-12",
          likeCount: 8,
          comments: [
            {
              id: asCommentId("1020"),
              author: { nickname: "익명", isAnonymous: true },
              content: "이런 글이 진짜 도움됨… 나도 비슷하게 당할 뻔",
              createdAt: "2025-12-12",
              likeCount: 5,
            },
            {
              id: asCommentId("1021"),
              author: { nickname: "익명2", isAnonymous: true },
              content: "결론 마지막 줄 ㄹㅇ… 급하면 판단 흐려짐",
              createdAt: "2025-12-12",
              likeCount: 3,
            },
          ],
        },

        // ===============================
        // 1) anonymous - 계좌 공개 + 강남역 보자 글 (자극/관심글, 좋아요 높음)
        // ===============================
        {
          id: asPostId("202"),
          boardId: asBoardId("2"),
          author: { nickname: "익명", isAnonymous: true },
          title:
            "농협 123-1212-123456 이거 당근마켓 사기꾼이라는데 지금 강남역에서 보잔다 ㅋㅋㅋㅋㅋ 얼굴좀 보자",
          preview:
            "사기꾼 계좌라는데 본인이 강남역에서 보자고 함ㅋㅋㅋ 진짜 나오나?",
          body: `
유리은행 123-1212-123456
이거 당근마켓 사기꾼 계좌라던데,

지금 강남역에서 보잔다 ㅋㅋㅋㅋㅋ 저녁 7시에 강남역에서 보자는거부터 수상함
얼굴 좀 보자 ㅋㅋ
최근에 구속되었다는데 풀린건가? 구속 수사 절차 어떻게 되는거임?

`,
          createdAt: "2025-12-12",
          likeCount: 147,
          comments: [
            {
              id: asCommentId("1014"),
              author: { nickname: "익명2", isAnonymous: true },
              content: "와 이거 실화냐… 혹시 경찰 부르면 되는 거 아님?",
              createdAt: "2025-12-12",
              likeCount: 32,
            },
            {
              id: asCommentId("1015"),
              author: { nickname: "익명3", isAnonymous: true },
              content: "좌표 찍고 사람 몰리면 바로 튈 듯… 조심해요.",
              createdAt: "2025-12-12",
              likeCount: 41,
            },
            {
              id: asCommentId("1022"),
              author: { nickname: "익명4", isAnonymous: true },
              content:
                "구속영장 기각되면 나올 수는 있음. 근데 나오자마자 또 사기치는 건 ㅋㅋㅋㅋㅋㅋ ",
              createdAt: "2025-12-12",
              likeCount: 18,
            },
            {
              id: asCommentId("1023"),
              author: { nickname: "익명5", isAnonymous: true },
              content: "이런 건 캡쳐해서 경찰에 넘겨야지;;",
              createdAt: "2025-12-12",
              likeCount: 20,
            },
          ],
        },

        // ===============================
        // 2) 엄마 번호 몰라서 전화 못함 (가벼운 웃김, 좋아요 중간)
        // ===============================
        {
          id: asPostId("203"),
          boardId: asBoardId("2"),
          author: { nickname: "익명", isAnonymous: true },
          title:
            "아니 엄마한테 할 말있어서 전화 하고 싶은데 나 핸드폰 잃어버리고 폰 바꿔서서 엄마 전화번호를 몰라서 전화를 못하고 있음ㅋㅋㅋ",
          preview: "폰 바꿨더니 엄마 번호 기억 안 남…ㅋㅋ",
          body: `
아니 엄마한테 할 말있어서 전화 하고 싶은데
나 핸드폰 잃어버리고 폰 바꿔서서
엄마 전화번호를 몰라서 전화를 못하고 있음ㅋㅋㅋ
`,
          createdAt: "2025-12-15",
          likeCount: 63,
          comments: [
            {
              id: asCommentId("1024"),
              author: { nickname: "익1", isAnonymous: true },
              content: "아니 엄마 전화번호는 쫌 외워라",
              createdAt: "2025-12-15",
              likeCount: 14,
            },
            {
              id: asCommentId("1025"),
              author: { nickname: "글쓴이", isAnonymous: true },
              content: "평소에 전화할 일이 없는걸 어떡해 ㅋㅋㅋㅋ",
              createdAt: "2025-12-15",
              likeCount: 9,
            },
            {
              id: asCommentId("1026"),
              author: { nickname: "익2", isAnonymous: true },
              content: "아 근데 그럴만도 함…요즘에 누가 전화번호 외우고 다녀",
              createdAt: "2025-12-15",
              likeCount: 22,
            },
            {
              id: asCommentId("1027"),
              author: { nickname: "익3", isAnonymous: true },
              content: "이 정도면 가족에 관심 없는게 너무 심한거 아님?",
              createdAt: "2025-12-15",
              likeCount: 7,
            },
          ],
        },

        // ===============================
        // 3) 동생이 모르는 번호라 안 받음 (욕/자극 조금, 좋아요 높음)
        // ===============================
        {
          id: asPostId("204"),
          boardId: asBoardId("2"),
          author: { nickname: "익명", isAnonymous: true },
          title:
            "동생새끼한테 계속 전화했는데 안 받아서 나중에 물어봤는데 모르는 전화번호라서 안 받은거래 ㅋㅋㅋㅋ ㅁㅊㄴ 인가",
          preview: "번호 바뀐 걸 몰라서 동생이 씹었다 ㅋㅋㅋㅋ",
          body: `
동생새끼한테 계속 전화했는데 안 받아서
나중에 물어봤는데 모르는 전화번호라서 안 받은거래 ㅋㅋㅋㅋ
ㅁㅊㄴ 인가
`,
          createdAt: "2025-12-15",
          likeCount: 118,
          comments: [
            {
              id: asCommentId("1028"),
              author: { nickname: "익1", isAnonymous: true },
              content: "쓴이는 전화번호 저장해놓긴 함?",
              createdAt: "2025-12-15",
              likeCount: 16,
            },
            {
              id: asCommentId("1029"),
              author: { nickname: "글쓴이", isAnonymous: true },
              content: "난 이름 석자로 저장해둠 ㅋㅋㅋㅋ",
              createdAt: "2025-12-15",
              likeCount: 12,
            },
            {
              id: asCommentId("1030"),
              author: { nickname: "익2", isAnonymous: true },
              content: "친남매 인정이네 ㅋ",
              createdAt: "2025-12-15",
              likeCount: 25,
            },
            {
              id: asCommentId("1031"),
              author: { nickname: "익3", isAnonymous: true },
              content: "나도 누나 전화번호 저장도 안해둠",
              createdAt: "2025-12-15",
              likeCount: 8,
            },
            {
              id: asCommentId("1032"),
              author: { nickname: "익4", isAnonymous: true },
              content:
                "내 동생은 평소에 연락도 안하다가 용돈 모자라면 갑자기 카톡으로 애교부림",
              createdAt: "2025-12-15",
              likeCount: 19,
            },
          ],
        },

        // ===============================
        // 4) 엄마 임영웅 편돌이 썰 (밈/공감, 좋아요 중상)
        // ===============================
        {
          id: asPostId("205"),
          boardId: asBoardId("2"),
          author: { nickname: "익명", isAnonymous: true },
          title: "어제 개웃긴 썰 ㅋㅋㅋ",
          preview:
            "엄마가 임영웅 편의점 알바 얘기에 맘아파함… 근데 난 2년차 편돌이",
          body: `
울 엄마가 임영웅 팬인데  임영웅얘기 하다가 갑자기
임영웅이 무명시절에 편의점 알바했다는 얘기 듣고 엄청 맘아파 하더라…..

근데 난 2년차 편돌이임 ㅋㅋ
`,
          createdAt: "2025-12-14",
          likeCount: 92,
          comments: [
            {
              id: asCommentId("1033"),
              author: { nickname: "익1", isAnonymous: true },
              content:
                "ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ",
              createdAt: "2025-12-14",
              likeCount: 11,
            },
            {
              id: asCommentId("1034"),
              author: { nickname: "익2", isAnonymous: true },
              content: "임영웅은 인정이지",
              createdAt: "2025-12-14",
              likeCount: 14,
            },
          ],
        },

        // ===============================
        // 5) 아빠 감동문자 vs 대학원생 (반전/웃김, 좋아요 높음)
        // ===============================
        {
          id: asPostId("206"),
          boardId: asBoardId("2"),
          author: { nickname: "익명", isAnonymous: true },
          title: "아빠한테 개 감동적인 문자 받음",
          preview: "수능 화이팅 장문 받고 울었는데… 아빠 나 대학원생임",
          body: `
아빠가  갑자기 오늘 아침 장문으로 나한테
수능 화이팅해라 수능이 인생의 전부 아니다 막 이런거 보냈고 펑펑 움….

근데 아빠 나 대학원생임,
수능본지 5년도 더 되간다고요
`,
          createdAt: "2025-12-14",
          likeCount: 134,
          comments: [
            {
              id: asCommentId("1035"),
              author: { nickname: "익명1", isAnonymous: true },
              content:
                "이정도면 아빠가 메디컬 노려서 다시 수특 피라고 압박 주는거 아님??? ㅋㅋㅋㅋ",
              createdAt: "2025-12-14",
              likeCount: 33,
            },
            {
              id: asCommentId("1036"),
              author: { nickname: "익명2", isAnonymous: true },
              content: "늦어도 한참 많이 늦어셨네…ㅋㅋ",
              createdAt: "2025-12-14",
              likeCount: 21,
            },
            {
              id: asCommentId("1037"),
              author: { nickname: "익명3", isAnonymous: true },
              content: "아빠 폰에 아직도 수능 D-100 배경화면 해둔 듯 ㅠㅋㅋ",
              createdAt: "2025-12-14",
              likeCount: 17,
            },
          ],
        },

        // ===============================
        // 6) (추가) Yoon 피아노 학원 지하실 이상한 소리 (미스터리/자극, 좋아요 매우 높음)
        // ===============================
        {
          id: asPostId("207"),
          boardId: asBoardId("2"),
          author: { nickname: "익명", isAnonymous: true },
          title:
            "지금 Yoon 피아노 학원인데 지하실에서 이상한 소리 들림… 레슨실도 비어있고 뭐지?",
          preview:
            "원래 이 시간엔 레슨 있어서 피아노 소리 들리는데 오늘은 비어있고 지하에서 이상한 소리남…",
          body: `
지금 Yoon 피아노 학원인데
지하실에서 이상한 소리 들린다. 레슨실도 비어있고. 뭐지?

원래 이 시간에는 레슨 있어서 매번 피아노 소리가 들렸는데.

그냥 무시할까? 그게 좋겠지? 괜히 나까지.
`,
          createdAt: "2025-12-18",
          likeCount: 6,
          comments: [
            {
              id: asCommentId("1038"),
              author: { nickname: "익1", isAnonymous: true },
              content: "너 혼자임? 문 잠가… 그리고 나가 ㅈㅂ",
              createdAt: "2025-12-18",
              likeCount: 64,
            },
            {
              id: asCommentId("1039"),
              author: { nickname: "익2", isAnonymous: true },
              content: "무시가 맞는지 모르겠는데… 일단 사람 있는 곳으로 ㄱㄱ",
              createdAt: "2025-12-18",
              likeCount: 51,
            },
            {
              id: asCommentId("1040"),
              author: { nickname: "익3", isAnonymous: true },
              content: "관리자/원장한테 바로 연락하셈. 괜히 내려가지 말고",
              createdAt: "2025-12-18",
              likeCount: 48,
            },
            {
              id: asCommentId("1041"),
              author: { nickname: "익4", isAnonymous: true },
              content: "이거 ㄹㅇ 공포썰 각인데 후기 좀",
              createdAt: "2025-12-18",
              likeCount: 37,
            },
          ],
        },
        {
          id: asPostId("209"),
          boardId: asBoardId("2"),
          author: { nickname: "익명", isAnonymous: true },
          title: "아 화난다",
          preview:
            "피아노 레쓴쌤 오늘까지 유학 접수 마감인데 갑자기 전화 안받음",
          body: `
피아노 레쓴쌤 오늘까지 유학 접수 마감인데 갑자기 전화 안받음
뭐야 진짜 화난다
한국 시간 밤 11시 마감인데, 아까 저녁 8시부터 연락 아예 안되고 카톡도 안보네
`,
          createdAt: "2025-12-18",
          likeCount: 6,
          comments: [
            {
              id: asCommentId("1040"),
              author: { nickname: "익1", isAnonymous: true },
              content: "맡겨놨냐? 알아서 해",
              createdAt: "2025-12-18",
              likeCount: 64,
            },
            {
              id: asCommentId("1039"),
              author: { nickname: "익2", isAnonymous: true },
              content: "레슨 있는거 아님?",
              createdAt: "2025-12-18",
              likeCount: 51,
            },
            {
              id: asCommentId("1040"),
              author: { nickname: "익3", isAnonymous: true },
              content: "그걸 왜 에타에서 한탄함",
              createdAt: "2025-12-18",
              likeCount: 48,
            },
          ],
        },

        // ===============================
        // 7) (추가) Yoon 피아노 학원 명의도용 소문 (폭로/논란, 좋아요 매우 높음)
        // ===============================
        {
          id: asPostId("208"),
          boardId: asBoardId("2"),
          author: { nickname: "익명", isAnonymous: true },
          title:
            "요즘 Yoon 피아노 학원 소문 아는 사람? 샤입 3출 쪽인데 레슨쌤 명의도용했다는 얘기 돎",
          preview:
            "친구가 거기 다니는데 강력 의심 중이라 오늘 가서 떠본다 함… 말려야 하나?",
          body: `
요즘 Yoon 피아노 학원 알아? 샤입 3출에 있는거.

그거 레슨쌤 중 한명이 명의도용한걸로 지금 소문돌고 있음.
내 친구가 거기 다니는데 지금 강력하게 의심하고 있어서 오늘 가서 떠본다고 함.

말려야하나?
`,
          createdAt: "2025-12-18",
          likeCount: 1,
          comments: [
            {
              id: asCommentId("1042"),
              author: { nickname: "익1", isAnonymous: true },
              content:
                "이런 건 떠보지 말고 증거/기록 남기고 신고 루트로 가야함",
              createdAt: "2025-12-18",
              likeCount: 72,
            },
            {
              id: asCommentId("1043"),
              author: { nickname: "익2", isAnonymous: true },
              content: "샤입 3출 그 학원 맞음? 나도 그쪽 얘기 들은 적 있음",
              createdAt: "2025-12-18",
              likeCount: 55,
            },
            {
              id: asCommentId("1044"),
              author: { nickname: "익3", isAnonymous: true },
              content: "친구 혼자 보내지 마… 괜히 찍히면 위험할 수도",
              createdAt: "2025-12-18",
              likeCount: 49,
            },
            {
              id: asCommentId("1045"),
              author: { nickname: "익4", isAnonymous: true },
              content:
                "근데 명의도용이면 피해자가 따로 있을 텐데… 소문만으론 ㄴㄴ",
              createdAt: "2025-12-18",
              likeCount: 28,
            },
          ],
        },
      ],
    },
  ],
};
