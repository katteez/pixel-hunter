import getTimer from '../../get-timer';
import {resetGame, recordAnswer, checkContinue} from '../../game-logic';

export default (gameState, gameScreen, questionType) => {
  const timer = getTimer(gameState.time);

  timer.onUpdate((time) => {
    gameState.time = time;
    gameScreen.updateTime(time);
  });

  timer.onEnd(() => {
    recordAnswer(false, `unknown`, gameState);
    checkContinue(gameState, questionType);
  });

  timer.start();

  gameScreen.header.onBackButtonClick = () => {
    timer.stop();
    resetGame(gameState);
  };

  gameScreen.continueGame = (isCorrect, answerRate) => {
    timer.stop();
    recordAnswer(isCorrect, answerRate, gameState);
    checkContinue(gameState, questionType);
  };

  gameScreen.element.querySelector(`.header`).appendChild(gameScreen.header.element);
};
