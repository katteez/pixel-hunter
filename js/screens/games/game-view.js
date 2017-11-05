import AbstractView from '../abstract-view';
import HeaderView from '../header/header-view';

export default class GameView extends AbstractView {
  constructor(question, gameState) {
    super();
    this._question = question;
    this._header = new HeaderView(gameState);
  }

  get header() {
    return this._header;
  }

  updateTime(time) {
    if (time === 5) {
      this._header.timerElement.classList.add(`flicker`);
    }
    this._header.timerElement.textContent = time;
  }

  continueGame() {}

  onFormClick() {}
}
