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
    "방어", "메기", "장어", "해파리", "산호", "조개", "바다거북", "곰치", "바다코끼리",
    "게", "고등어", "가자미", "바다표범", "말미잘", "돛새치", "소라게", "물범",
    "바닷가재", "해삼", "다랑어", "청어", "멸치", "병어", "고래상어", "망치상어",
    "벨루가", "범고래", "매너티", "듀공", "아귀", "날치", "청새치"
  ],
  animals: [
    "사자", "기린", "코끼리", "얼룩말", "하이에나", "판다", "호랑이", "원숭이",
    "뱀", "악어", "토끼", "다람쥐", "여우", "곰", "사슴", "하마", "낙타",
    "펭귄", "부엉이", "기니피그", "늑대", "고릴라", "치타", "표범", "코뿔소",
    "캥거루", "고양이", "개", "말", "소", "양", "돼지", "닭", "오리",
    "독수리", "앵무새", "박쥐", "공작", "멧돼지", "수달", "참새", "산양",
    "두더지", "페넥여우", "딱따구리", "천산갑", "까마귀", "비버", "기러기"
  ],
  insects: [
    "나비", "개미", "무당벌레", "잠자리", "매미", "메뚜기", "베짱이", "사마귀",
    "반딧불이", "물방개", "풍뎅이", "거미", "꿀벌", "말벌", "나방", "하루살이",
    "모기", "파리", "바퀴벌레", "진딧물", "대나무벌레", "개미귀신", "물벼룩",
    "굼벵이", "송장벌레", "그리마", "누에나방", "하늘소", "게아재비", "장수말벌",
    "좀", "개똥벌레", "왕사마귀", "왕사슴벌레", "귀뚜라미", "뒤영벌", "고추잠자리",
    "소금쟁이", "꽃등에", "장수풍뎅이", "사슴벌레", "방울벌레", "배추흰나비",
    "애벌레", "번데기", "거위벌레", "날도래"
  ],
  dinosaurs: [
    "티라노사우루스", "트리케라톱스", "브라키오사우루스", "스테고사우루스", "벨로키랍토르",
    "파라사우롤로푸스", "안킬로사우루스", "프테라노돈", "딜로포사우루스", "스피노사우루스",
    "이구아노돈", "파키케팔로사우루스", "코리토사우루스", "알로사우루스", "콤프소그나투스",
    "마이아사우라", "카르노타우루스", "데이노니쿠스", "디플로도쿠스", "프로토케라톱스",
    "카스모사우루스", "모사사우루스", "갈리미무스", "아파토사우루스", "스티라코사우루스",
    "마멘키사우루스", "시조새", "켄트로사우루스", "테리지노사우루스", "엘라스모사우루스",
    "닉토사우루스", "헤스페로사우루스", "사르코수쿠스", "오르니토미무스", "기가노토사우루스",
    "우타랍토르", "케찰코아틀루스", "에드몬토니아", "람베오사우루스", "다스플레토사우루스",
    "케라토사우루스", "프시타코사우루스", "에이니오사우루스", "에오랍토르", "이크티오사우루스",
    "트로오돈", "파키리노사우루스", "가스토니아", "오비랍토르", "타페야라",
    "아마르가사우루스", "오로드로메우스", "타르보사우루스", "펜타케라톱스",
    "안세리미무스", "틸로사우루스", "메갈로사우루스", "유오플로케팔루스"
  ]
};

const quizQuestions = [
  // Fish/Marine Animals Quiz (60 questions)
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
    question: "바다에서 제일 큰 동물이며, 입으로 아주 작은 물고기를 많이 먹고 등에 있는 구멍으로 물을 뿜는 동물은 무엇일까요?",
    answer: "고래",
  },
  {
    id: "fish_marine006", category: "fish_marine", difficulty: "easy",
    question: "주황색 몸에 흰 줄무늬가 있고, 영화 '니모를 찾아서'의 주인공이며 말미잘 사이에 숨어 사는 물고기는 무엇일까요?",
    answer: "흰동가리",
  },
  {
    id: "fish_marine007", category: "fish_marine", difficulty: "easy",
    question: "검은색과 흰색 옷을 입은 것 같고, 하늘을 날지 못하지만 물속에서 아주 잘 헤엄치는 남극의 친구는 누구일까요?",
    answer: "펭귄",
  },
  {
    id: "fish_marine008", category: "fish_marine", difficulty: "medium",
    question: "길쭉해서 뱀처럼 생겼고, 몸에서 전기를 만들 수 있으며 아마존강에 사는 물고기는 무엇일까요?",
    answer: "전기뱀장어",
  },
  {
    id: "fish_marine009", category: "fish_marine", difficulty: "easy",
    question: "머리가 말처럼 생겼고, 꼬리로 물풀을 꼭 잡고 있으며 아빠가 아기를 돌보는 신기한 동물은 무엇일까요?",
    answer: "해마",
  },
  {
    id: "fish_marine010", category: "fish_marine", difficulty: "medium",
    question: "몸이 넓고 납작하며 날개 같은 지느러미로 헤엄치고, 꼬리에 독침이 있을 수 있는 바다 친구는 누구일까요?",
    answer: "가오리",
  },
  {
    id: "fish_marine011", category: "fish_marine", difficulty: "easy",
    question: "별 모양처럼 팔이 여러 개이고, 몸이 딱딱해서 천천히 움직이는 바닷속 동물은 무엇일까요?",
    answer: "불가사리",
  },
  {
    id: "fish_marine012", category: "fish_marine", difficulty: "easy",
    question: "팔이 여덟 개이고 잉크를 뿜어서 도망가며, 머리가 동그랗고 말랑말랑한 바다 동물은 누구일까요?",
    answer: "문어",
  },
  {
    id: "fish_marine013", category: "fish_marine", difficulty: "easy",
    question: "팔이 여러 개 있고 길쭉하며, 말려서 간식으로도 먹고 밤에 불빛을 좋아하는 동물은 무엇일까요?",
    answer: "오징어",
  },
  {
    id: "fish_marine014", category: "fish_marine", difficulty: "hard",
    question: "아마존강에 살며 이빨이 아주 날카로운 무서운 물고기로, 떼를 지어 다니는 친구는 누구일까요?",
    answer: "피라냐",
  },
  {
    id: "fish_marine015", category: "fish_marine", difficulty: "medium",
    question: "바다에서 살다가 알을 낳을 때 강으로 올라오며 분홍색 살을 가진 맛있는 물고기는 무엇일까요?",
    answer: "연어",
  },
  {
    id: "fish_marine016", category: "fish_marine", difficulty: "medium",
    question: "몸이 아주 크고 빨리 헤엄치며, 통조림으로도 많이 먹고 속살이 빨간 물고기는 무엇일까요?",
    answer: "참치",
  },
  {
    id: "fish_marine017", category: "fish_marine", difficulty: "medium",
    question: "길쭉한 몸에 은색 빛이 나고, 겨울에 회로 먹으면 특히 맛있는 물고기는 무엇일까요?",
    answer: "방어",
  },
  {
    id: "fish_marine018", category: "fish_marine", difficulty: "easy",
    question: "입 옆에 긴 수염이 있고 민물에 살며, 얼굴이 조금 우스꽝스럽게 생긴 물고기는 무엇일까요?",
    answer: "메기",
  },
  {
    id: "fish_marine019", category: "fish_marine", difficulty: "easy",
    question: "길쭉해서 뱀처럼 보이고 미끌미끌하며, 구이로 구워 먹으면 기운이 나는 물고기는 무엇일까요?",
    answer: "장어",
  },
  {
    id: "fish_marine020", category: "fish_marine", difficulty: "easy",
    question: "몸이 반투명해서 안이 비치고, 물속에서 말랑말랑 떠다니지만 쏘이면 아픈 동물은 무엇일까요?",
    answer: "해파리",
  },
  {
    id: "fish_marine021", category: "fish_marine", difficulty: "medium",
    question: "바다의 보석이라 불리며 바위나 바닥에 붙어 살고 꽃처럼 예쁘게 생긴 것은 무엇일까요?",
    answer: "산호",
  },
  {
    id: "fish_marine022", category: "fish_marine", difficulty: "easy",
    question: "딱딱한 껍질 속에 부드러운 살이 있고 진주를 만들기도 하는 바다 생물은 무엇일까요?",
    answer: "조개",
  },
  {
    id: "fish_marine023", category: "fish_marine", difficulty: "easy",
    question: "등에 딱딱한 집을 지고 헤엄치며 아주 오래 사는 바다의 신사 같은 동물은 누구일까요?",
    answer: "바다거북",
  },
  {
    id: "fish_marine024", category: "fish_marine", difficulty: "easy",
    question: "바닷속 바위 틈에 숨어 살며 길쭉한 몸을 가진 미끌미끌하고 힘이 센 친구는 누구일까요?",
    answer: "곰치",
  },
  {
    id: "fish_marine025", category: "fish_marine", difficulty: "easy",
    question: "딱딱한 갈색 껍질을 가지고 있고 집게발이 두 개! 옆으로 옆으로 기어가는 친구는 누구일까요?",
    answer: "게",
  },
  {
    id: "fish_marine026", category: "fish_marine", difficulty: "medium",
    question: "모래 속에 쏙 숨어 있다가 눈만 빼공 내밀고 먹이를 기다리는 납작한 물고기는 무엇일까요?",
    answer: "가자미",
  },
  {
    id: "fish_marine027", category: "fish_marine", difficulty: "medium",
    question: "주둥이가 아주 길고 뾰족하며 육식성인, 독특한 외형을 가진 민물고기는 무엇일까요?",
    answer: "가물치",
  },
  {
    id: "fish_marine028", category: "fish_marine", difficulty: "medium",
    question: "등에 커다란 지느러미가 돛처럼 솟아 있어서 아주 빠르게 헤엄치는 물고기는 무엇일까요?",
    answer: "돛새치",
  },
  {
    id: "fish_marine029", category: "fish_marine", difficulty: "medium",
    question: "빈 조개껍질 속에 들어가서 집을 짓고 사는 바다의 나그네는 누구일까요?",
    answer: "소라게",
  },
  {
    id: "fish_marine030", category: "fish_marine", difficulty: "easy",
    question: "바닷속에서 알록달록 색깔이 예쁘고 말미잘과 친구인 작은 물고기는 누구일까요?",
    answer: "흰동가리",
  },
  {
    id: "fish_marine031", category: "fish_marine", difficulty: "easy",
    question: "바다 사자라고도 불리며 매끄러운 몸으로 헤엄을 아주 잘 치는 친구는 누구일까요?",
    answer: "바다표범",
  },
  {
    id: "fish_marine032", category: "fish_marine", difficulty: "medium",
    question: "차가운 바다에 살며 커다란 송곳니가 있고 수염이 난 할아버지처럼 생긴 친구는 누구일까요?",
    answer: "바다코끼리",
  },
  {
    id: "fish_marine033", category: "fish_marine", difficulty: "easy",
    question: "등에 푸른 빛이 나고 배는 하얗고, 떼를 지어 다니는 아주 흔하지만 맛있는 물고기는 무엇일까요?",
    answer: "고등어",
  },
  {
    id: "fish_marine034", category: "fish_marine", difficulty: "medium",
    question: "몸이 둥글고 지느러미가 거의 없으며 아주 큰 덩치를 가진 느긋한 바다 물고기는 누구일까요?",
    answer: "개복치",
  },
  {
    id: "fish_marine035", category: "fish_marine", difficulty: "easy",
    question: "머리에 전등을 달고 다니는 것처럼 보이는, 깊은 바다 속에 사는 신기한 물고기는 무엇일까요?",
    answer: "아귀",
  },
  {
    id: "fish_marine036", category: "fish_marine", difficulty: "medium",
    question: "바다의 늑대라 불리는 사나운 이빨을 가진, 떼를 지어 사냥하는 물고기는 누구일까요?",
    answer: "꼬치고기",
  },
  {
    id: "fish_marine037", category: "fish_marine", difficulty: "easy",
    question: "물 위로 날개 같은 지느러미를 펴고 슉~ 날아오르는 신기한 물고기는 무엇일까요?",
    answer: "날치",
  },
  {
    id: "fish_marine038", category: "fish_marine", difficulty: "medium",
    question: "머리 모양이 망치처럼 생긴 아주 독특한 모습의 상어는 누구일까요?",
    answer: "망치상어",
  },
  {
    id: "fish_marine039", category: "fish_marine", difficulty: "easy",
    question: "바다에서 가장 큰 상어지만 성격은 온순하고 플랑크톤을 먹고 사는 친구는 누구일까요?",
    answer: "고래상어",
  },
  {
    id: "fish_marine040", category: "fish_marine", difficulty: "medium",
    question: "흰색 몸을 가지고 있으며 '바다의 카나리아'라고 불릴 정도로 소리를 잘 내는 고래는 누구일까요?",
    answer: "벨루가",
  },
  {
    id: "fish_marine041", category: "fish_marine", difficulty: "medium",
    question: "바다 최고의 포식자로 알려진, 검은색과 흰색 무늬가 멋진 무서운 고래는 누구일까요?",
    answer: "범고래",
  },
  {
    id: "fish_marine042", category: "fish_marine", difficulty: "easy",
    question: "강이나 바다에 살며 꼬리 지느러미가 둥글고 풀을 먹고 사는 온순한 거대 동물은 누구일까요?",
    answer: "매너티",
  },
  {
    id: "fish_marine043", category: "fish_marine", difficulty: "medium",
    question: "주둥이가 칼처럼 길고 날카로워서 아주 빠르게 헤엄치는 바다의 검객은 누구일까요?",
    answer: "청새치",
  },
  {
    id: "fish_marine044", category: "fish_marine", difficulty: "easy",
    question: "바다 밑바닥에서 모래를 걸러 먹으며 사는, 오이처럼 길쭉하게 생긴 생물은 무엇일까요?",
    answer: "해삼",
  },
  {
    id: "fish_marine045", category: "fish_marine", difficulty: "medium",
    question: "몸에 가시가 뾰족뾰족 나 있고, 밤을 닮은 듯한 모습의 바다 생물은 무엇일까요?",
    answer: "성게",
  },
  {
    id: "fish_marine046", category: "fish_marine", difficulty: "easy",
    question: "바위 틈에 붙어 살며 가위 같은 집게발을 가진, 맛있는 바다 갑각류는 무엇일까요?",
    answer: "바닷가재",
  },
  {
    id: "fish_marine047", category: "fish_marine", difficulty: "medium",
    question: "주둥이가 아주 길고 몸이 은색인, 가을에 구워 먹으면 맛있는 물고기는 무엇일까요?",
    answer: "갈치",
  },
  {
    id: "fish_marine048", category: "fish_marine", difficulty: "easy",
    question: "바다에서 아주 흔하게 볼 수 있는 작은 물고기로, 국물을 낼 때나 반찬으로 많이 먹는 것은 무엇일까요?",
    answer: "멸치",
  },
  {
    id: "fish_marine049", category: "fish_marine", difficulty: "medium",
    question: "입이 아주 크고 몸이 미끌미끌하며, 탕으로 끓여 먹으면 시원한 맛이 나는 물고기는 무엇일까요?",
    answer: "대구",
  },
  {
    id: "fish_marine050", category: "fish_marine", difficulty: "medium",
    question: "바닷속 모래사장에 굴을 파고 살며 머리만 내놓고 있는, 정원 속 장어라고 불리는 친구는 누구일까요?",
    answer: "가든일",
  },
  {
    id: "fish_marine051", category: "fish_marine", difficulty: "easy",
    question: "바다거북처럼 등에 딱딱한 껍질이 있고 육지에 알을 낳으러 오는 바다 거북의 친구는 누구일까요?",
    answer: "장수거북",
  },
  {
    id: "fish_marine052", category: "fish_marine", difficulty: "medium",
    question: "몸이 뱀처럼 아주 길고 날카로운 이빨을 가진, 무지개 빛깔이 나는 신기한 바다 생물은 누구일까요?",
    answer: "리본장어",
  },
  {
    id: "fish_marine053", category: "fish_marine", difficulty: "easy",
    question: "바닷속 바위 위에서 아름다운 춤을 추는 것처럼 보이는, 촉수가 많은 동물은 누구일까요?",
    answer: "말미잘",
  },
  {
    id: "fish_marine054", category: "fish_marine", difficulty: "medium",
    question: "나비처럼 넓은 지느러미를 가지고 화려한 색깔을 뽐내는 열대어는 누구일까요?",
    answer: "나비고기",
  },
  {
    id: "fish_marine055", category: "fish_marine", difficulty: "easy",
    question: "머리에 혹 같은 것이 볼록 튀어나와 있는 독특한 모양의 물고기는 누구일까요?",
    answer: "혹돔",
  },
  {
    id: "fish_marine056", category: "fish_marine", difficulty: "medium",
    question: "바다의 수풀 사이에서 몸을 숨기고 사는, 잎사귀처럼 생긴 신기한 해마는 누구일까요?",
    answer: "나뭇잎해룡",
  },
  {
    id: "fish_marine057", category: "fish_marine", difficulty: "easy",
    question: "남극과 북극 주변 바다에서 볼 수 있는, 하얀 털을 가진 귀여운 아기 동물을 낳는 친구는 누구일까요?",
    answer: "하프물범",
  },
  {
    id: "fish_marine058", category: "fish_marine", difficulty: "medium",
    question: "몸 주위에 여러 가닥의 긴 지느러미가 사자 갈기처럼 뻗어 있는 화려한 물고기는 누구일까요?",
    answer: "쏠배감펭",
  },
  {
    id: "fish_marine059", category: "fish_marine", difficulty: "easy",
    question: "바닷가 얕은 물에서 볼 수 있는, 긴 다리를 가졌으며 구멍 속으로 쏙 숨어버리는 친구는 누구일까요?",
    answer: "짱뚱어",
  },
  {
    id: "fish_marine060", category: "fish_marine", difficulty: "medium",
    question: "고래처럼 커다란 몸집을 가졌으며 아주 먼 바다를 여행하는 바다의 여행가는 누구일까요?",
    answer: "혹등고래",
  },
  // Animals Quiz Continued (Total 60 for Animals)
  // Animals Quiz (60 questions)
  {
    id: "animals001", category: "animals", difficulty: "easy",
    question: "목 주위에 큰 갈기가 있고 아프리카 사바나에 살며 동물의 왕이라고 불리는 동물은 누구일까요?",
    answer: "사자",
  },
  {
    id: "animals002", category: "animals", difficulty: "easy",
    question: "목이 아주 길고 몸에 얼룩무늬가 있으며 나무 높은 곳의 잎을 먹는 동물은 누구일까요?",
    answer: "기린",
  },
  {
    id: "animals003", category: "animals", difficulty: "easy",
    question: "코가 길게 튀어나와 있고 몸이 아주 크며 무거운 것은 무엇일까요?",
    answer: "코끼리",
  },
  {
    id: "animals004", category: "animals", difficulty: "easy",
    question: "흰색과 검은색 줄무늬가 있고 말처럼 생긴 동물은 무엇일까요?",
    answer: "얼룩말",
  },
  {
    id: "animals005", category: "animals", difficulty: "medium",
    question: "개처럼 생겼으며 웃는 것 같은 특이한 소리로 울고 앞다리가 더 긴 동물은 누구일까요?",
    answer: "하이에나",
  },
  {
    id: "animals006", category: "animals", difficulty: "easy",
    question: "검은색과 흰색 털을 가졌으며 대나무를 주로 먹는 곰은 누구일까요?",
    answer: "판다",
  },
  {
    id: "animals007", category: "animals", difficulty: "easy",
    question: "주황색 몸에 검은 줄무늬가 있고 산이나 숲에 살며 힘이 아주 센 동물은 누구일까요?",
    answer: "호랑이",
  },
  {
    id: "animals008", category: "animals", difficulty: "easy",
    question: "나무를 잘 타고 꼬리가 있으며 나무 위에서 노는 바나나를 좋아하는 동물은 누구일까요?",
    answer: "원숭이",
  },
  {
    id: "animals009", category: "animals", difficulty: "medium",
    question: "다리가 없고 몸을 구불구불 움직이며 기어 다니는 동물은 무엇일까요?",
    answer: "뱀",
  },
  {
    id: "animals010", category: "animals", difficulty: "medium",
    question: "입이 길고 이빨이 날카로우며 물속과 땅 위를 왔다 갔다 하는 무서운 동물은 누구일까요?",
    answer: "악어",
  },
  {
    id: "animals011", category: "animals", difficulty: "easy",
    question: "귀가 길고 쭉 올라와 있으며 당근과 풀을 좋아하는 동물은 누구일까요?",
    answer: "토끼",
  },
  {
    id: "animals012", category: "animals", difficulty: "easy",
    question: "몸이 작고 빠르게 움직이며 도토리나 열매를 모아서 저장하는 동물은 누구일까요?",
    answer: "다람쥐",
  },
  {
    id: "animals013", category: "animals", difficulty: "easy",
    question: "붉은색 털과 긴 꼬리를 가졌으며 지혜롭고 영리하다고 알려진 동물은 누구일까요?",
    answer: "여우",
  },
  {
    id: "animals014", category: "animals", difficulty: "easy",
    question: "덩치가 크고 겨울에는 동굴에서 겨울잠을 자는 동물은 누구일까요?",
    answer: "곰",
  },
  {
    id: "animals015", category: "animals", difficulty: "easy",
    question: "수컷 머리에 뿔이 나 있고 숲속에서 아주 빠르게 달리는 식물을 먹는 동물은 누구일까요?",
    answer: "사슴",
  },
  {
    id: "animals016", category: "animals", difficulty: "medium",
    question: "몸이 둥글둥글 크고 입을 아주 크게 벌릴 수 있으며 물속에 들어가는 걸 좋아하는 동물은 누구일까요?",
    answer: "하마",
  },
  {
    id: "animals017", category: "animals", difficulty: "medium",
    question: "등에 혹이 한 개나 두 개 있고 뜨거운 사막에서 잘 견디는 동물은 누구일까요?",
    answer: "낙타",
  },
  {
    id: "animals018", category: "animals", difficulty: "easy",
    question: "하늘을 날 수 없지만 물에서 수영을 아주 잘 하는 남극의 신사 같은 친구는 누구일까요?",
    answer: "펭귄",
  },
  {
    id: "animals019", category: "animals", difficulty: "easy",
    question: "밤에 활동하며 눈이 크고 목을 옆으로 많이 돌릴 수 있는 새는 누구일까요?",
    answer: "부엉이",
  },
  {
    id: "animals020", category: "animals", difficulty: "easy",
    question: "쥐처럼 생겼지만 쥐는 아니고 작고 통통해서 애완동물로 사랑받는 친구는 누구일까요?",
    answer: "기니피그",
  },
  {
    id: "animals021", category: "animals", difficulty: "easy",
    question: "사람과 가장 친하고 집을 잘 지켜주는, 멍멍 소리를 내는 친구는 누구일까요?",
    answer: "강아지",
  },
  {
    id: "animals022", category: "animals", difficulty: "easy",
    question: "하늘 높이 날아다니며 아주 시력이 좋고 사냥을 잘 하는 새들의 왕은 누구일까요?",
    answer: "독수리",
  },
  {
    id: "animals023", category: "animals", difficulty: "easy",
    question: "북극에 살며 하얀 털을 가졌고 수영도 사냥도 아주 잘 하는 거대 곰은 누구일까요?",
    answer: "북극곰",
  },
  {
    id: "animals024", category: "animals", difficulty: "medium",
    question: "지구에서 아주 느리기로 유명하고 하루 종일 나무에 매달려 잠을 자는 동물은 누구일까요?",
    answer: "나무늘보",
  },
  {
    id: "animals025", category: "animals", difficulty: "medium",
    question: "코 위에 단단한 뿔이 있고 가죽이 아주 두꺼운 동물의 장군은 누구일까요?",
    answer: "코뿔소",
  },
  {
    id: "animals026", category: "animals", difficulty: "easy",
    question: "우리에게 맛있는 우유를 선물해주고 '음매~' 하고 우는 동물은 누구일까요?",
    answer: "젖소",
  },
  {
    id: "animals027", category: "animals", difficulty: "medium",
    question: "몸 위로 가시가 뾰족뾰족 나 있고 위험하면 공처럼 몸을 웅크리는 동물은 누구일까요?",
    answer: "고슴도치",
  },
  {
    id: "animals028", category: "animals", difficulty: "easy",
    question: "아침 햇살과 함께 '꼬꼬댁!' 하고 울어주는 친구는 누구일까요?",
    answer: "닭",
  },
  {
    id: "animals029", category: "animals", difficulty: "medium",
    question: "얼굴이 인형같이 귀엽고 나무 위에서 유칼립투스 잎을 먹으며 잠자는 친구는 누구일까요?",
    answer: "코알라",
  },
  {
    id: "animals030", category: "animals", difficulty: "easy",
    question: "치즈를 좋아하고 집 안 구석구석을 아주 빠르게 돌아다니는 작은 동물은 누구일까요?",
    answer: "생쥐",
  },
  {
    id: "animals031", category: "animals", difficulty: "medium",
    question: "달밤에 언덕에서 '아우우~' 하고 울며 무리 지어 다니는 산 속의 개는 누구일까요?",
    answer: "늑대",
  },
  {
    id: "animals032", category: "animals", difficulty: "easy",
    question: "사람의 말을 흉내 내기도 하고 예쁜 깃털을 뽐내는 똑똑한 새는 누구일까요?",
    answer: "앵무새",
  },
  {
    id: "animals033", category: "animals", difficulty: "medium",
    question: "밤에 활동하며 동굴에 거꾸로 매달려 잠을 자는 날개 달린 포유류는 누구일까요?",
    answer: "박쥐",
  },
  {
    id: "animals034", category: "animals", difficulty: "easy",
    question: "보석 같은 꼬리 날개를 부채처럼 활짝 펴서 뽐내기 좋아하는 새는 누구일까요?",
    answer: "공작",
  },
  {
    id: "animals035", category: "animals", difficulty: "medium",
    question: "진흙 목욕을 좋아하고 숲속에서 아주 용감하게 사냥하는 돌격대장은 누구일까요?",
    answer: "멧돼지",
  },
  {
    id: "animals036", category: "animals", difficulty: "medium",
    question: "수영을 아주 잘 하고 보들보들한 털을 가진, 강가에서 볼 수 있는 귀염둥이는 누구일까요?",
    answer: "수달",
  },
  {
    id: "animals037", category: "animals", difficulty: "easy",
    question: "우리 주변에서 흔히 볼 수 있는 작고 귀여운 새로, 짹짹 소리 내며 날아다니는 친구는 누구일까요?",
    answer: "참새",
  },
  {
    id: "animals038", category: "animals", difficulty: "medium",
    question: "산 위 높은 바위를 껑충껑충 뛰어다니며 사는, 점프 실력이 대단한 동물은 누구일까요?",
    answer: "산양",
  },
  {
    id: "animals039", category: "animals", difficulty: "easy",
    question: "땅속에 터널을 아주 잘 파고 눈이 잘 안 보이지만 코가 발달한 동물은 누구일까요?",
    answer: "두더지",
  },
  {
    id: "animals040", category: "animals", difficulty: "medium",
    question: "사막에 살며 아주 큰 귀를 가지고 있어서 멀리서 나는 소리도 잘 듣는 친구는 누구일까요?",
    answer: "페넥여우",
  },
  {
    id: "animals041", category: "animals", difficulty: "easy",
    question: "나무줄기를 '딱딱딱' 쪼아 벌레를 잡아먹고 숲을 건강하게 지켜주는 새는 누구일까요?",
    answer: "딱따구리",
  },
  {
    id: "animals042", category: "animals", difficulty: "medium",
    question: "비늘로 온몸이 덮여 있고 혀를 길게 내밀어 개미를 잡아먹는 신기한 동물은 누구일까요?",
    answer: "천산갑",
  },
  {
    id: "animals043", category: "animals", difficulty: "easy",
    question: "온몸이 검은색이고 '까악까악' 울며 반짝이는 것을 좋아하는 영리한 새는 누구일까요?",
    answer: "까마귀",
  },
  {
    id: "animals044", category: "animals", difficulty: "easy",
    question: "강가에서 댐을 짓기로 유명한, 꼬리가 납작하고 수영을 잘 하는 건축가 동물은 누구일까요?",
    answer: "비버",
  },
  {
    id: "animals045", category: "animals", difficulty: "easy",
    question: "하늘 높이 날아 따뜻한 곳으로 단체 여행을 떠나는 아름다운 철새는 누구일까요?",
    answer: "기러기",
  },
  {
    id: "animals046", category: "animals", difficulty: "easy",
    question: "흰색과 까만색 옷을 입고 얼음 위에서 아장아장 걷는 귀여운 남극 친구는 누구일까요?",
    answer: "펭귄",
  },
  {
    id: "animals047", category: "animals", difficulty: "medium",
    question: "산 속에 숨어서 사냥하며 아주 예쁜 털과 날카로운 발톱을 가진 야생 고양이는 누구일까요?",
    answer: "스라소니",
  },
  {
    id: "animals048", category: "animals", difficulty: "easy",
    question: "물 위를 둥둥 떠다니며 '꽥꽥' 하고 노래하는 친구는 누구일까요?",
    answer: "오리",
  },
  {
    id: "animals049", category: "animals", difficulty: "medium",
    question: "세상에서 가장 빨리 달릴 수 있는 동물로, 아프리카 들판의 육상 선수 같은 친구는 누구일까요?",
    answer: "치타",
  },
  {
    id: "animals050", category: "animals", difficulty: "easy",
    question: "멋진 무늬가 있고 산에서 '어흥~' 하고 소리치는 무서운 호랑이의 라이벌은 누구일까요?",
    answer: "표범",
  },
  {
    id: "animals051", category: "animals", difficulty: "easy",
    question: "몽실몽실 하얀 털을 가졌고 '메에~' 소리를 내며 풀을 먹는 착한 친구는 누구일까요?",
    answer: "양",
  },
  {
    id: "animals052", category: "animals", difficulty: "easy",
    question: "포동포동 살이 찌고 코를 킁킁거리며 음식을 아주 좋아하는 '꿀꿀' 친구는 누구일까요?",
    answer: "돼지",
  },
  {
    id: "animals053", category: "animals", difficulty: "medium",
    question: "주머니에 아기를 넣고 캥거루처럼 껑충껑충 뛰는 호주의 작은 친구는 누구일까요?",
    answer: "왈라비",
  },
  {
    id: "animals054", category: "animals", difficulty: "easy",
    question: "나비만큼 화려한 날개를 가지고 밤마다 불빛을 찾아 날아드는 곤충의 친구는 누구일까요?",
    answer: "나방",
  },
  {
    id: "animals055", category: "animals", difficulty: "medium",
    question: "코가 코끼리처럼 약간 길쭉하며 숲속에서 먹이를 찾아다니는 신기한 동물은 누구일까요?",
    answer: "맥",
  },
  {
    id: "animals056", category: "animals", difficulty: "easy",
    question: "커다란 부리를 가지고 열대 숲에서 과일을 먹으며 사는 화려한 새는 누구일까요?",
    answer: "토코투칸",
  },
  {
    id: "animals057", category: "animals", difficulty: "medium",
    question: "바다 사자처럼 생겼지만 육지에서도 가끔 볼 수 있는 듬직한 바다표범 사촌은 누구일까요?",
    answer: "물개",
  },
  {
    id: "animals058", category: "animals", difficulty: "easy",
    question: "나무 타기를 아주 좋아하고 안경을 쓴 것 같은 무늬를 가진 귀여운 동물은 누구일까요?",
    answer: "너구리",
  },
  {
    id: "animals059", category: "animals", difficulty: "medium",
    question: "사막에 살며 땅을 아주 잘 파고 일어서서 주변을 살피는 귀여운 파수꾼은 누구일까요?",
    answer: "미어캣",
  },
  {
    id: "animals060", category: "animals", difficulty: "easy",
    question: "집 안 구석을 돌아다니며 '찍찍' 소리 내고 무언가를 갉아먹기를 좋아하는 장난꾸러기는 누구일까요?",
    answer: "생쥐",
  },
  // Dinosaurs Quiz (60 questions)
  {
    id: "dinosaurs001", category: "dinosaurs", difficulty: "easy",
    question: "머리에 커다란 뿔이 세 개 있고 목 뒤에 넓은 프릴이 있는 초식 공룡은 누구일까요?",
    answer: "트리케라톱스",
  },
  {
    id: "dinosaurs002", category: "dinosaurs", difficulty: "easy",
    question: "공룡의 왕이라고 불리며 아주 날카로운 이빨과 강력한 턱을 가진 육식 공룡은 누구일까요?",
    answer: "티라노사우루스",
  },
  {
    id: "dinosaurs003", category: "dinosaurs", difficulty: "easy",
    question: "목이 아주 길고 몸집이 매우 거대하며 나뭇잎을 즐겨 먹는 초식 공룡은 누구일까요?",
    answer: "브라키오사우루스",
  },
  {
    id: "dinosaurs004", category: "dinosaurs", difficulty: "easy",
    question: "등에 오각형 모양의 골판이 줄지어 있고 꼬리에 가시가 달린 공룡은 누구일까요?",
    answer: "스테고사우루스",
  },
  {
    id: "dinosaurs005", category: "dinosaurs", difficulty: "medium",
    question: "몸집은 작지만 아주 똑똑하고 뒷다리에 날카로운 갈고리 발톱이 있는 날렵한 공룡은 누구일까요?",
    answer: "벨로키랍토르",
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
    question: "바다 속에서 살던 무시무시한 파충류로, 아주 큰 입과 날카로운 이빨을 가진 바다의 왕은 누구일까요?",
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
    question: "머리에 커다란 볏이 두 개가 나 있고 독을 뿜는 신기한 모습의 공룡은 누구일까요?",
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
    question: "등에 뾰족한 가시가 많이 나 있고 꼬리에 가시가 달린 단단한 초식 공룡은 누구일까요?",
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
    question: "머리에 황소 같은 뿔이 두 개 달려 있는 사나운 육식 공룡은 누구일까요?",
    answer: "카르노타우루스",
  },
  {
    id: "dinosaurs023", category: "dinosaurs", difficulty: "easy",
    question: "등에 뾰족한 가시가 많이 나 있고 꼬리에 가시가 달린 단단한 초식 공룡은 누구일까요?",
    answer: "켄트로사우루스",
  },
  {
    id: "dinosaurs024", category: "dinosaurs", difficulty: "medium",
    question: "아주 긴 앞발톱을 가졌으며 낫처럼 생긴 발톱으로 위협하던 독특한 공룡은 누구일까요?",
    answer: "테리지노사우루스",
  },
  {
    id: "dinosaurs025", category: "dinosaurs", difficulty: "medium",
    question: "바다 속에서 아주 긴 목을 헤엄치며 살았던 잠수함 같은 바다 파충류는 누구일까요?",
    answer: "엘라스모사우루스",
  },
  {
    id: "dinosaurs026", category: "dinosaurs", difficulty: "easy",
    question: "머리에 아주 큰 볏이 있고 꼬리가 짧은, 숲속을 날아다니던 익룡은 누구일까요?",
    answer: "닉토사우루스",
  },
  {
    id: "dinosaurs027", category: "dinosaurs", difficulty: "medium",
    question: "스테고사우루스와 비슷하지만 골판 대신 뾰족한 가시가 더 많은 공룡은 누구일까요?",
    answer: "헤스페로사우루스",
  },
  {
    id: "dinosaurs028", category: "dinosaurs", difficulty: "hard",
    question: "공룡 시대의 강가에서 살았던 몸집이 아주 거대한 고대 악어는 누구일까요?",
    answer: "사르코수쿠스",
  },
  {
    id: "dinosaurs029", category: "dinosaurs", difficulty: "medium",
    question: "타조 공룡이라 불리며 알을 훔쳐 먹는 것으로 오해받았던 빠른 공룡은 누구일까요?",
    answer: "오르니토미무스",
  },
  {
    id: "dinosaurs030", category: "dinosaurs", difficulty: "medium",
    question: "티라노사우루스보다 더 컸을지도 모르는, 남미의 거대 육식 공룡은 누구일까요?",
    answer: "기가노토사우루스",
  },
  {
    id: "dinosaurs031", category: "dinosaurs", difficulty: "medium",
    question: "벨로키랍토르의 친척이지만 훨씬 더 크고 사나웠던 육식 공룡은 누구일까요?",
    answer: "우타랍토르",
  },
  {
    id: "dinosaurs032", category: "dinosaurs", difficulty: "easy",
    question: "하늘을 날던 동물 중 가장 컸으며 목이 아주 길었던 거대 익룡은 누구일까요?",
    answer: "케찰코아틀루스",
  },
  {
    id: "dinosaurs033", category: "dinosaurs", difficulty: "medium",
    question: "등에 단단한 갑옷과 뾰족한 가시가 많이 나 있는, 안킬로사우루스의 친구는 누구일까요?",
    answer: "에드몬토니아",
  },
  {
    id: "dinosaurs034", category: "dinosaurs", difficulty: "medium",
    question: "머리 볏이 장갑 모양처럼 생긴, 파라사우롤로푸스와 비슷한 공룡은 누구일까요?",
    answer: "람베오사우루스",
  },
  {
    id: "dinosaurs035", category: "dinosaurs", difficulty: "medium",
    question: "티라노사우루스처럼 사납고 무시무시한 이빨을 가진 북미의 육식 공룡은 누구일까요?",
    answer: "다스플레토사우루스",
  },
  {
    id: "dinosaurs036", category: "dinosaurs", difficulty: "easy",
    question: "코 위에 뿔이 있고 눈 위에도 뿔이 있는, 사나운 육식 공룡 중 하나는 누구일까요?",
    answer: "케라토사우루스",
  },
  {
    id: "dinosaurs037", category: "dinosaurs", difficulty: "medium",
    question: "부리가 앵무새처럼 생겼으며 몸집이 작은 초식 공룡은 누구일까요?",
    answer: "프시타코사우루스",
  },
  {
    id: "dinosaurs038", category: "dinosaurs", difficulty: "medium",
    question: "코 위에 뿔 하나가 휘어져 있고 프릴에 가시가 있는 독특한 공룡은 누구일까요?",
    answer: "에이니오사우루스",
  },
  {
    id: "dinosaurs039", category: "dinosaurs", difficulty: "medium",
    question: "가장 오래된 공룡 중 하나로 아주 작고 날렵했던 초기의 공룡은 누구일까요?",
    answer: "에오랍토르",
  },
  {
    id: "dinosaurs040", category: "dinosaurs", difficulty: "easy",
    question: "바다 속에서 살던 파충류로 물고기와 아주 비슷하게 생긴 친구는 누구일까요?",
    answer: "이크티오사우루스",
  },
  {
    id: "dinosaurs041", category: "dinosaurs", difficulty: "medium",
    question: "지능이 아주 높았을 것으로 생각되는, 눈이 크고 머리가 좋은 공룡은 누구일까요?",
    answer: "트로오돈",
  },
  {
    id: "dinosaurs042", category: "dinosaurs", difficulty: "medium",
    question: "코 위에 아주 커다란 뼈 뭉치가 솟아 있는 트리케라톱스의 친척은 누구일까요?",
    answer: "파키리노사우루스",
  },
  {
    id: "dinosaurs043", category: "dinosaurs", difficulty: "medium",
    question: "등에 단단한 가시 갑옷을 입고 꼬리로 적을 물리치던 갑옷 공룡은 누구일까요?",
    answer: "가스토니아",
  },
  {
    id: "dinosaurs044", category: "dinosaurs", difficulty: "easy",
    question: "알을 품고 있는 모습으로 발견되어 '알 도둑'이라는 오명을 벗은 공룡은 누구일까요?",
    answer: "오비랍토르",
  },
  {
    id: "dinosaurs045", category: "dinosaurs", difficulty: "medium",
    question: "머리에 커다란 볏이 있고 부리가 아주 큰 신기하게 생긴 익룡은 누구일까요?",
    answer: "타페야라",
  },
  {
    id: "dinosaurs046", category: "dinosaurs", difficulty: "easy",
    question: "몸집이 아주 작지만 아주 빠르게 달릴 수 있는 콤프소그나투스의 친구는 누구일까요?",
    answer: "콤프소그나투스",
  },
  {
    id: "dinosaurs047", category: "dinosaurs", difficulty: "medium",
    question: "자식을 아주 잘 돌보았다고 해서 '착한 엄마 공룡'이라는 뜻을 가진 공룡은 누구일까요?",
    answer: "마이아사우라",
  },
  {
    id: "dinosaurs048", category: "dinosaurs", difficulty: "easy",
    question: "강한 뒷다리와 날카로운 앞발톱을 가진, 벨로키랍토르보다 조금 더 큰 공룡은 누구일까요?",
    answer: "데이노니쿠스",
  },
  {
    id: "dinosaurs049", category: "dinosaurs", difficulty: "medium",
    question: "목이 아주 길고 꼬리가 채찍처럼 생겨서 적을 위협하던 거대 공룡은 누구일까요?",
    answer: "디플로도쿠스",
  },
  {
    id: "dinosaurs050", category: "dinosaurs", difficulty: "easy",
    question: "프릴이 있고 뿔은 없지만 트리케라톱스의 조상격인 작은 공룡은 누구일까요?",
    answer: "프로토케라톱스",
  },
  {
    id: "dinosaurs051", category: "dinosaurs", difficulty: "medium",
    question: "등에 아주 긴 가시들이 돋아나 있는 신기한 모양의 초식 공룡은 누구일까요?",
    answer: "아마르가사우루스",
  },
  {
    id: "dinosaurs052", category: "dinosaurs", difficulty: "easy",
    question: "작고 귀여우며 아주 빠르게 도망치는 숲속의 날렵한 초식 공룡은 누구일까요?",
    answer: "오로드로메우스",
  },
  {
    id: "dinosaurs053", category: "dinosaurs", difficulty: "medium",
    question: "머리 위에 둥근 헬멧 같은 볏이 있는 오리부리 공룡은 누구일까요?",
    answer: "코리토사우루스",
  },
  {
    id: "dinosaurs054", category: "dinosaurs", difficulty: "easy",
    question: "꼬리 끝에 아주 무거운 가시 뭉치가 달려 있는 단단한 공룡은 누구일까요?",
    answer: "유오플로케팔루스",
  },
  {
    id: "dinosaurs055", category: "dinosaurs", difficulty: "medium",
    question: "티라노사우루스처럼 사나운 육식 공룡 중에서 팔이 아주 짧고 덩치가 컸던 친구는 누구일까요?",
    answer: "타르보사우루스",
  },
  {
    id: "dinosaurs056", category: "dinosaurs", difficulty: "easy",
    question: "머리 뒤쪽 프릴이 아주 넓고 화려한 무늬가 있었던 초식 공룡은 누구일까요?",
    answer: "펜타케라톱스",
  },
  {
    id: "dinosaurs057", category: "dinosaurs", difficulty: "medium",
    question: "타조처럼 생겼지만 아주 사나운 눈매를 가진 빠른 거위 공룡은 누구일까요?",
    answer: "안세리미무스",
  },
  {
    id: "dinosaurs058", category: "dinosaurs", difficulty: "easy",
    question: "머리가 아주 크고 앞다리가 발달한 백악기의 사나운 수중 파충류는 누구일까요?",
    answer: "틸로사우루스",
  },
  {
    id: "dinosaurs059", category: "dinosaurs", difficulty: "medium",
    question: "가장 먼저 발견된 공룡 중 하나로 아주 날카로운 이빨을 가진 육식 공룡은 누구일까요?",
    answer: "메갈로사우루스",
  },
  {
    id: "dinosaurs060", category: "dinosaurs", difficulty: "easy",
    question: "머리 뒤로 아주 긴 가시 같은 볏이 하나 달려 있는 신기한 모양의 익룡은 누구일까요?",
    answer: "닉토사우루스",
  },
  // Insects Quiz Expansion (need 55 more for 60)
  // Insects Quiz (60 questions)
  {
    id: "insects001", category: "insects", difficulty: "easy",
    question: "날개가 화려하고 예쁘며, 꽃 사이를 날아다니면서 꿀을 먹는 곤충은 누구일까요?",
    answer: "나비",
  },
  {
    id: "insects002", category: "insects", difficulty: "easy",
    question: "땅속에 집을 짓고 살며 아주 부지런하고, 자기 몸보다 무거운 것도 번쩍 드는 힘센 곤충은 누구일까요?",
    answer: "개미",
  },
  {
    id: "insects003", category: "insects", difficulty: "easy",
    question: "빨간색 몸에 검은 점이 콕콕 박혀 있고, 진딧물을 잡아먹는 고마운 곤충은 누구일까요?",
    answer: "무당벌레",
  },
  {
    id: "insects004", category: "insects", difficulty: "easy",
    question: "날개가 네 개이고 눈이 아주 크며, 물가에서 헬리콥터처럼 날아다니는 곤충은 무엇일까요?",
    answer: "잠자리",
  },
  {
    id: "insects005", category: "insects", difficulty: "easy",
    question: "여름에 나무에 붙어 '맴맴' 소리 내어 울며, 오랫동안 땅속에서 사는 곤충은 누구일까요?",
    answer: "매미",
  },
  {
    id: "insects006", category: "insects", difficulty: "easy",
    question: "뒷다리가 아주 길어서 껑충껑충 잘 뛰고, '찌르르' 소리를 내기도 하는 곤충은 누구일까요?",
    answer: "메뚜기",
  },
  {
    id: "insects007", category: "insects", difficulty: "medium",
    question: "뒷다리로 소리를 내며 풀밭에서 노래하고, 베짱이와 친구인 노래하는 곤충은 누구일까요?",
    answer: "베짱이",
  },
  {
    id: "insects008", category: "insects", difficulty: "medium",
    question: "앞다리가 낫처럼 생겨서 사냥을 아주 잘 하고, 무서운 표정을 짓는 숲속의 사냥꾼은 누구일까요?",
    answer: "사마귀",
  },
  {
    id: "insects009", category: "insects", difficulty: "easy",
    question: "밤에 꼬리에서 예쁜 불빛을 반짝이며 날아다니는 숲속의 램프 같은 곤충은 무엇일까요?",
    answer: "반딧불이",
  },
  {
    id: "insects010", category: "insects", difficulty: "medium",
    question: "물속에서 헤엄을 아주 잘 치고, 몸이 매끄러운 타원형인 수중 곤충은 누구일까요?",
    answer: "물방개",
  },
  {
    id: "insects011", category: "insects", difficulty: "easy",
    question: "몸이 딱딱한 껍질로 덮여 있고 화려한 색깔을 뽐내기도 하는, 숲속의 신사 같은 곤충은 누구일까요?",
    answer: "풍뎅이",
  },
  {
    id: "insects012", category: "insects", difficulty: "medium",
    question: "다리가 여덟 개이고 줄을 쳐서 벌레를 잡아먹으며, 거미줄을 만드는 친구는 누구일까요?",
    answer: "거미",
  },
  {
    id: "insects013", category: "insects", difficulty: "easy",
    question: "꽃을 찾아다니며 꿀을 모으고, 엉덩이에 침이 있는 노란색 줄무늬 친구는 누구일까요?",
    answer: "꿀벌",
  },
  {
    id: "insects014", category: "insects", difficulty: "medium",
    question: "꿀벌보다 덩치가 훨씬 크고 소리도 무서우며, 아주 강력한 침을 가진 벌은 누구일까요?",
    answer: "말벌",
  },
  {
    id: "insects015", category: "insects", difficulty: "medium",
    question: "나비와 비슷하게 생겼지만 주로 밤에 활동하고, 불빛을 아주 좋아하는 곤충은 누구일까요?",
    answer: "나방",
  },
  {
    id: "insects016", category: "insects", difficulty: "medium",
    question: "날개가 아주 얇고 투명하며 아주 짧은 시간 동안만 살고 간다는 곤충은 누구일까요?",
    answer: "하루살이",
  },
  {
    id: "insects017", category: "insects", difficulty: "easy",
    question: "여름밤 잠을 방해하고 '윙윙' 소리 내며 피를 빨아먹는 얄미운 곤충은 누구일까요?",
    answer: "모기",
  },
  {
    id: "insects018", category: "insects", difficulty: "easy",
    question: "음식물 주변을 날아다니며 병균을 옮기기도 하는, 아주 빠르고 끈질긴 곤충은 누구일까요?",
    answer: "파리",
  },
  {
    id: "insects019", category: "insects", difficulty: "easy",
    question: "집 안 구석진 곳에 살며 아주 빠르고 생명력이 강해 박멸하기 힘든 불청객은 누구일까요?",
    answer: "바퀴벌레",
  },
  {
    id: "insects020", category: "insects", difficulty: "medium",
    question: "식물의 줄기에 붙어 즙을 빨아먹고 살며 개미와 친하게 지내는 아주 작은 벌레는 누구일까요?",
    answer: "진딧물",
  },
  {
    id: "insects021", category: "insects", difficulty: "easy",
    question: "나뭇가지처럼 똑같이 생겨서 눈을 크게 뜨고 찾아야 보이는 변신의 천재는 누구일까요?",
    answer: "대나무벌레",
  },
  {
    id: "insects022", category: "insects", difficulty: "medium",
    question: "모래 속에 구멍을 파고 개미가 떨어지기를 기다리는 무서운 곤충의 애벌레는 누구일까요?",
    answer: "개미귀신",
  },
  {
    id: "insects023", category: "insects", difficulty: "easy",
    question: "물 위를 미끄러지듯이 아주 빨리 걸어 다닐 수 있는 신기한 다리를 가진 곤충은 누구일까요?",
    answer: "소금쟁이",
  },
  {
    id: "insects024", category: "insects", difficulty: "medium",
    question: "딱딱한 껍질을 가졌으며 굼벵이라 불리는 시절을 보내고 멋진 풍뎅이가 되는 친구는 누구일까요?",
    answer: "굼벵이",
  },
  {
    id: "insects025", category: "insects", difficulty: "easy",
    question: "숲속의 청소부라 불리며 죽은 동물을 깨끗하게 치워주는 고마운 곤충은 누구일까요?",
    answer: "송장벌레",
  },
  {
    id: "insects026", category: "insects", difficulty: "easy",
    question: "다리가 아주 많고 집 안 구석에서 아주 빠르게 움직이는 작고 긴 벌레는 누구일까요?",
    answer: "그리마",
  },
  {
    id: "insects027", category: "insects", difficulty: "medium",
    question: "하얀 실을 뽑아 고치를 만들고 그 실로 우리가 비단옷을 입을 수 있게 해주는 곤충은 누구일까요?",
    answer: "누에나방",
  },
  {
    id: "insects028", category: "insects", difficulty: "easy",
    question: "나무줄기를 타고 올라가 나무 즙을 먹으며 사는, 아주 긴 더듬이를 가진 곤충은 무엇일까요?",
    answer: "하늘소",
  },
  {
    id: "insects029", category: "insects", difficulty: "medium",
    question: "강가 얕은 물 속에서 모래를 모아 예쁜 집을 짓고 사는 수중 건축가는 누구일까요?",
    answer: "날도래",
  },
  {
    id: "insects030", category: "insects", difficulty: "easy",
    question: "예쁜 꽃가루를 몸에 묻혀 식물들이 열매를 맺게 도와주는 파리 친구는 누구일까요?",
    answer: "꽃등에",
  },
  {
    id: "insects031", category: "insects", difficulty: "medium",
    question: "똥을 동그랗게 굴려서 집으로 가져가는 아주 부지런하고 힘이 센 곤충은 누구일까요?",
    answer: "소똥구리",
  },
  {
    id: "insects032", category: "insects", difficulty: "easy",
    question: "가을 밤에 '귀뚤귀뚤' 맑은 목소리로 노래하는 숲속의 음악가는 누구일까요?",
    answer: "귀뚜라미",
  },
  {
    id: "insects033", category: "insects", difficulty: "medium",
    question: "나비가 되기 전 아주 많이 먹고 쑥쑥 자라는 초록색 꿈틀이 친구는 누구일까요?",
    answer: "애벌레",
  },
  {
    id: "insects034", category: "insects", difficulty: "easy",
    question: "나무 속에 구멍을 뚫고 살며 나무를 갉아먹는 아주 작은 벌레는 누구일까요?",
    answer: "나무좀",
  },
  {
    id: "insects035", category: "insects", difficulty: "medium",
    question: "나뭇잎을 동그랗게 말아서 아기가 살 집을 만드는 지혜로운 곤충은 누구일까요?",
    answer: "거위벌레",
  },
  {
    id: "insects036", category: "insects", difficulty: "easy",
    question: "물방울처럼 몸이 둥글고 물 위를 빙글빙글 돌며 노는 곤충은 누구일까요?",
    answer: "물방개",
  },
  {
    id: "insects037", category: "insects", difficulty: "medium",
    question: "머리에 커다란 집게 같은 턱이 달린, 숲속에서 장수풍뎅이와 싸우는 친구는 누구일까요?",
    answer: "사슴벌레",
  },
  {
    id: "insects038", category: "insects", difficulty: "easy",
    question: "등에 아주 단단한 껍질과 멋진 뿔을 가진 곤충의 왕은 누구일까요?",
    answer: "장수풍뎅이",
  },
  {
    id: "insects039", category: "insects", difficulty: "medium",
    question: "물 속에서도 공기 방울을 매달고 숨을 쉬며 사냥하는 수중 사냥꾼은 누구일까요?",
    answer: "방게아재비",
  },
  {
    id: "insects040", category: "insects", difficulty: "easy",
    question: "머리에 뿔이 있고 날개가 작아 날지 못하는, 산 속의 기어 다니는 곤충은 누구일까요?",
    answer: "가뢰",
  },
  {
    id: "insects041", category: "insects", difficulty: "medium",
    question: "배 끝에 달린 등이 밤마다 반짝이는 숲속의 반짝이 친구는 누구일까요?",
    answer: "개똥벌레",
  },
  {
    id: "insects042", category: "insects", difficulty: "easy",
    question: "나비처럼 보이지만 사나운 성격을 가진, 날개가 검은색인 곤충은 누구일까요?",
    answer: "검정나방",
  },
  {
    id: "insects043", category: "insects", difficulty: "medium",
    question: "물 속 모래를 사용하여 정교한 관 모양의 집을 짓는 수중 생물은 누구일까요?",
    answer: "날도래",
  },
  {
    id: "insects044", category: "insects", difficulty: "easy",
    question: "빨간 코트에 검은 점이 일곱 개 있는 귀여운 무당벌레 친구는 누구일까요?",
    answer: "칠성무당벌레",
  },
  {
    id: "insects045", category: "insects", difficulty: "medium",
    question: "민들레 씨앗처럼 가볍게 바람을 타고 날아다니는 가을의 전령사는 누구일까요?",
    answer: "고추잠자리",
  },
  {
    id: "insects046", category: "insects", difficulty: "easy",
    question: "가을 밤 가장 맑은 목소리로 노래하며 '방울방울' 소리를 내는 친구는 누구일까요?",
    answer: "방울벌레",
  },
  {
    id: "insects047", category: "insects", difficulty: "medium",
    question: "겨울에도 죽지 않고 바위 틈에서 추위를 견디는 아주 강한 곤충은 누구일까요?",
    answer: "좀",
  },
  {
    id: "insects048", category: "insects", difficulty: "easy",
    question: "날개 소리가 아주 커서 무섭게 느껴지는 숲속의 덩치 큰 벌은 누구일까요?",
    answer: "뒤영벌",
  },
  {
    id: "insects049", category: "insects", difficulty: "medium",
    question: "물 밑 모래 속에 숨어 있다가 물고기를 잡아먹는 아주 사나운 수중 생물은 누구일까요?",
    answer: "게아재비",
  },
  {
    id: "insects050", category: "insects", difficulty: "easy",
    question: "숲속 나무 진액을 먹으려고 장수풍뎅이와 힘겨루기를 하는 턱이 긴 친구는 누구일까요?",
    answer: "왕사슴벌레",
  },
  {
    id: "insects051", category: "insects", difficulty: "medium",
    question: "비가 오기 전에 떼를 지어 아주 낮게 날아다니는 숲속의 기상 예보관은 누구일까요?",
    answer: "잠자리",
  },
  {
    id: "insects052", category: "insects", difficulty: "easy",
    question: "하얀 솜사탕 같은 것을 몸에 붙이고 식물 즙을 먹으며 사는 벌레는 누구일까요?",
    answer: "솜솜이벌레",
  },
  {
    id: "insects053", category: "insects", difficulty: "medium",
    question: "나뭇잎을 하나씩 정성껏 말아 아기 요람을 만드는 숲속의 공예가는 누구일까요?",
    answer: "거위벌레",
  },
  {
    id: "insects054", category: "insects", difficulty: "easy",
    question: "여름밤 우리 귓가에서 '윙윙' 소리를 내며 잠을 깨우는 얄미운 곤충은 누구일까요?",
    answer: "빨간집모기",
  },
  {
    id: "insects055", category: "insects", difficulty: "medium",
    question: "껍질 속에 몸을 숨기고 봄이 되어 나비로 변하기만을 기다리는 잠자는 성은 무엇일까요?",
    answer: "번데기",
  },
  {
    id: "insects056", category: "insects", difficulty: "easy",
    question: "꿀을 찾아 아주 먼 길을 여행하는 부지런하고 노란색 줄무늬가 있는 친구는 누구일까요?",
    answer: "재래꿀벌",
  },
  {
    id: "insects057", category: "insects", difficulty: "medium",
    question: "물 표면을 스케이트 타듯이 미끄러져 다니는 신기한 발을 가진 곤충은 누구일까요?",
    answer: "소금쟁이",
  },
  {
    id: "insects058", category: "insects", difficulty: "easy",
    question: "숲속의 청소부라 불리며 먹이를 찾아 부지런히 움직이는 개미 친구는 누구일까요?",
    answer: "곰개미",
  },
  {
    id: "insects059", category: "insects", difficulty: "medium",
    question: "화려한 무늬가 있고 단단한 껍질을 가진 숲속에서 가장 아름다운 풍뎅이는 무엇일까요?",
    answer: "비단풍뎅이",
  },
  {
    id: "insects060", category: "insects", difficulty: "easy",
    question: "예쁜 꽃들 사이를 날아다니며 꿀을 먹고 사는 숲속의 작은 요정은 누구일까요?",
    answer: "배추흰나비",
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
