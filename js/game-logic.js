import App from './application';
import statsData from './screens/stats/stats-data';

const INIT_TIME = 30;
const INIT_LIVES = 3;

const resetGame = (gameState) => {
  if (gameState) {
    gameState.time = INIT_TIME;
    gameState.lives = INIT_LIVES;
    gameState.answers = Array(10).fill(`unknown`);
    gameState.questionNumber = 0;
    gameState.win = false;
  }
  App.showGreeting();
};

const getAnswerRate = (answerTime) => {
  let answerRate;
  if (answerTime > 20) {
    answerRate = `fast`;
  } else if (answerTime >= 10) {
    answerRate = `normal`;
  } else {
    answerRate = `slow`;
  }
  return answerRate;
};

const recordAnswer = (isCorrect, answerRate, gameState) => {
  if (answerRate !== `unknown`) {
    statsData.playerAnswers[gameState.questionNumber] = {isCorrect, answerRate};
  }

  if (isCorrect) {
    gameState.answers[gameState.questionNumber] = answerRate;
  } else {
    gameState.lives--;

    if (answerRate === `unknown`) {
      gameState.answers[gameState.questionNumber] = answerRate;
    } else {
      gameState.answers[gameState.questionNumber] = `wrong`;
    }
  }
  gameState.questionNumber++;
};

const checkContinue = (gameState, questionType) => {
  if (gameState.lives < 0) {
    gameState.win = false;
    App.showStats(gameState);
  } else if (gameState.questionNumber === 10) {
    gameState.win = true;
    App.showStats(gameState);
  } else {
    gameState.time = INIT_TIME;

    switch (questionType) {
      case `game1`:
        App.showGame2(gameState);
        break;
      case `game2`:
        App.showGame3(gameState);
        break;
      case `game3`:
        App.showGame1(gameState);
        break;
    }
  }
};

export {resetGame, getAnswerRate, recordAnswer, checkContinue};
