const VALID_DIFFICULTIES = new Set(["easy", "medium", "hard"]);

export const normalizeDifficulty = (difficulty) =>
  VALID_DIFFICULTIES.has(difficulty) ? difficulty : "medium";

const getQuestionPriorityScore = (question) => {
  const difficulty = normalizeDifficulty(question.difficulty);
  return difficulty === "easy" ? 0 : difficulty === "medium" ? 1 : 6;
};

const shuffle = (items) =>
  [...items].sort(() => Math.random() - 0.5);

export const selectQuestionsForYoungLearner = (
  questions,
  count = 10
) => {
  const normalized = questions.map((question) => ({
    ...question,
    difficulty: normalizeDifficulty(question.difficulty),
  }));

  const withoutHardQuestions = normalized.filter(
    (question) => question.difficulty !== "hard"
  );
  const candidatePool =
    withoutHardQuestions.length >= count ? withoutHardQuestions : normalized;

  const ranked = shuffle(candidatePool)
    .map((question) => ({
      question,
      score: getQuestionPriorityScore(question),
    }))
    .sort((left, right) => left.score - right.score);

  const preferredPool = ranked
    .slice(0, Math.min(candidatePool.length, count * 2))
    .map(({ question }) => question);

  return shuffle(preferredPool).slice(0, count);
};
