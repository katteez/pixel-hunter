import AbstractView from '../abstract-view';
import HeaderView from '../header/header-view';

export default class GameView extends AbstractView {
  constructor(question, gameState) {
    super();
    this.question = question;
    this.header = new HeaderView(gameState);
  }

  onFormClick() {}

  continueGame() {}

  onBackButtonClick() {}

  updateTime(time) {
    this.header.timerElement.textContent = time;
  }
}
