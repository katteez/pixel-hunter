import renderScreen from './render-screen';
import greeting from './screens/greeting/greeting';
import game1 from './screens/game-1/game-1';

const INIT_TIME = 15;
const INIT_LIVES = 3;
const INIT_ANSWERS = Array(10).fill(`unknown`);
const INIT_QUESTION_NUMBER = 0;
const INIT_WIN = false;

const goBack = (gameState) => {
  if (gameState) {
    gameState.time = INIT_TIME;
    gameState.lives = INIT_LIVES;
    gameState.answers = INIT_ANSWERS;
    gameState.questionNumber = INIT_QUESTION_NUMBER;
    gameState.win = INIT_WIN;
  }
  renderScreen(greeting);
};

const getAnswerType = (answerTime) => {
  let answerType;
  if (answerTime < 10) {
    answerType = `fast`;
  } else if (answerTime <= 20) {
    answerType = `normal`;
  } else {
    answerType = `slow`;
  }
  return answerType;
};

const recordAnswer = (answerCorrectness, answerType, gameState) => {
  if (answerCorrectness) {
    if (answerType === `normal`) {
      gameState.answers[gameState.questionNumber] = `correct`;
    } else {
      gameState.answers[gameState.questionNumber] = answerType;
    }
  } else {
    gameState.answers[gameState.questionNumber] = `wrong`;
    gameState.lives--;
  }
  gameState.questionNumber += 1;
};

const checkContinue = (gameState, data) => {
  if (gameState.lives < 0) {
    gameState.win = false;
    renderScreen(data.endScreen(gameState));
  } else if (gameState.questionNumber === 10) {
    gameState.win = true;
    renderScreen(data.endScreen(gameState));
  } else {
    if (!data.nextScreen) { // вместо этого if/else должна быть только строчка 59, но с 3го экрана в data.nextScreen приходит undefined. Не пойму почему.
      renderScreen(game1(gameState));
    } else {
      renderScreen(data.nextScreen(gameState));
    }
  }
};

export {goBack, getAnswerType, recordAnswer, checkContinue};
