import renderScreen from './render-screen';
import greeting from './screens/greeting/greeting';
import game1 from './screens/games/game-1';
import game2 from './screens/games/game-2';
import game3 from './screens/games/game-3';
import stats from './screens/stats/stats';
import gameData from './screens/games/gameData';
import statsData from './screens/stats/stats-data';
import getTimer from './get-timer';

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
  renderScreen(greeting);
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
    renderScreen(stats(gameState));
  } else if (gameState.questionNumber === 10) {
    gameState.win = true;
    renderScreen(stats(gameState));
  } else {
    gameState.time = INIT_TIME;

    switch (questionType) {
      case `game1`:
        renderScreen(game2(gameData[1], gameState));
        break;
      case `game2`:
        renderScreen(game3(gameData[2], gameState));
        break;
      case `game3`:
        renderScreen(game1(gameData[0], gameState));
        break;
    }
  }
};

const startTimer = (gameState, gameScreen, questionType) => {
  let timeoutHolder = {};

  const goTimer = () => {
    const timer = getTimer(gameState.time);
    gameState.time = timer.tick();
    gameScreen.updateTime(gameState.time);
    if (gameState.time > 0) {
      timeoutHolder.value = setTimeout(goTimer, 1000);
    } else {
      recordAnswer(false, `unknown`, gameState);
      checkContinue(gameState, questionType);
    }
  };

  timeoutHolder.value = setTimeout(goTimer, 1000);
  return timeoutHolder;
};

export {resetGame, getAnswerRate, recordAnswer, checkContinue, startTimer};
