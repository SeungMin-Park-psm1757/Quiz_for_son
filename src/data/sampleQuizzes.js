const sampleQuizzes = [
  {
    id: "animal001",
    category: "animals", // "animals", "science", "fairyTale"
    difficulty: "easy", // "easy", "medium", "hard"
    question: "가장 큰 육상 동물은 무엇일까요?",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/jungwoosquizadventure.appspot.com/o/images%2Felephant.png?alt=media&token=YOUR_TOKEN", // Placeholder
    options: ["기린", "코끼리", "하마", "코뿔소"],
    correctAnswerIndex: 1,
  },
  {
    id: "animal002",
    category: "animals",
    difficulty: "easy",
    question: "밤에 잠을 자지 않고 활동하는 동물은 무엇일까요?",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/jungwoosquizadventure.appspot.com/o/images%2Fowl.png?alt=media&token=YOUR_TOKEN", // Placeholder
    options: ["개", "고양이", "부엉이", "새"],
    correctAnswerIndex: 2,
  },
  {
    id: "animal003",
    category: "animals",
    difficulty: "medium",
    question: "사막에서 물을 저장하는 동물은 무엇일까요?",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/jungwoosquizadventure.appspot.com/o/images%2Fcamel.png?alt=media&token=YOUR_TOKEN", // Placeholder
    options: ["여우", "낙타", "뱀", "전갈"],
    correctAnswerIndex: 1,
  },
  {
    id: "science001",
    category: "science",
    difficulty: "easy",
    question: "물을 얼리면 무엇이 될까요?",
    imageUrl: null,
    options: ["증기", "얼음", "모래", "흙"],
    correctAnswerIndex: 1,
  },
  {
    id: "science002",
    category: "science",
    difficulty: "easy",
    question: "지구의 위성은 무엇일까요?",
    imageUrl: null,
    options: ["태양", "달", "화성", "금성"],
    correctAnswerIndex: 1,
  },
  {
    id: "science003",
    category: "science",
    difficulty: "medium",
    question: "식물이 햇빛을 이용해 스스로 음식을 만드는 과정을 무엇이라고 할까요?",
    imageUrl: null,
    options: ["증발", "광합성", "분해", "호흡"],
    correctAnswerIndex: 1,
  },
  {
    id: "fairyTale001",
    category: "fairyTale",
    difficulty: "easy",
    question: "신데렐라가 무도회에 가기 위해 타고 간 것은 무엇일까요?",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/jungwoosquizadventure.appspot.com/o/images%2Fpumpkin_carriage.png?alt=media&token=YOUR_TOKEN", // Placeholder
    options: ["자동차", "호박 마차", "자전거", "버스"],
    correctAnswerIndex: 1,
  },
  {
    id: "fairyTale002",
    category: "fairyTale",
    difficulty: "easy",
    question: "늑대가 아기 돼지 삼형제의 집을 부수기 위해 사용한 방법은 무엇일까요?",
    imageUrl: null,
    options: ["두드리기", "불어 날리기", "발로 차기", "돌 던지기"],
    correctAnswerIndex: 1,
  },
  {
    id: "fairyTale003",
    category: "fairyTale",
    difficulty: "medium",
    question: "해님과 달님이 된 오누이가 무서워 도망친 동물은 무엇일까요?",
    imageUrl: null,
    options: ["호랑이", "곰", "늑대", "여우"],
    correctAnswerIndex: 0,
  },
  {
    id: "general001",
    category: "science",
    difficulty: "hard",
    question: "새의 뼈는 어떤 특징이 있어서 하늘을 날 수 있을까요?",
    imageUrl: null,
    options: ["무겁다", "속이 비어 있어 가볍다", "단단하다", "유연하다"],
    correctAnswerIndex: 1,
  },
];

export default sampleQuizzes;
