import AbstractView from '../abstract-view';
import HeaderView from '../header/header-view';

export default class Game1View extends AbstractView {
  constructor(gameState, statsBar, text, img1, img2) {
    super();
    this.gameState = gameState;
    this.header = new HeaderView(this.gameState);
    this.statsBar = statsBar(this.gameState);
    this.text = text;
    this.img1 = img1;
    this.img2 = img2;
  }

  get template() {
    return String.raw`
    ${this.header.template}
    <div class="game">
      <p class="game__task">${this.text}</p>
      <form class="game__content">
        <div class="game__option">
          <img src="${this.img1.imgSrc}" alt="Option 1">
          <label class="game__answer game__answer--photo">
            <input name="question1" type="radio" value="photo">
            <span>Фото</span>
          </label>
          <label class="game__answer game__answer--paint">
            <input name="question1" type="radio" value="paint">
            <span>Рисунок</span>
          </label>
        </div>
        <div class="game__option">
          <img src="${this.img2.imgSrc}" alt="Option 2">
          <label class="game__answer  game__answer--photo">
            <input name="question2" type="radio" value="photo">
            <span>Фото</span>
          </label>
          <label class="game__answer  game__answer--paint">
            <input name="question2" type="radio" value="paint">
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
    const questions2 = answersForm.querySelectorAll(`input[name=question2]`);
    const goBackButton = this.element.querySelector(`.back`);
    this.timerElement = this.element.querySelector(`.game__timer`);

    answersForm.addEventListener(`click`, () => this.onFormClick(questions1, questions2, this.img1.imgType, this.img2.imgType));
    goBackButton.addEventListener(`click`, this.onBackButtonClick);
  }

  onFormClick() {}

  onBackButtonClick() {}

  updateTime(time) {
    this.timerElement.textContent = time;
  }
}
