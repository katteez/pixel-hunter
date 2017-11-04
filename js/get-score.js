const QUESTIONS_COUNT = 10;
const LIVES_COUNT = 3;
const MIN_CORRECT_ANSWERS = QUESTIONS_COUNT - LIVES_COUNT;
const SCORES_FOR_LIVES = 50;
const CORRECT_ANSWER_SCORES = 100;

const AnswerRateScores = {
  SLOW: -50,
  NORMAL: 0,
  FAST: 50
};

const getScore = (answers, remainingLives) => {

  if (!Array.isArray(answers)) {
    throw new Error(`Not an array`);
  }

  if (typeof remainingLives !== `number`) {
    throw new Error(`Not a number`);
  }

  if (remainingLives < -1) {
    throw new Error(`Reduced the allowed count of lives`);
  }

  if (remainingLives > LIVES_COUNT) {
    throw new Error(`Exceeded the allowed count of lives`);
  }

  if (answers.length < QUESTIONS_COUNT) {
    return -1;
  }

  const correctAnswersCount = answers.filter((currentAnswer) => currentAnswer && currentAnswer.isCorrect).length;

  if (correctAnswersCount < MIN_CORRECT_ANSWERS) {
    return -1;
  }

  const resultScores = answers.reduce((sumScores, currentAnswer) => {
    if (currentAnswer.isCorrect) {
      sumScores += CORRECT_ANSWER_SCORES + AnswerRateScores[currentAnswer.answerRate.toUpperCase()];
    }
    return sumScores;
  }, 0);

  return remainingLives * SCORES_FOR_LIVES + resultScores;
};

export default getScore;
