import AbstractView from '../abstract-view';
import HeaderView from '../header/header-view';

export default class Game3View extends AbstractView {
  constructor(gameState, statsBar, text, img1, img2, img3) {
    super();
    this.gameState = gameState;
    this.header = new HeaderView(this.gameState);
    this.statsBar = statsBar(this.gameState);
    this.text = text;
    this.img1 = img1;
    this.img2 = img2;
    this.img3 = img3;
  }

  get template() {
    return String.raw`
    ${this.header.template}
    <div class="game">
      <p class="game__task">${this.text}</p>
      <form class="game__content  game__content--triple">
        <div class="game__option">
          <img src="${this.img1.imgSrc}" alt="Option 1">
        </div>
        <div class="game__option  game__option--selected">
          <img src="${this.img2.imgSrc}" alt="Option 1">
        </div>
        <div class="game__option">
          <img src="${this.img3.imgSrc}" alt="Option 1">
        </div>
      </form>
      <div class="stats">
        ${this.statsBar}
      </div>
    </div>`;
  }

  bind() {
    const answersForm = this.element.querySelector(`.game__content`);
    const goBackButton = this.element.querySelector(`.back`);
    this.timerElement = this.element.querySelector(`.game__timer`);

    answersForm.addEventListener(`click`, (e) => this.onFormClick(e));
    goBackButton.addEventListener(`click`, this.onBackButtonClick);
  }

  onFormClick() {}

  onBackButtonClick() {}

  updateTime(time) {
    this.timerElement.textContent = time;
  }
}
