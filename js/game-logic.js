import renderScreen from './render-screen';
import greeting from './screens/greeting/greeting';
import gameData from './screens/games/gameData';
import game1 from './screens/games/game-1';
import game2 from './screens/games/game-2';
import game3 from './screens/games/game-3';
import stats from './screens/stats/stats';

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
    gameState.answers[gameState.questionNumber] = answerRate;
  } else {
    gameState.answers[gameState.questionNumber] = `wrong`;
    gameState.lives--;
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

export {resetGame, getAnswerRate, recordAnswer, checkContinue};
