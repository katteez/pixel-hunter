import GameView from './game-view';

export default class Game1View extends GameView {
  constructor(gameState, statsBar, data) {
    super(data.question, gameState);
    this._statsBar = statsBar(gameState);
    this._answers = data.answers;
  }

  get template() {
    return String.raw`
    <header class="header"></header>
    <div class="game">
      <p class="game__task">${this._question}</p>
      <form class="game__content">
        <div class="game__option">
          <img src="${this._answers[0].image.url}" alt="Option 1">
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
          <img src="${this._answers[1].image.url}" alt="Option 2">
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
        ${this._statsBar}
      </div>
    </div>`;
  }

  bind() {
    super.bind();
    const answersForm = this.element.querySelector(`.game__content`);
    const questions1 = answersForm.querySelectorAll(`input[name=question1]`);
    const questions2 = answersForm.querySelectorAll(`input[name=question2]`);

    answersForm.addEventListener(`click`, () => this.onFormClick(questions1, questions2, this._answers[0].type, this._answers[1].type));
  }
}
