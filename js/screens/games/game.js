import getTimer from '../../get-timer';
import {resetGame, recordAnswer, checkContinue} from '../../game-logic';
import renderScreen from '../../render-screen';

export default class GameScreen {
  constructor() {
    this.view = null;
  }

  init(gameState) {
    const timer = getTimer(gameState.time);

    timer.onUpdate((time) => {
      gameState.time = time;
      this.view.updateTime(time);
    });

    timer.onEnd(() => {
      recordAnswer(false, `unknown`, gameState);
      checkContinue(gameState);
    });

    timer.start();

    this.view.header.onBackButtonClick = () => {
      // eslint-disable-next-line
      const isConfirm = window.confirm(`Вся игра будет потеряна. Продолжить?`);
      if (isConfirm) {
        timer.stop();
        resetGame(gameState);
      }
    };

    this.view.continueGame = (isCorrect, answerRate) => {
      timer.stop();
      recordAnswer(isCorrect, answerRate, gameState);
      checkContinue(gameState);
    };

    const header = this.view.element.querySelector(`.header`);
    header.appendChild(this.view.header.element);

    renderScreen(this.view.element);
  }
}
