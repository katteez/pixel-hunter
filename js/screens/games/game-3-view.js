import GameView from './game-view';

export default class Game3View extends GameView {
  constructor(gameState, statsBar, text, img1, img2, img3) {
    super(gameState, text);
    this.gameState = gameState;
    this.statsBar = statsBar(this.gameState);
    this.img1 = img1;
    this.img2 = img2;
    this.img3 = img3;
  }

  get template() {
    return String.raw`
    <header class="header"></header>
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
    super.bind();
    const answersForm = this.element.querySelector(`.game__content`);

    answersForm.addEventListener(`click`, (e) => this.onFormClick(e));
  }
}
