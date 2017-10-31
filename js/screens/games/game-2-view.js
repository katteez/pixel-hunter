import AbstractView from '../abstract-view';
import HeaderView from '../header/header-view';

export default class Game2View extends AbstractView {
  constructor(gameState, statsBar, text, img) {
    super();
    this.gameState = gameState;
    this.header = new HeaderView(this.gameState);
    this.statsBar = statsBar(this.gameState);
    this.text = text;
    this.img = img;
  }

  get template() {
    return String.raw`
    ${this.header.template}
    <div class="game">
      <p class="game__task">${this.text}</p>
      <form class="game__content  game__content--wide">
        <div class="game__option">
          <img src="${this.img.imgSrc}" alt="Option 1" width="705" height="455">
          <label class="game__answer  game__answer--photo">
            <input name="question1" type="radio" value="photo">
            <span>Фото</span>
          </label>
          <label class="game__answer  game__answer--wide  game__answer--paint">
            <input name="question1" type="radio" value="paint">
            <span>Рисунок</span>
          </label>
        </div>
      </form>
      <div class="stats">
        ${this.statsBar}
      </div>
    </div>`;
  }

  bind() {
    const answersForm = this.element.querySelector(`.game__content`);
    const questions1 = answersForm.querySelectorAll(`input[name=question1]`);
    const goBackButton = this.element.querySelector(`.back`);

    answersForm.addEventListener(`click`, () => this.onFormClick(questions1, this.img.imgType));
    goBackButton.addEventListener(`click`, this.onBackButtonClick);
  }

  onFormClick() {}

  onBackButtonClick() {}
}
