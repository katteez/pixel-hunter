import {resetGame, recordAnswer, checkContinue, startTimer} from '../../game-logic';
import renderScreen from '../../render-screen';

export default class GameScreen {
  constructor() {
    this.view = null;
  }

  init(gameState) {
    const timerTask = startTimer(gameState, this.view);

    this.view.header.onBackButtonClick = () => {
      timerTask.stop();
      resetGame(gameState);
    };

    this.view.continueGame = (isCorrect, answerRate) => {
      timerTask.stop();
      recordAnswer(isCorrect, answerRate, gameState);
      checkContinue(gameState, this.view.questionType);
    };

    const header = this.view.element.querySelector(`.header`);
    header.appendChild(this.view.header.element);

    renderScreen(this.view.element);
  }
}
