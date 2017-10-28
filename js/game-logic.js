import renderScreen from './render-screen';
import greeting from './screens/greeting/greeting';
import game1 from './screens/game-1/game-1';

const resetGame = (gameState) => {
  if (gameState) {
    gameState.time = 15;
    gameState.lives = 3;
    gameState.answers = Array(10).fill(`unknown`);
    gameState.questionNumber = 0;
    gameState.win = false;
  }
  renderScreen(greeting);
};

const getAnswerRate = (answerTime) => {
  let answerRate;
  if (answerTime < 10) {
    answerRate = `fast`;
  } else if (answerTime <= 20) {
    answerRate = `normal`;
  } else {
    answerRate = `slow`;
  }
  return answerRate;
};

const recordAnswer = (isCorrect, answerRate, gameState) => {
  if (isCorrect) {
    if (answerRate === `normal`) {
      gameState.answers[gameState.questionNumber] = `correct`;
    } else {
      gameState.answers[gameState.questionNumber] = answerRate;
    }
  } else {
    gameState.answers[gameState.questionNumber] = `wrong`;
    gameState.lives--;
  }
  gameState.questionNumber++;
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

export {resetGame, getAnswerRate, recordAnswer, checkContinue};
