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
    if (time < 6) {
      this.header.timerElement.classList.add(`flicker`);
    }
    this.header.timerElement.textContent = time;
  }
}
