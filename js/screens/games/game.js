import {resetGame, recordAnswer, checkContinue, startTimer} from '../../game-logic';

export default (gameState, gameScreen, questionType) => {
  const timerTask = startTimer(gameState, gameScreen, questionType);

  gameScreen.header.onBackButtonClick = () => {
    timerTask.stop();
    resetGame(gameState);
  };

  gameScreen.continueGame = (isCorrect, answerRate) => {
    timerTask.stop();
    recordAnswer(isCorrect, answerRate, gameState);
    checkContinue(gameState, questionType);
  };

  gameScreen.element.querySelector(`.header`).appendChild(gameScreen.header.element);
};
