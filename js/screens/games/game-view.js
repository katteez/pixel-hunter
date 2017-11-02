import AbstractView from '../abstract-view';
import HeaderView from '../header/header-view';

export default class GameView extends AbstractView {
  constructor(gameState, text) {
    super();
    this.gameState = gameState;
    this.header = new HeaderView(this.gameState);
    this.text = text;
  }

  onFormClick() {}

  continueGame() {}

  onBackButtonClick() {}

  updateTime(time) {
    this.header.timerElement.textContent = time;
  }
}
