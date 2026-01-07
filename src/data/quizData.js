const generateOptions = (correctAnswer, category, allAnswers) => {
  let options = [correctAnswer];
  const incorrectOptions = allAnswers.filter(ans => ans !== correctAnswer);

  // Randomly pick 2 incorrect options
  while (options.length < 3 && incorrectOptions.length > 0) {
    const randomIndex = Math.floor(Math.random() * incorrectOptions.length);
    options.push(incorrectOptions[randomIndex]);
    incorrectOptions.splice(randomIndex, 1); // Remove to avoid duplicates
  }

  // If there are fewer than 3 unique options, fill with generic fillers
  while (options.length < 3) {
    options.push(`다른 ${options.length + 1}번 보기`);
  }

  // Shuffle options
  return options.sort(() => Math.random() - 0.5);
};


const allQuizAnswers = {
  fish_marine: [
    "금붕어", "돌고래", "상어", "복어", "고래", "흰동가리", "펭귄", "전기뱀장어",
    "해마", "가오리", "불가사리", "문어", "오징어", "피라냐", "연어", "참치",
    "방어", "메기", "장어", "해파리",
    // Additional options for incorrect choices
    "물범", "바닷가재", "산호", "해삼", "말미잘", "다랑어", "청어", "멸치", "병어"
  ],
  animals: [
    "사자", "기린", "코끼리", "얼룩말", "하이에나", "판다", "호랑이", "원숭이",
    "뱀", "악어", "토끼", "다람쥐", "여우", "곰", "사슴", "하마", "낙타",
    "펭귄", "부엉이", "기니피그",
    // Additional options
    "늑대", "고릴라", "치타", "표범", "코뿔소", "캥거루", "고양이", "개", "말"
  ],
  insects: [
    "나비", "개미", "무당벌레", "잠자리", "매미", "메뚜기", "베짱이", "사마귀",
    "반딧불이", "물방개", "풍뎅이", "거미", "꿀벌", "말벌", "나방", "하루살이",
    "모기", "파리", "바퀴벌레", "진딧물",
    // Additional options
    "지렁이", "달팽이", "장수풍뎅이", "사슴벌레", "귀뚜라미", "전갈"
  ],
  dinosaurs: [
    "티라노사우루스", "트리케라톱스", "브라키오사우루스", "스테고사우루스", "벨로키랍토르",
    "파라사우롤로푸스", "안킬로사우루스", "프테라노돈", "딜로포사우루스", "스피노사우루스",
    "이구아노돈", "파키케팔로사우루스", "코리토사우루스", "알로사우루스", "콤프소그나투스",
    "마이아사우라", "카르노타우루스", "데이노니쿠스", "디플로도쿠스", "프로토케라톱스",
    // Additional options
    "갈리미무스", "테리지노사우루스", "모사사우루스", "크로노사우루스", "수코미무스"
  ]
};

const quizQuestions = [
  // Fish/Marine Animals Quiz (20 questions + some generated)
  {
    id: "fish_marine001", category: "fish_marine", difficulty: "easy",
    question: "금색으로 반짝이고 몸이 동글동글 작으며, 집에서 작은 어항에 많이 키우는 물고기는 무엇일까요?",
    answer: "금붕어",
  },
  {
    id: "fish_marine002", category: "fish_marine", difficulty: "easy",
    question: "물고기처럼 생겼지만 사실은 포유류이며, 아주 똑똑해서 사람과도 잘 지내고 점프를 잘 하는 동물은 무엇일까요?",
    answer: "돌고래",
  },
  {
    id: "fish_marine003", category: "fish_marine", difficulty: "medium",
    question: "바다에서 제일 무서운 동물 중 하나이며, 등에 뾰족한 지느러미가 있고 이빨이 아주 날카로운 동물은 무엇일까요?",
    answer: "상어",
  },
  {
    id: "fish_marine004", category: "fish_marine", difficulty: "easy",
    question: "위험하면 몸이 풍선처럼 빵빵 부풀고, 귀여운 겉모습과 달리 독이 있어서 조심해야 하는 물고기는 무엇일까요?",
    answer: "복어",
  },
  {
    id: "fish_marine005", category: "fish_marine", difficulty: "easy",
    question: "바다에서 제일 크며, 입으로 아주 작은 물고기와 플랑크톤을 많이 먹고, 등에 있는 구멍으로 물을 분수처럼 뿜는 동물은 무엇일까요?",
    answer: "고래",
  },
  {
    id: "fish_marine006", category: "fish_marine", difficulty: "easy",
    question: "주황색 몸에 흰 줄무늬가 있고, 영화 '니모를 찾아서'의 주인공이며, 말미잘 사이에 숨어 사는 물고기는 무엇일까요?",
    answer: "흰동가리",
  },
  {
    id: "fish_marine007", category: "fish_marine", difficulty: "easy",
    question: "검은색과 흰색 옷을 입은 것처럼 보이고, 하늘을 날지 못하지만 물속에서 아주 잘 헤엄치며, 남극처럼 추운 곳에 사는 동물은 무엇일까요?",
    answer: "펭귄",
  },
  {
    id: "fish_marine008", category: "fish_marine", difficulty: "medium",
    question: "길쭉해서 뱀처럼 생겼고, 몸에서 전기를 만들 수 있으며, 아마존강에 사는 물고기는 무엇일까요?",
    answer: "전기뱀장어",
  },
  {
    id: "fish_marine009", category: "fish_marine", difficulty: "easy",
    question: "머리가 말처럼 생겼고, 몸이 구부러져 있으며, 아빠가 배에 주머니를 가지고 아기를 지키는 동물은 무엇일까요?",
    answer: "해마",
  },
  {
    id: "fish_marine010", category: "fish_marine", difficulty: "medium",
    question: "몸이 넓고 납작하며, 날개처럼 보이는 지느러미로 헤엄치고, 어떤 종류는 꼬리에 독침이 있어서 조심해야 하는 동물은 무엇일까요?",
    answer: "가오리",
  },
  {
    id: "fish_marine011", category: "fish_marine", difficulty: "easy",
    question: "물고기는 아니고 바닷속 동물이며, 별 모양처럼 팔이 여러 개이고, 몸이 딱딱하고 천천히 움직이는 동물은 무엇일까요?",
    answer: "불가사리",
  },
  {
    id: "fish_marine012", category: "fish_marine", difficulty: "easy",
    question: "팔이 여덟 개이며, 잉크를 뿜어서 도망가고, 머리가 동그랗고 피부가 말랑말랑한 동물은 무엇일까요?",
    answer: "문어",
  },
  {
    id: "fish_marine013", category: "fish_marine", difficulty: "easy",
    question: "팔이 여러 개 있고 길쭉하며, 말려서 간식으로도 많이 먹고, 밤에 불빛을 비추면 많이 모여드는 동물은 무엇일까요?",
    answer: "오징어",
  },
  {
    id: "fish_marine014", category: "fish_marine", difficulty: "hard",
    question: "아마존강에 살며 이빨이 아주 날카롭고 세고, 작은 물고기지만 떼로 다니면 무섭다고 알려진 물고기는 무엇일까요?",
    answer: "피라냐",
  },
  {
    id: "fish_marine015", category: "fish_marine", difficulty: "medium",
    question: "바다에서 살다가 알을 낳을 때 강으로 올라오며, 분홍색 살을 가지고 있고, 초밥이나 구이로 자주 먹는 물고기는 무엇일까요?",
    answer: "연어",
  },
  {
    id: "fish_marine016", category: "fish_marine", difficulty: "medium",
    question: "몸이 크고 아주 빨리 헤엄치는 물고기이며, 통조림으로도 많이 먹고, 초밥집에서 빨간색 살로 자주 볼 수 있는 물고기는 무엇일까요?",
    answer: "참치",
  },
  {
    id: "fish_marine017", category: "fish_marine", difficulty: "medium",
    question: "길쭉한 몸에 은색과 푸른색이 섞여 있으며, 겨울에 특히 맛있다고 하고, 회로 많이 먹는 물고기는 무엇일까요?",
    answer: "방어",
  },
  {
    id: "fish_marine018", category: "fish_marine", difficulty: "easy",
    question: "입 옆에 긴 수염이 있고, 강이나 연못 같은 민물에 살며, 얼굴이 조금 우스꽝스럽게 생긴 물고기는 무엇일까요?",
    answer: "메기",
  },
  {
    id: "fish_marine019", category: "fish_marine", difficulty: "easy",
    question: "길쭉해서 뱀처럼 보이고, 미끌미끌한 몸을 가지고 있으며, 구이로 먹으면 아주 유명한 음식인 물고기는 무엇일까요?",
    answer: "장어",
  },
  {
    id: "fish_marine020", category: "fish_marine", difficulty: "easy",
    question: "몸이 반투명해서 안이 비치는 것처럼 보이고, 물속에서 말랑말랑 떠다니며, 어떤 종류는 촉수에 독이 있는 동물은 무엇일까요?",
    answer: "해파리",
  },
  { // AI Generated additional questions - Fish/Marine
    id: "fish_marine021", category: "fish_marine", difficulty: "easy",
    question: "딱딱한 등껍질을 가지고 있으며, 집게발이 두 개 있고 옆으로 기어다니는 바다 동물은 무엇일까요?",
    answer: "게",
  },
  {
    id: "fish_marine022", category: "fish_marine", difficulty: "easy",
    question: "모래 속에 몸을 숨기고 눈만 내밀고 있다가 먹이를 잡는 물고기는 무엇일까요?",
    answer: "가자미",
  },
  {
    id: "fish_marine023", category: "fish_marine", difficulty: "medium",
    question: "뾰족한 가시가 온몸에 나있고, 위험을 느끼면 몸을 웅크리는 바다 동물은 무엇일까요?",
    answer: "성게",
  },
  {
    id: "fish_marine024", category: "fish_marine", difficulty: "easy",
    question: "화려한 색깔의 옷을 입고 다니며, 따뜻한 바닷속 산호초에 사는 작은 물고기는 무엇일까요?",
    answer: "열대어",
  },
  // Animals Quiz (20 questions + some generated)
  {
    id: "animals001", category: "animals", difficulty: "easy",
    question: "목 주위에 큰 갈기가 있고, 아프리카 사바나에 살며, 동물의 왕이라고 불리는 동물은 무엇일까요?",
    answer: "사자",
  },
  {
    id: "animals002", category: "animals", difficulty: "easy",
    question: "목이 아주 길어서 나무 높은 곳의 잎을 먹고, 갈색과 노란색 얼룩무늬가 있는 동물은 무엇일까요?",
    answer: "기린",
  },
  {
    id: "animals003", category: "animals", difficulty: "easy",
    question: "코가 길게 튀어나와 있고, 몸이 아주 크고 무거우며, 큰 귀와 긴 상아가 있는 동물은 무엇일까요?",
    answer: "코끼리",
  },
  {
    id: "animals004", category: "animals", difficulty: "easy",
    question: "흰색과 검은색 줄무늬가 있고, 말처럼 생겼지만 무늬가 다르며, 아프리카에서 떼로 다니는 동물은 무엇일까요?",
    answer: "얼룩말",
  },
  {
    id: "animals005", category: "animals", difficulty: "medium",
    question: "개처럼 생겼지만 앞다리가 뒷다리보다 길어서 몸이 기울어져 보이고, 웃는 것 같은 특이한 소리로 우는 동물은 무엇일까요?",
    answer: "하이에나",
  },
  {
    id: "animals006", category: "animals", difficulty: "easy",
    question: "검은색과 흰색 털을 가지고 있고, 대나무를 주로 먹으며, 중국에 사는 곰은 무엇일까요?",
    answer: "판다",
  },
  {
    id: "animals007", category: "animals", difficulty: "medium",
    question: "주황색 몸에 검은 줄무늬가 있고, 큰 고양이과 동물이며, 산이나 숲에 살며 아주 힘이 센 동물은 무엇일까요?",
    answer: "호랑이",
  },
  {
    id: "animals008", category: "animals", difficulty: "easy",
    question: "손가락으로 물건을 잡을 수 있고, 꼬리가 있어서 나무를 잘 타며, 바나나를 좋아하는 동물은 무엇일까요?",
    answer: "원숭이",
  },
  {
    id: "animals009", category: "animals", difficulty: "medium",
    question: "다리가 전혀 없고, 몸을 구불구불 움직이며 기어 다니고, 어떤 종류는 독이 있어서 조심해야 하는 동물은 무엇일까요?",
    answer: "뱀",
  },
  {
    id: "animals010", category: "animals", difficulty: "medium",
    question: "입이 길고 이빨이 아주 날카로우며, 물속과 땅 위를 왔다 갔다 하고, 강이나 늪 근처에 사는 동물은 무엇일까요?",
    answer: "악어",
  },
  {
    id: "animals011", category: "animals", difficulty: "easy",
    question: "귀가 길게 쭉 올라와 있고, 앞니가 길며, 당근과 풀을 좋아하는 동물은 무엇일까요?",
    answer: "토끼",
  },
  // Insects Quiz
  {
    id: "insects001", category: "insects", difficulty: "easy",
    question: "날개가 아주 화려하고 예쁘며, 애벌레에서 번데기를 거쳐 하늘을 날아다니는 곤충은 무엇일까요?",
    answer: "나비",
  },
  {
    id: "insects002", category: "insects", difficulty: "easy",
    question: "줄을 지어 먹이를 옮기고, 땅속에 집을 짓고 사는 아주 부지런한 곤충은 무엇일까요?",
    answer: "개미",
  },
  {
    id: "insects003", category: "insects", difficulty: "easy",
    question: "빨간색 몸에 검은색 점무늬가 있고, 진딧물을 잡아먹는 고마운 곤충은 무엇일까요?",
    answer: "무당벌레",
  },
  {
    id: "insects004", category: "insects", difficulty: "easy",
    question: "커다란 눈과 네 개의 투명한 날개를 가졌으며, 헬리콥터처럼 공중에 멈춰 있을 수 있는 곤충은 무엇일까요?",
    answer: "잠자리",
  },
  {
    id: "insects005", category: "insects", difficulty: "easy",
    question: "더운 여름날 나무에 붙어 '맴맴' 소리를 내며 우는 곤충은 무엇일까요?",
    answer: "매미",
  },
  // Dinosaurs Quiz
  {
    id: "dinosaurs001", category: "dinosaurs", difficulty: "easy",
    question: "가장 무서운 육식 공룡이며, 날카로운 이빨과 강력한 턱을 가진 '폭군 도마뱀'은 누구일까요?",
    answer: "티라노사우루스",
  },
  {
    id: "dinosaurs002", category: "dinosaurs", difficulty: "easy",
    question: "코와 눈 위에 세 개의 뿔이 있고, 얼굴 주위에 넓은 방패 모양의 프릴이 있는 초식 공룡은 누구일까요?",
    answer: "트리케라톱스",
  },
  {
    id: "dinosaurs003", category: "dinosaurs", difficulty: "easy",
    question: "목과 꼬리가 아주 길어서 높은 나무의 잎을 먹을 수 있었던 커다란 초식 공룡은 누구일까요?",
    answer: "브라키오사우루스",
  },
  {
    id: "dinosaurs004", category: "dinosaurs", difficulty: "easy",
    question: "등에 커다란 오각형 판이 줄지어 있고, 꼬리에 뾰족한 가시가 달린 초식 공룡은 누구일까요?",
    answer: "스테고사우루스",
  },
  {
    id: "dinosaurs005", category: "dinosaurs", difficulty: "medium",
    question: "몸집은 작지만 아주 빠르고 똑똑하며, 발가락에 갈고리 같은 발톱이 있는 육식 공룡은 누구일까요?",
    answer: "벨로키랍토르",
  },
];

const processedQuizData = quizQuestions.map(q => {
  const categoryAnswers = allQuizAnswers[q.category] || [];
  const options = generateOptions(q.answer, q.category, categoryAnswers);
  const correctAnswerIndex = options.indexOf(q.answer);
  return {
    ...q,
    options,
    correctAnswerIndex
  };
});

export default processedQuizData;
