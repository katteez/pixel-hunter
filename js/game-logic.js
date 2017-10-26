import renderScreen from './render-screen';
import greeting from './screens/greeting/greeting';
import game1 from './screens/game-1/game-1';

const goBack = (gameState) => {
  if (gameState) {
    gameState.time = 15;
    gameState.lives = 3;
    gameState.answers = Array(10).fill(`unknown`);
    gameState.questionNumber = 0;
    gameState.win = false;
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
