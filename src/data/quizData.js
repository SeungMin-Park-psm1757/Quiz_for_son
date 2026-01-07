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
    id: "fish_marine025", category: "fish_marine", difficulty: "easy",
    question: "바다의 보석이라 불리는 화려한 색깔의 동물로, 바위나 바닥에 붙어 살며 꽃처럼 예쁘게 생긴 것은 무엇일까요?",
    answer: "산호",
  },
  {
    id: "fish_marine026", category: "fish_marine", difficulty: "easy",
    question: "딱딱한 껍질 속에 부드러운 살이 있고, 진주를 만들기도 하는 바다 생물은 무엇일까요?",
    answer: "조개",
  },
  {
    id: "fish_marine027", category: "fish_marine", difficulty: "easy",
    question: "등에 딱딱한 집을 지고 느릿느릿 헤엄치며, 아주 오래 사는 바다의 신사 같은 동물은 누구일까요?",
    answer: "바다거북",
  },
  {
    id: "fish_marine028", category: "fish_marine", difficulty: "easy",
    question: "몸이 말랑말랑하고 다리가 10개이며, 먹물을 뿜고 아주 빨리 헤엄치는 바다 친구는 누구일까요?",
    answer: "오징어",
  },
  {
    id: "fish_marine029", category: "fish_marine", difficulty: "easy",
    question: "바닷속 바위 틈에 숨어 살며 길쭉한 몸을 가진, 미끌미끌하고 힘이 센 친구는 누구일까요?",
    answer: "곰치",
  },
  {
    id: "fish_marine030", category: "fish_marine", difficulty: "medium",
    question: "주둥이가 삐죽하게 튀어나와 있고 머리는 말과 비슷하며, 지느러미로 살랑살랑 헤엄치는 귀여운 친구는 누구일까요?",
    answer: "해마",
  },
  {
    id: "fish_marine031", category: "fish_marine", difficulty: "easy",
    question: "겨울 바다에서 잡히며, 까만 옷을 입고 헤엄치다가 땅 위에서는 아장아장 걷는 귀여운 새는 누구일까요?",
    answer: "펭귄",
  },
  {
    id: "fish_marine032", category: "fish_marine", difficulty: "easy",
    question: "입이 아주 크고 몸이 동그란 물고기로, 비늘이 없고 수염이 달린 민물의 왕은 누구일까요?",
    answer: "메기",
  },
  {
    id: "fish_marine033", category: "fish_marine", difficulty: "easy",
    question: "바다 밑바닥에 붙어 살며 몸이 투명하고 말랑말랑한, 숲속의 버섯처럼 생긴 친구는 누구일까요?",
    answer: "해파리",
  },
  {
    id: "fish_marine034", category: "fish_marine", difficulty: "easy",
    question: "몸이 아주 납작하고 마름모 모양이며, 꼬리에 독침이 있는 바다의 비행기 같은 친구는 누구일까요?",
    answer: "가오리",
  },
  {
    id: "fish_marine035", category: "fish_marine", difficulty: "medium",
    question: "차가운 바다에 살며 아주 커다란 송곳니가 있고, 수염이 난 할아버지처럼 생긴 친구는 누구일까요?",
    answer: "바다코끼리",
  },
  {
    id: "fish_marine036", category: "fish_marine", difficulty: "easy",
    question: "바다 위로 숨을 쉬러 나오며, 등에 있는 구멍으로 물을 슉~ 하고 뿜어내는 커다란 친구는 누구일까요?",
    answer: "고래",
  },
  {
    id: "fish_marine037", category: "fish_marine", difficulty: "easy",
    question: "주황색 몸에 하얀 줄무늬가 콕콕! 말미잘 친구와 함께 사는 아주 귀여운 물고기는 누구일까요?",
    answer: "흰동가리",
  },
  {
    id: "fish_marine038", category: "fish_marine", difficulty: "easy",
    question: "딱딱한 갈색 껍질을 가지고 있고, 집게발이 두 개! 옆으로 옆으로 기어가는 친구는 누구일까요?",
    answer: "게",
  },
  {
    id: "fish_marine039", category: "fish_marine", difficulty: "easy",
    question: "바닷속에서 별처럼 생긴 팔들을 움직이며 느릿느릿 기어가는 친구는 누구일까요?",
    answer: "불가사리",
  },
  {
    id: "fish_marine040", category: "fish_marine", difficulty: "medium",
    question: "몸이 길쭉하고 지느러미가 화려하며, 강한 전기를 찌릿찌릿 내뿜는 무서운 친구는 누구일까요?",
    answer: "전기뱀장어",
  },
  {
    id: "fish_marine041", category: "fish_marine", difficulty: "easy",
    question: "바다의 경찰관처럼 이빨이 무시무시하고, 지느러미가 뾰족하게 튀어나온 바다 최고의 사냥꾼은 누구일까요?",
    answer: "상어",
  },
  {
    id: "fish_marine042", category: "fish_marine", difficulty: "easy",
    question: "등이 푸른색이고 배는 하얀색이며, 떼를 지어 다니기를 좋아하는 아주 빠른 물고기는 누구일까요?",
    answer: "고등어",
  },
  {
    id: "fish_marine043", category: "fish_marine", difficulty: "medium",
    question: "모래 속에 쏙 숨어 있다가 눈만 빼꼼 내밀고 먹이를 기다리는 납작한 물고기는 누구일까요?",
    answer: "가자미",
  },
  {
    id: "fish_marine044", category: "fish_marine", difficulty: "easy",
    question: "머리에 검은색 먹물을 가득 담고 있고, 팔이 8개인 말랑말랑한 친구는 누구일까요?",
    answer: "문어",
  },
  {
    id: "fish_marine045", category: "fish_marine", difficulty: "medium",
    question: "강에서 살다가 자라면 바다로 나가고, 다시 알을 낳으러 강으로 돌아오는 용감한 물고기는 누구일까요?",
    answer: "연어",
  },
  {
    id: "fish_marine046", category: "fish_marine", difficulty: "easy",
    question: "몸이 둥글고 위험하면 공처럼 부풀어 올라서 가시를 세우는 물고기는 누구일까요?",
    answer: "복어",
  },
  {
    id: "fish_marine047", category: "fish_marine", difficulty: "medium",
    question: "바다의 신사라 불리는 고래로, 아주 긴 뿔 같은 엄니를 가지고 있는 친구는 누구일까요?",
    answer: "일각돌고래",
  },
  {
    id: "fish_marine048", category: "fish_marine", difficulty: "easy",
    question: "바닷가 돌 틈에 붙어 살며, 우툴두툴한 껍질 속에 맛있는 속살을 숨긴 친구는 누구일까요?",
    answer: "굴",
  },
  {
    id: "fish_marine049", category: "fish_marine", difficulty: "easy",
    question: "바닷속 물을 깨끗하게 해주는 친구로, 딱딱한 껍질이 있고 가끔 진주를 선물해주는 친구는 누구일까요?",
    answer: "진주조개",
  },
  {
    id: "fish_marine050", category: "fish_marine", difficulty: "medium",
    question: "몸 전체가 가시로 덮여 있어서 밤톨처럼 생긴 바다 생물은 누구일까요?",
    answer: "성게",
  },
  {
    id: "fish_marine051", category: "fish_marine", difficulty: "easy",
    question: "깊은 바닷속에서 스스로 빛을 내어 길을 밝히는 신기한 초롱을 가진 물고기는 누구일까요?",
    answer: "초롱아귀",
  },
  {
    id: "fish_marine052", category: "fish_marine", difficulty: "easy",
    question: "바닷가의 모래성 아래 숨어 살며, 길쭉한 몸과 단단한 집게를 가진 친구는 누구일까요?",
    answer: "갯가재",
  },
  {
    id: "fish_marine053", category: "fish_marine", difficulty: "medium",
    question: "머리에 망치처럼 생긴 혹이 달린 특이한 모양의 상어는 누구일까요?",
    answer: "귀상어",
  },
  {
    id: "fish_marine054", category: "fish_marine", difficulty: "easy",
    question: "바닷속 숲이라 불리는 해조류 사이를 헤엄치며 숨바꼭질을 잘 하는 초록색 물고기는 누구일까요?",
    answer: "쥐노래미",
  },
  {
    id: "fish_marine055", category: "fish_marine", difficulty: "easy",
    question: "길쭉한 코를 이용해 친구들과 장난치기를 좋아하는 지능 만점의 바다 친구는 누구일까요?",
    answer: "돌고래",
  },
  {
    id: "fish_marine056", category: "fish_marine", difficulty: "medium",
    question: "바다 사자라고도 불리며, 매끄러운 몸으로 헤엄도 잘 치고 소리도 크게 내는 친구는 누구일까요?",
    answer: "바다표범",
  },
  {
    id: "fish_marine057", category: "fish_marine", difficulty: "easy",
    question: "바다 식물인 것처럼 보이지만 사실은 동물인, 알록달록 색깔이 예쁜 친구는 누구일까요?",
    answer: "말미잘",
  },
  {
    id: "fish_marine058", category: "fish_marine", difficulty: "medium",
    question: "등에 커다란 지느러미가 돛처럼 솟아 있어서 아주 빠르게 헤엄치는 물고기는 누구일까요?",
    answer: "돛새치",
  },
  {
    id: "fish_marine059", category: "fish_marine", difficulty: "easy",
    question: "몸이 뱀처럼 아주 길고 미끌미끌해서 손으로 잡기 힘든 바다 친구는 누구일까요?",
    answer: "장어",
  },
  {
    id: "fish_marine060", category: "fish_marine", difficulty: "medium",
    question: "집을 등 위에 짊어지고 다니며, 빈 조개껍질을 찾아 들어가는 바다의 나그네는 누구일까요?",
    answer: "소라게",
  },
  // Animals Quiz Continued (Total 60 for Animals)
  {
    id: "animals012", category: "animals", difficulty: "easy",
    question: "몸에 갈색 반점이 있고 목이 아주 아주 길어서 나무 꼭대기 잎도 먹을 수 있는 친구는 누구일까요?",
    answer: "기린",
  },
  {
    id: "animals013", category: "animals", difficulty: "easy",
    question: "포동포동한 엉덩이를 흔들며 걷고, '꿀꿀' 소리를 내며 맛있는 음식을 좋아하는 친구는 누구일까요?",
    answer: "돼지",
  },
  {
    id: "animals014", category: "animals", difficulty: "easy",
    question: "하얀 털이 몽실몽실하고 '메에~' 하고 우는, 들판의 구름 같은 친구는 누구일까요?",
    answer: "양",
  },
  {
    id: "animals015", category: "animals", difficulty: "easy",
    question: "머리에 멋진 뿔이 달려 있고 아름다운 눈을 가진, 숲속의 요정 같은 친구는 누구일까요?",
    answer: "사슴",
  },
  {
    id: "animals016", category: "animals", difficulty: "easy",
    question: "배에 커다란 주머니가 있고, 뒷다리로 껑충껑충 뛰어서 아기를 태워주는 친구는 누구일까요?",
    answer: "캥거루",
  },
  {
    id: "animals017", category: "animals", difficulty: "medium",
    question: "등에 커다란 혹이 한 개 또는 두 개나 있고, 사막에서도 오랫동안 물 없이 살 수 있는 친구는 누구일까요?",
    answer: "낙타",
  },
  {
    id: "animals018", category: "animals", difficulty: "easy",
    question: "검은색 줄무늬가 몸 전체에 있고 아주 힘이 세며 '어흥!' 소리를 내는 무서운 친구는 누구일까요?",
    answer: "호랑이",
  },
  {
    id: "animals019", category: "animals", difficulty: "medium",
    question: "물이 있는 곳에 살며 입이 아주 아주 크고, 낮에는 물속에서 잠을 자는 커다란 친구는 누구일까요?",
    answer: "하마",
  },
  {
    id: "animals020", category: "animals", difficulty: "easy",
    question: "영리하고 나무를 아주 잘 타며, 가을이면 도토리와 밤을 모아서 숨겨두는 꼬리가 복슬복슬한 친구는 누구일까요?",
    answer: "다람쥐",
  },
  {
    id: "animals021", category: "animals", difficulty: "medium",
    question: "눈 주위가 까맣고 통통한 몸을 가진, 대나무를 아주 좋아하는 중국의 보물 같은 곰은 누구일까요?",
    answer: "판다",
  },
  {
    id: "animals022", category: "animals", difficulty: "easy",
    question: "사람과 가장 친하며, '멍멍!' 짖으며 집을 지켜주는 듬직한 친구는 누구일까요?",
    answer: "강아지",
  },
  {
    id: "animals023", category: "animals", difficulty: "easy",
    question: "살벌하게 높은 산 꼭대기 바위에 살며, 커다란 날개를 펴고 하늘 높이 날아다니는 새들의 왕은 누구일까요?",
    answer: "독수리",
  },
  {
    id: "animals024", category: "animals", difficulty: "easy",
    question: "긴 꼬리를 이용해서 나무 사이를 휙휙 건너다니고, 바나나를 제일 좋아하는 장난꾸러기 친구는 누구일까요?",
    answer: "원숭이",
  },
  {
    id: "animals025", category: "animals", difficulty: "medium",
    question: "몸에 흑백 줄무늬가 멋지게 그려진 말 친구로, 아프리카 들판을 달리는 친구는 누구일까요?",
    answer: "얼룩말",
  },
  {
    id: "animals026", category: "animals", difficulty: "medium",
    question: "북극에 살며 온몸이 하얀 털로 덮여 있는, 얼음 위에서도 잘 걷는 아주 커다란 곰은 누구일까요?",
    answer: "북극곰",
  },
  {
    id: "animals027", category: "animals", difficulty: "easy",
    question: "깜깜한 밤에 눈이 반짝이며 나무 위에 앉아 '부엉부엉' 하고 우는 밤의 사냥꾼은 누구일까요?",
    answer: "부엉이",
  },
  {
    id: "animals028", category: "animals", difficulty: "medium",
    question: "나무에 매달려 하루 종일 잠만 자고 아주 아주 느리게 움직이는, 게으름뱅이 친구는 누구일까요?",
    answer: "나무늘보",
  },
  {
    id: "animals029", category: "animals", difficulty: "easy",
    question: "주황색 털에 뾰족한 귀, 긴 꼬리를 가진 숲속의 지혜로운 꾀쟁이 친구는 누구일까요?",
    answer: "여우",
  },
  {
    id: "animals030", category: "animals", difficulty: "medium",
    question: "코 위에 커다란 뿔이 달려 있고 몸이 아주 단단한 가죽으로 덮여 있는, 힘이 센 친구는 누구일까요?",
    answer: "코뿔소",
  },
  {
    id: "animals031", category: "animals", difficulty: "easy",
    question: "풀을 뜯어 먹고 살며 '음매~' 하고 우는, 우리에게 맛있는 우유를 선물해주는 고마운 친구는 누구일까요?",
    answer: "젖소",
  },
  {
    id: "animals032", category: "animals", difficulty: "medium",
    question: "몸 전체가 가시로 덮여 있어서 적이 나타나면 공처럼 몸을 웅크리는 작고 귀여운 친구는 누구일까요?",
    answer: "고슴도치",
  },
  {
    id: "animals033", category: "animals", difficulty: "easy",
    question: "아침이면 '꼬꼬댁!' 하고 울어서 우리를 깨워주는, 벼슬이 달린 새 친구는 누구일까요?",
    answer: "닭",
  },
  {
    id: "animals034", category: "animals", difficulty: "medium",
    question: "호주에 살며 유칼립투스 잎을 먹고 잠자는 것을 좋아하는, 인형같이 귀여운 친구는 누구일까요?",
    answer: "코알라",
  },
  {
    id: "animals035", category: "animals", difficulty: "easy",
    question: "볏집 속에 집을 짓고 살며 '찍찍' 소리를 내는, 아주 작고 빠른 친구는 누구일까요?",
    answer: "쥐",
  },
  {
    id: "animals036", category: "animals", difficulty: "medium",
    question: "숲속에서 길을 잃은 사람들을 도와주기도 하고 길들여지면 사람을 잘 따르는 산 속의 개는 누구일까요?",
    answer: "늑대",
  },
  {
    id: "animals037", category: "animals", difficulty: "easy",
    question: "사람처럼 말하기도 하고 예쁜 색깔의 털을 가진, 흉내를 잘 내는 똑똑한 새는 누구일까요?",
    answer: "앵무새",
  },
  {
    id: "animals038", category: "animals", difficulty: "medium",
    question: "하늘을 날 수 있는 유일한 포유류로, 낮에는 동굴에 거꾸로 매달려 잠을 자는 친구는 누구일까요?",
    answer: "박쥐",
  },
  {
    id: "animals039", category: "animals", difficulty: "easy",
    question: "아름다운 꼬리 깃털을 부채처럼 활짝 펴서 뽐내기 좋아하는, 화려한 새 친구는 누구일까요?",
    answer: "공작",
  },
  {
    id: "animals040", category: "animals", difficulty: "medium",
    question: "진흙 목욕을 좋아하고 입이 삐죽하게 튀어나온 숲속의 용감한 친구는 누구일까요?",
    answer: "멧돼지",
  },
  {
    id: "animals041", category: "animals", difficulty: "medium",
    question: "물을 아주 좋아하고 수영을 잘 하며, 보들보들한 털을 가진 귀여운 강 속의 친구는 누구일까요?",
    answer: "수달",
  },
  {
    id: "animals042", category: "animals", difficulty: "easy",
    question: "봄이면 예쁘게 울고 부지런히 날아다니며 둥지를 짓는, 우리 주변에서 자주 보는 새는 누구일까요?",
    answer: "참새",
  },
  {
    id: "animals043", category: "animals", difficulty: "medium",
    question: "산 높은 곳에 살며 점프를 아주 잘 하고, 바위 위를 껑충껑충 뛰어다니는 친구는 누구일까요?",
    answer: "산양",
  },
  {
    id: "animals044", category: "animals", difficulty: "easy",
    question: "맛있는 벌꿀을 찾아다니며 '윙윙' 소리를 내고, 엉덩이에 침이 있는 노란색 친구는 누구일까요?",
    answer: "꿀벌",
  },
  {
    id: "animals045", category: "animals", difficulty: "medium",
    question: "겨울이면 동굴에서 아주 오랫동안 겨울잠을 자는, 덩치가 크고 힘이 센 사냥꾼은 누구일까요?",
    answer: "곰",
  },
  {
    id: "animals046", category: "animals", difficulty: "easy",
    question: "땅속에 터널을 파고 살며 눈이 잘 보이지 않지만 흙을 아주 잘 파는 친구는 누구일까요?",
    answer: "두더지",
  },
  {
    id: "animals047", category: "animals", difficulty: "medium",
    question: "사막의 여우라 불리며 아주 큰 귀를 가지고 있어서 소리를 잘 듣는 귀여운 친구는 누구일까요?",
    answer: "페넥여우",
  },
  {
    id: "animals048", category: "animals", difficulty: "easy",
    question: "나무 구멍 속에 살며 '딱딱딱' 나무를 쫄아 벌레를 잡아먹는 새는 누구일까요?",
    answer: "딱따구리",
  },
  {
    id: "animals049", category: "animals", difficulty: "medium",
    question: "숲속에서 밤에 활동하며 몸 전체가 단단한 비늘로 덮여 있는 개미핥기 친구는 누구일까요?",
    answer: "천산갑",
  },
  {
    id: "animals050", category: "animals", difficulty: "easy",
    question: "물 위를 둥둥 떠다니며 '꽥꽥' 하고 우는, 노란색 부리를 가진 귀여운 친구는 누구일까요?",
    answer: "오리",
  },
  {
    id: "animals051", category: "animals", difficulty: "medium",
    question: "아주 긴 코를 이용해 나뭇가지를 꺾기도 하고 물을 뿌리기도 하는 숲속의 거인은 누구일까요?",
    answer: "코끼리",
  },
  {
    id: "animals052", category: "animals", difficulty: "medium",
    question: "몸이 검고 아주 영리하며 반짝이는 것을 좋아하는, '까악까악' 우는 새 친구는 누구일까요?",
    answer: "까마귀",
  },
  {
    id: "animals053", category: "animals", difficulty: "easy",
    question: "들판을 아주 빨리 달릴 수 있고 사람이 탈 수 있는, 갈기가 멋진 친구는 누구일까요?",
    answer: "말",
  },
  {
    id: "animals054", category: "animals", difficulty: "medium",
    question: "바닷가 바위 위에서 떼를 지어 살며 꺽꺽 소리를 내는, 수영 천재인 친구는 누구일까요?",
    answer: "강아지물개",
  },
  {
    id: "animals055", category: "animals", difficulty: "easy",
    question: "검은색 연미복을 입은 것처럼 보이고 남극의 얼음 위를 아장아장 걷는 친구는 누구일까요?",
    answer: "펭귄",
  },
  {
    id: "animals056", category: "animals", difficulty: "medium",
    question: "숲속에서 아주 조용히 움직이며 밤에 사냥을 하는, 털이 부드러운 야생 고양이는 누구일까요?",
    answer: "스라소니",
  },
  {
    id: "animals057", category: "animals", difficulty: "easy",
    question: "강가 진흙 속에 집을 짓고 꼬리가 납작해서 수영을 아주 잘 하는 건축가 친구는 누구일까요?",
    answer: "비버",
  },
  {
    id: "animals058", category: "animals", difficulty: "medium",
    question: "남극 근처 바다에 살며 몸이 아주 크고 동그란 코를 가진 친구는 누구일까요?",
    answer: "코끼리물범",
  },
  {
    id: "animals059", category: "animals", difficulty: "easy",
    question: "가을이면 하늘 높이 날아서 따뜻한 곳으로 여행을 떠나는 아름다운 새 친구는 누구일까요?",
    answer: "기러기",
  },
  {
    id: "animals060", category: "animals", difficulty: "medium",
    question: "나무 구멍 속에 사과나 배를 보관하며 도토리를 좋아하는 숲속의 귀염둥이는 누구일까요?",
    answer: "청가뢰",
  },
  {
    id: "dinosaurs006", category: "dinosaurs", difficulty: "medium",
    question: "머리 뒤쪽으로 아주 커다란 구멍이 뚫린 프릴이 있고, 세 개의 뿔을 가진 트리케라톱스의 친구는 누구일까요?",
    answer: "카스모사우루스",
  },
  {
    id: "dinosaurs007", category: "dinosaurs", difficulty: "easy",
    question: "박치기 왕으로 유명하며, 머리 뼈가 아주 두껍고 둥글게 솟아오른 공룡은 누구일까요?",
    answer: "파키케팔로사우루스",
  },
  {
    id: "dinosaurs008", category: "dinosaurs", difficulty: "medium",
    question: "꼬리 끝에 아주 무거운 뼈 뭉치가 달려 있어서 무기로 사용하는 단단한 갑옷 공룡은 누구일까요?",
    answer: "안킬로사우루스",
  },
  {
    id: "dinosaurs009", category: "dinosaurs", difficulty: "medium",
    question: "머리에 길쭉한 볏이 솟아 있고, 그 볏을 통해 소리를 내어 친구들과 대화하던 공룡은 누구일까요?",
    answer: "파라사우롤로푸스",
  },
  {
    id: "dinosaurs010", category: "dinosaurs", difficulty: "easy",
    question: "하늘을 날아다니던 아주 커다란 날개를 가진 익룡으로, 물고기를 잡아먹던 친구는 누구일까요?",
    answer: "프테라노돈",
  },
  {
    id: "dinosaurs011", category: "dinosaurs", difficulty: "medium",
    question: "바다 속에서 살던 무시무시한 공룡으로, 아주 큰 입과 날카로운 이빨을 가진 바다의 왕은 누구일까요?",
    answer: "모사사우루스",
  },
  {
    id: "dinosaurs012", category: "dinosaurs", difficulty: "easy",
    question: "등에 커다란 돛 모양의 돌기가 솟아 있고, 물속과 땅 위를 오가며 사냥하던 육식 공룡은 누구일까요?",
    answer: "스피노사우루스",
  },
  {
    id: "dinosaurs013", category: "dinosaurs", difficulty: "medium",
    question: "타조처럼 생겼으며 아주 빠르게 달릴 수 있고, 부리가 있는 날씬한 공룡은 누구일까요?",
    answer: "갈리미무스",
  },
  {
    id: "dinosaurs014", category: "dinosaurs", difficulty: "medium",
    question: "엄지손가락에 아주 날카롭고 커다란 가시가 달려 있어서 자신을 보호하던 초식 공룡은 누구일까요?",
    answer: "이구아노돈",
  },
  {
    id: "dinosaurs015", category: "dinosaurs", difficulty: "medium",
    question: "머리에 커다란 볏이 두 개가 나 있고 독을 뿜는 것으로 알려진(영화에서!) 무서운 공룡은 누구일까요?",
    answer: "딜로포사우루스",
  },
  {
    id: "dinosaurs016", category: "dinosaurs", difficulty: "easy",
    question: "목이 아주 길고 몸집이 산처럼 커서 땅을 울리며 걷던 초식 공룡의 대장은 누구일까요?",
    answer: "아파토사우루스",
  },
  {
    id: "dinosaurs017", category: "dinosaurs", difficulty: "medium",
    question: "티라노사우루스보다 덩치는 작지만 아주 사납고 날카로운 이빨을 가진 육식 공룡은 누구일까요?",
    answer: "알로사우루스",
  },
  {
    id: "dinosaurs018", category: "dinosaurs", difficulty: "easy",
    question: "머리 위에 도끼처럼 생긴 커다란 뼈가 솟아 있는 신기한 모양의 초식 공룡은 누구일까요?",
    answer: "코리토사우루스",
  },
  {
    id: "dinosaurs019", category: "dinosaurs", difficulty: "medium",
    question: "목 주위에 뾰족뾰족한 가시가 달린 프릴을 가진, 트리케라톱스의 친척 공룡은 누구일까요?",
    answer: "스티라코사우루스",
  },
  {
    id: "dinosaurs020", category: "dinosaurs", difficulty: "medium",
    question: "지구상에 살았던 동물 중 가장 긴 목을 가졌다고 알려진 초대형 초식 공룡은 누구일까요?",
    answer: "마멘키사우루스",
  },
  {
    id: "dinosaurs021", category: "dinosaurs", difficulty: "easy",
    question: "몸 전체가 깃털로 덮여 있었을 것으로 추측되는, 새의 조상과 비슷한 공룡은 누구일까요?",
    answer: "시조새",
  },
  {
    id: "dinosaurs022", category: "dinosaurs", difficulty: "medium",
    question: "머리에 황소 같은 뿔이 두 개 달려 있는 육식 공룡은 누구일까요?",
    answer: "카르노타우루스",
  },
  {
    id: "dinosaurs023", category: "dinosaurs", difficulty: "easy",
    question: "코 위에 뿔이 한 개 있고 덩치가 큰 초식 공룡은 누구일까요?",
    answer: "켄트로사우루스",
  },
  {
    id: "dinosaurs024", category: "dinosaurs", difficulty: "medium",
    question: "아주 긴 앞발톱을 가졌으며 식물을 긁어 모아 먹던 신기한 모양의 초식 공룡은 누구일까요?",
    answer: "테리지노사우루스",
  },
  {
    id: "dinosaurs025", category: "dinosaurs", difficulty: "easy",
    question: "바다 속에서 네 개의 지느러미 발을 저으며 헤엄치던 장경룡은 누구일까요?",
    answer: "엘라스모사우루스",
  },
  {
    id: "dinosaurs026", category: "dinosaurs", difficulty: "medium",
    question: "머리 뒤로 아주 긴 뼈가 튀어나와 있는 특이한 모양의 익룡은 누구일까요?",
    answer: "닉토사우루스",
  },
  {
    id: "dinosaurs027", category: "dinosaurs", difficulty: "easy",
    question: "'착한 엄마 공룡'이라는 뜻의 이름을 가졌으며 새끼를 정성껏 돌본 공룡은 누구일까요?",
    answer: "마이아사우라",
  },
  {
    id: "dinosaurs028", category: "dinosaurs", difficulty: "medium",
    question: "몸집은 작지만 아주 날카로운 발톱을 가졌으며 무리 지어 사냥하던 영리한 공룡은 누구일까요?",
    answer: "데이노니쿠스",
  },
  {
    id: "dinosaurs029", category: "dinosaurs", difficulty: "easy",
    question: "등에 달린 여덟 개의 오각형 판이 특징인 초식 공룡 스테고사우루스의 친구는 누구일까요?",
    answer: "헤스페로사우루스",
  },
  {
    id: "dinosaurs030", category: "dinosaurs", difficulty: "medium",
    question: "악어처럼 생긴 머리와 거대한 몸집을 가진 백악기의 무서운 수중 공룡은 누구일까요?",
    answer: "사르코수쿠스",
  },
  {
    id: "dinosaurs031", category: "dinosaurs", difficulty: "easy",
    question: "타조보다 훨씬 빠르고 날씬한 몸을 가진 겁쟁이 공룡은 누구일까요?",
    answer: "오르니토미무스",
  },
  {
    id: "dinosaurs032", category: "dinosaurs", difficulty: "medium",
    question: "머리에 커다란 구멍이 여러 개 뚫린 해골 모양의 머리 뼈를 가진 육식 공룡은 누구일까요?",
    answer: "기가노토사우루스",
  },
  {
    id: "dinosaurs033", category: "dinosaurs", difficulty: "easy",
    question: "트리케라톱스처럼 생겼지만 뿔이 아주 작고 프릴이 넓은 공룡은 누구일까요?",
    answer: "프로토케라톱스",
  },
  {
    id: "dinosaurs034", category: "dinosaurs", difficulty: "medium",
    question: "발가락에 낫처럼 구부러진 아주 큰 발톱을 가졌으며 아주 빠르게 뛰던 공룡은 누구일까요?",
    answer: "우타랍토르",
  },
  {
    id: "dinosaurs035", category: "dinosaurs", difficulty: "easy",
    question: "목이 아주 길고 꼬리 끝에 채찍 같은 가시가 달린 공룡은 누구일까요?",
    answer: "디플로도쿠스",
  },
  {
    id: "dinosaurs036", category: "dinosaurs", difficulty: "medium",
    question: "머리뼈가 방석처럼 넓고 끝이 뾰족한 익룡으로, 지상에서 네 발로 걷기도 했다고 알려진 친구는 누구일까요?",
    answer: "케찰코아틀루스",
  },
  {
    id: "dinosaurs037", category: "dinosaurs", difficulty: "easy",
    question: "몸 주위에 아주 단단한 가시가 가득 나 있는 갑옷 공룡 안킬로사우루스의 사촌은 누구일까요?",
    answer: "에드몬토니아",
  },
  {
    id: "dinosaurs038", category: "dinosaurs", difficulty: "medium",
    question: "머리에 하트 모양의 신기한 뼈가 솟아 있는 초식 공룡은 누구일까요?",
    answer: "람베오사우루스",
  },
  {
    id: "dinosaurs039", category: "dinosaurs", difficulty: "easy",
    question: "티라노사우루스의 조상님 격으로, 몸집은 조금 작지만 아주 사나웠던 육식 공룡은 누구일까요?",
    answer: "다스플레토사우루스",
  },
  {
    id: "dinosaurs040", category: "dinosaurs", difficulty: "medium",
    question: "코 위에 아주 작은 뿔이 있고 앞다리가 꽤 길었던 육식 공룡은 누구일까요?",
    answer: "케라토사우루스",
  },
  {
    id: "dinosaurs041", category: "dinosaurs", difficulty: "easy",
    question: "공룡 세계의 앵무새라 불리며 부리가 있고 깃털이 있었을 것으로 추측되는 공룡은 누구일까요?",
    answer: "프시타코사우루스",
  },
  {
    id: "dinosaurs042", category: "dinosaurs", difficulty: "medium",
    question: "머리 뒤쪽 프릴에 구부러진 가시가 여러 개 달린 화려한 공룡은 누구일까요?",
    answer: "에이니오사우루스",
  },
  {
    id: "dinosaurs043", category: "dinosaurs", difficulty: "easy",
    question: "가장 오래된 공룡 중 하나로, 몸집이 작고 뒷다리로 아주 빨리 뛰던 친구는 누구일까요?",
    answer: "에오랍토르",
  },
  {
    id: "dinosaurs044", category: "dinosaurs", difficulty: "medium",
    question: "머리가 아주 높게 솟아 있고 콧구멍이 머리 꼭대기에 있던 커다란 초식 공룡은 누구일까요?",
    answer: "브라키오사우루스",
  },
  {
    id: "dinosaurs045", category: "dinosaurs", difficulty: "easy",
    question: "바다 속의 상어처럼 생긴 날렵한 몸을 가진 어룡은 누구일까요?",
    answer: "이크티오사우루스",
  },
  {
    id: "dinosaurs046", category: "dinosaurs", difficulty: "medium",
    question: "앞발에 아주 긴 갈고리 발톱이 있고 깃털이 풍성했던 신기한 육식 공룡은 누구일까요?",
    answer: "트로오돈",
  },
  {
    id: "dinosaurs047", category: "dinosaurs", difficulty: "easy",
    question: "머리에 커다란 방패 같은 프릴이 있고 뿔이 없는 대신 코 위가 울퉁불퉁한 공룡은 누구일까요?",
    answer: "파키리노사우루스",
  },
  {
    id: "dinosaurs048", category: "dinosaurs", difficulty: "medium",
    question: "몸 옆면에 긴 가시가 튀어나와 있는 무서운 갑옷 공룡은 누구일까요?",
    answer: "가스토니아",
  },
  {
    id: "dinosaurs049", category: "dinosaurs", difficulty: "easy",
    question: "공룡들의 알을 훔쳐먹는다고 오해받았던(사실은 자기 알을 지키던!) 영리한 공룡은 누구일까요?",
    answer: "오비랍토르",
  },
  {
    id: "dinosaurs050", category: "dinosaurs", difficulty: "medium",
    question: "머리에 v자 모양의 신기한 볏이 달린 익룡은 누구일까요?",
    answer: "타페야라",
  },
  {
    id: "dinosaurs051", category: "dinosaurs", difficulty: "easy",
    question: "목이 아주 길고 뱀 같은 머리를 가진 바다 속의 파충류는 누구일까요?",
    answer: "플레시오사우루스",
  },
  {
    id: "dinosaurs052", category: "dinosaurs", difficulty: "medium",
    question: "등에 난 혹 같은 돌기가 특징인 벨로키랍토르의 친척 공룡은 누구일까요?",
    answer: "콘카베나토르",
  },
  {
    id: "dinosaurs053", category: "dinosaurs", difficulty: "easy",
    question: "머리 위에 둥근 헬멧 같은 볏이 있는 오리부리 공룡은 누구일까요?",
    answer: "힙실로포돈",
  },
  {
    id: "dinosaurs054", category: "dinosaurs", difficulty: "medium",
    question: "꼬리 끝에 아주 무거운 가시 뭉치가 달려 있는 단단한 공룡은 누구일까요?",
    answer: "유오플로케팔루스",
  },
  {
    id: "dinosaurs055", category: "dinosaurs", difficulty: "easy",
    question: "티라노사우루스처럼 사나운 육식 공룡 중에서 팔이 아주 짧고 덩치가 컸던 친구는 누구일까요?",
    answer: "타르보사우루스",
  },
  {
    id: "dinosaurs056", category: "dinosaurs", difficulty: "medium",
    question: "머리 뒤쪽 프릴이 아주 넓고 화려한 무늬가 있었던 초식 공룡은 누구일까요?",
    answer: "펜타케라톱스",
  },
  {
    id: "dinosaurs057", category: "dinosaurs", difficulty: "easy",
    question: "타조처럼 생겼지만 아주 사나운 눈매를 가진 빠른 거위 공룡은 누구일까요?",
    answer: "안세리미무스",
  },
  {
    id: "dinosaurs058", category: "dinosaurs", difficulty: "medium",
    question: "머리가 아주 크고 앞다리가 발달한 백악기의 사나운 수중 파충류는 누구일까요?",
    answer: "틸로사우루스",
  },
  {
    id: "dinosaurs059", category: "dinosaurs", difficulty: "easy",
    question: "가장 먼저 발견된 공룡 중 하나로, 아주 날카로운 이빨을 가진 육식 공룡은 누구일까요?",
    answer: "메갈로사우루스",
  },
  {
    id: "dinosaurs060", category: "dinosaurs", difficulty: "medium",
    question: "머리 뒤로 아주 긴 가시 같은 볏이 하나 달려 있는 신기한 모양의 익룡은 누구일까요?",
    answer: "아준다르쿠",
  },
  // Insects Quiz Expansion (need 55 more for 60)
  {
    id: "insects006", category: "insects", difficulty: "medium",
    question: "배 끝에 독침이 있고 노란색과 검은색 줄무늬 옷을 입은, 꿀을 모으는 친구는 누구일까요?",
    answer: "꿀벌",
  },
  {
    id: "insects007", category: "insects", difficulty: "easy",
    question: "머리에 아주 커다란 집게 같은 뿔이 달려 있는, 숲속에서 가장 힘이 센 곤충은 누구일까요?",
    answer: "사슴벌레",
  },
  {
    id: "insects008", category: "insects", difficulty: "easy",
    question: "등껍질이 아주 단단하고 머리에 커다란 뿔이 하나 우뚝 솟아 있는 곤충의 왕은 누구일까요?",
    answer: "장수풍뎅이",
  },
  {
    id: "insects009", category: "insects", difficulty: "medium",
    question: "두 개의 낫 같은 앞다리를 들고 기도를 하는 것처럼 보이는, 숲속의 사냥꾼은 누구일까요?",
    answer: "사마귀",
  },
  {
    id: "insects010", category: "insects", difficulty: "easy",
    question: "밤하늘에 예쁜 불빛을 반짝이며 날아다니는, 꼬리에서 빛이 나는 곤충은 누구일까요?",
    answer: "반딧불이",
  },
  {
    id: "insects011", category: "insects", difficulty: "medium",
    question: "똥을 동그랗게 굴려서 집으로 가져가는 부지런한 곤충은 누구일까요?",
    answer: "소똥구리",
  },
  {
    id: "insects012", category: "insects", difficulty: "easy",
    question: "뒷다리가 아주 길어서 껑충껑충 멀리 뛸 수 있고, 가을이면 풀밭에서 소리를 내는 친구는 누구일까요?",
    answer: "메뚜기",
  },
  {
    id: "insects013", category: "insects", difficulty: "medium",
    question: "물 위를 미끄러지듯이 아주 빨리 걸어 다닐 수 있는 신기한 다리를 가진 곤충은 누구일까요?",
    answer: "소금쟁이",
  },
  {
    id: "insects014", category: "insects", difficulty: "easy",
    question: "사람을 윙윙 따라다니며 피를 빨아먹고 간지럽게 만드는 여름의 불청객은 누구일까요?",
    answer: "모기",
  },
  {
    id: "insects015", category: "insects", difficulty: "medium",
    question: "아주 무서운 독침을 가졌고 집을 크게 짓는, 벌 중에서 가장 덩치가 큰 친구는 누구일까요?",
    answer: "말벌",
  },
  {
    id: "insects016", category: "insects", difficulty: "easy",
    question: "가을 밤에 '귀뚤귀뚤' 아름다운 노래를 부르는 곤충 음악가는 누구일까요?",
    answer: "귀뚜라미",
  },
  {
    id: "insects017", category: "insects", difficulty: "medium",
    question: "잎사귀 뒤에 숨어 살며 단맛이 나는 물을 내보내 개미와 친한 작은 벌레는 누구일까요?",
    answer: "진딧물",
  },
  {
    id: "insects018", category: "insects", difficulty: "easy",
    question: "땅 속에 집을 아주 크고 복잡하게 짓고 여왕님을 모시고 사는 부지런한 친구는 누구일까요?",
    answer: "개미",
  },
  {
    id: "insects019", category: "insects", difficulty: "medium",
    question: "나뭇가지와 똑같이 생겨서 눈을 크게 뜨고 찾아야 보이는, 변신의 천재는 누구일까요?",
    answer: "대나무벌레",
  },
  {
    id: "insects020", category: "insects", difficulty: "easy",
    question: "음식 주변을 윙윙 날아다니며 빨대 같은 입으로 음식을 먹는 아주 빠른 날림보는 누구일까요?",
    answer: "파리",
  },
  {
    id: "insects021", category: "insects", difficulty: "medium",
    question: "모래 속에 깔때기 모양의 구멍을 파고 개미가 빠지기를 기다리는 무서운 친구는 누구일까요?",
    answer: "개미귀신",
  },
  {
    id: "insects022", category: "insects", difficulty: "easy",
    question: "물을 아주 깨끗하게 해주는 친구로, 딱딱한 껍질 속에 숨어 사는 바다의 벼룩은 누구일까요?",
    answer: "물벼룩",
  },
  {
    id: "insects023", category: "insects", difficulty: "medium",
    question: "커다란 날개를 활짝 펴고 밤에 불빛을 찾아 날아드는, 나비와 비슷하게 생긴 친구는 누구일까요?",
    answer: "나방",
  },
  {
    id: "insects024", category: "insects", difficulty: "easy",
    question: "줄을 지어 먹이를 나르는 검은색 작은 친구들, 힘이 아주 센 곤충은 누구일까요?",
    answer: "일개미",
  },
  {
    id: "insects025", category: "insects", difficulty: "medium",
    question: "물 속에서 살며 아주 날카로운 입으로 물고기를 공격하기도 하는 무서운 수중 곤충은 누구일까요?",
    answer: "물장군",
  },
  {
    id: "insects026", category: "insects", difficulty: "easy",
    question: "더운 여름 나무 위에서 아주 큰 소리로 하루 종일 우는 노래 대장은 누구일까요?",
    answer: "매미",
  },
  {
    id: "insects027", category: "insects", difficulty: "medium",
    question: "풀숲 사이에 거미줄을 치고 먹이가 걸리기를 기다리는 여덟 계 다리의 사냥꾼은 누구일까요?",
    answer: "거미",
  },
  {
    id: "insects028", category: "insects", difficulty: "easy",
    question: "나풀나풀 꽃 사이를 날아다니며 꿀을 빨아먹는 날개가 예쁜 곤충은 누구일까요?",
    answer: "호랑나비",
  },
  {
    id: "insects029", category: "insects", difficulty: "medium",
    question: "땅 속에서 아주 오랫동안 살다가 밖으로 나와 하루만 살고 간다는 슬픈 이야기를 가진 곤충은 누구일까요?",
    answer: "하루살이",
  },
  {
    id: "insects030", category: "insects", difficulty: "easy",
    question: "화려한 무늬가 있고 집단으로 생활하며 숲속의 환경을 지키는 곤충은 누구일까요?",
    answer: "풍뎅이",
  },
  {
    id: "insects031", category: "insects", difficulty: "medium",
    question: "흙 속에서 살며 식물의 뿌리를 먹기도 하는, 딱딱한 껍질을 가진 곤충의 애벌레는 누구일까요?",
    answer: "굼벵이",
  },
  {
    id: "insects032", category: "insects", difficulty: "easy",
    question: "숲속의 청소부라 불리며 죽은 동물을 깨끗하게 치워주는 고마운 곤충은 누구일까요?",
    answer: "송장벌레",
  },
  {
    id: "insects033", category: "insects", difficulty: "medium",
    question: "비가 오기 전에 떼를 지어 아주 낮게 날아다니는, 비 예보를 해주는 곤충은 누구일까요?",
    answer: "잠자리",
  },
  {
    id: "insects034", category: "insects", difficulty: "easy",
    question: "아주 긴 다리를 가졌으며 집 안 구석에 숨어 사는 작고 빠른 벌레는 누구일까요?",
    answer: "그리마",
  },
  {
    id: "insects035", category: "insects", difficulty: "medium",
    question: "누에고치에서 뽑아낸 실로 비단옷을 만들 수 있게 해주는 고마운 곤충은 누구일까요?",
    answer: "누에나방",
  },
  {
    id: "insects036", category: "insects", difficulty: "easy",
    question: "물방울처럼 몸이 둥글고 물 표면을 빙글빙글 돌며 헤엄치는 곤충은 누구일까요?",
    answer: "물방개",
  },
  {
    id: "insects037", category: "insects", difficulty: "medium",
    question: "커다란 귀를 가진 것처럼 소리를 잘 듣고 밤에 '베짱베짱' 우는 게으름쟁이 곤충은 누구일까요?",
    answer: "베짱이",
  },
  {
    id: "insects038", category: "insects", difficulty: "easy",
    question: "나무 껍질과 비슷한 색깔로 몸을 숨기고 나무 진액을 빨아먹고 사는 곤충은 누구일까요?",
    answer: "하늘소",
  },
  {
    id: "insects039", category: "insects", difficulty: "medium",
    question: "모래 속에 구멍을 파고 살며 입이 아주 무시무시하게 생긴 개미의 천적은 누구일까요?",
    answer: "명주잠자리애벌레",
  },
  {
    id: "insects040", category: "insects", difficulty: "easy",
    question: "아름다운 날개 짓을 하며 짝을 찾아 다니는 숲속의 공주님 같은 곤충은 누구일까요?",
    answer: "배추흰나비",
  },
  {
    id: "insects041", category: "insects", difficulty: "medium",
    question: "물 밑 모래 속에 숨어 있다가 물고기를 잡아먹는 아주 사나운 수중 생물은 누구일까요?",
    answer: "게아재비",
  },
  {
    id: "insects042", category: "insects", difficulty: "easy",
    question: "검은색과 노란색의 무서운 무늬를 가졌으며 침이 아주 강력한 숲속의 깡패는 누구일까요?",
    answer: "장수말벌",
  },
  {
    id: "insects043", category: "insects", difficulty: "medium",
    question: "겨울에도 죽지 않고 바위 틈에서 추위를 견디는 아주 생명력이 강한 곤충은 누구일까요?",
    answer: "좀",
  },
  {
    id: "insects044", category: "insects", difficulty: "easy",
    question: "배 끝에 달린 작고 귀여운 등이 밤마다 반짝이는 숲속의 가로등은 무엇일까요?",
    answer: "개똥벌레",
  },
  {
    id: "insects045", category: "insects", difficulty: "medium",
    question: "나비처럼 보이지만 낮에 활동하는 사나운 성격을 가진 나방의 한 종류는 무엇일까요?",
    answer: "검정나방",
  },
  {
    id: "insects046", category: "insects", difficulty: "easy",
    question: "빨간 코트 위에 검은 점무늬가 있는, 진딧물을 먹는 고마운 숲속의 친구는 누구일까요?",
    answer: "칠성무당벌레",
  },
  {
    id: "insects047", category: "insects", difficulty: "medium",
    question: "물 속에서도 공기 방울을 매달고 숨을 쉬며 헤엄치는 신기한 곤충은 누구일까요?",
    answer: "소금쟁이친구",
  },
  {
    id: "insects048", category: "insects", difficulty: "easy",
    question: "커다란 낫을 든 사마귀 중에서 무늬가 화려하고 사나운 친구는 누구일까요?",
    answer: "왕사마귀",
  },
  {
    id: "insects049", category: "insects", difficulty: "medium",
    question: "숲속 나무 진액을 먹으려고 장수풍뎅이와 싸우기도 하는 턱이 긴 친구는 누구일까요?",
    answer: "왕사슴벌레",
  },
  {
    id: "insects050", category: "insects", difficulty: "easy",
    question: "꿀을 찾아 아주 먼 길을 여행하는 노란색과 검은색의 부지런한 여행가는 누구일까요?",
    answer: "재래꿀벌",
  },
  {
    id: "insects051", category: "insects", difficulty: "medium",
    question: "날개 소리가 아주 커서 무섭게 느껴지는 숲속의 검정 비행기는 누구일까요?",
    answer: "뒤영벌",
  },
  {
    id: "insects052", category: "insects", difficulty: "easy",
    question: "바람을 타고 아주 멀리 날아갈 수 있는 가벼운 날개를 가진 가을의 요정은 누구일까요?",
    answer: "고추잠자리",
  },
  {
    id: "insects053", category: "insects", difficulty: "medium",
    question: "나비가 되기 전 아주 많이 먹고 쑥쑥 자라는 초록색 꿈틀이는 누구일까요?",
    answer: "애벌레",
  },
  {
    id: "insects054", category: "insects", difficulty: "easy",
    question: "가을 밤 가장 맑은 목소리로 노래하는 숲속의 음악가는 누구일까요?",
    answer: "방울벌레",
  },
  {
    id: "insects055", category: "insects", difficulty: "medium",
    question: "나뭇잎을 동그랗게 말아서 아기가 살 집을 만드는 아주 지혜로운 벌레는 누구일까요?",
    answer: "거위벌레",
  },
  {
    id: "insects056", category: "insects", difficulty: "easy",
    question: "여름밤 우리를 잠 못 들게 윙윙거리는 얄미운 비행기 날림보는 무엇일까요?",
    answer: "빨간집모기",
  },
  {
    id: "insects057", category: "insects", difficulty: "medium",
    question: "겨울을 지내기 위해 껍질 속에 숨어서 봄을 기다리는 곤충의 잠자는 성은 무엇일까요?",
    answer: "번데기",
  },
  {
    id: "insects058", category: "insects", difficulty: "easy",
    question: "아주 긴 더듬이를 이용해 길을 찾고 단 것을 좋아하는 집 안의 불청객은 누구일까요?",
    answer: "바퀴벌레",
  },
  {
    id: "insects059", category: "insects", difficulty: "medium",
    question: "물 속 모래를 모아 예쁜 집을 짓고 사는 수중 건축가는 누구일까요?",
    answer: "날도래",
  },
  {
    id: "insects060", category: "insects", difficulty: "easy",
    question: "예쁜 꽃가루를 몸에 묻혀 식물들을 도와주는 아주 착한 곤충은 누구일까요?",
    answer: "꽃등에",
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
