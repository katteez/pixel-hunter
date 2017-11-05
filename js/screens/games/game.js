import getTimer from '../../get-timer';
import {resetGame, recordAnswer, checkContinue} from '../../game-logic';
import renderScreen from '../../render-screen';

export default class GameScreen {
  constructor() {
    this._view = null;
  }

  init(gameState) {
    const timer = getTimer(gameState.time);

    timer.onUpdate((time) => {
      gameState.time = time;
      this._view.updateTime(time);
    });

    timer.onEnd(() => {
      recordAnswer(false, `unknown`, gameState);
      checkContinue(gameState);
    });

    timer.start();

    this._view.header.onBackButtonClick = () => {
      // eslint-disable-next-line
      const isConfirm = window.confirm(`Вся игра будет потеряна. Продолжить?`);
      if (isConfirm) {
        timer.stop();
        resetGame(gameState);
      }
    };

    this._view.hasCheckedAnswer = (collection) => [...collection].some((item) => item.checked);

    this._view.getCheckedAnswer = (collection) => [...collection].filter((item) => item.checked)[0].value;

    this._view.continueGame = (isCorrect, answerRate) => {
      timer.stop();
      recordAnswer(isCorrect, answerRate, gameState);
      checkContinue(gameState);
    };

    const header = this._view.element.querySelector(`.header`);
    header.appendChild(this._view.header.element);

    renderScreen(this._view.element);
  }
}
