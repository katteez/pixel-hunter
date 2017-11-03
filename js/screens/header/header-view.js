import AbstractView from '../abstract-view';
import headerBack from './header-back';

export default class HeaderView extends AbstractView {
  constructor(gameState) {
    super();
    this.gameState = gameState;
  }

  get template() {
    return String.raw `
    ${headerBack}
      <h1 class="game__timer">${this.gameState.time}</h1>
      <div class="game__lives">
      ${new Array(3 - this.gameState.lives)
      .fill(`<img src="img/heart__empty.svg" class="game__heart" alt="Life" width="32" height="32">`).join(``)}
      ${new Array(this.gameState.lives)
      .fill(`<img src="img/heart__full.svg" class="game__heart" alt="Life" width="32" height="32">`).join(``)}
      </div>`;
  }

  bind() {
    const goBackButton = this.element.querySelector(`.back`);

    goBackButton.addEventListener(`click`, this.onBackButtonClick);
  }

  onBackButtonClick() {}

  get timerElement() {
    return this.element.querySelector(`.game__timer`);
  }
}
