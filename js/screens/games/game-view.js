import AbstractView from '../abstract-view';
import HeaderView from '../header/header-view';

export default class GameView extends AbstractView {
  constructor(questionType, text, gameState) {
    super();
    this.questionType = questionType;
    this.text = text;
    this.gameState = gameState;
    this.header = new HeaderView(this.gameState);
  }

  onFormClick() {}

  continueGame() {}

  onBackButtonClick() {}

  updateTime(time) {
    this.header.timerElement.textContent = time;
  }
}
