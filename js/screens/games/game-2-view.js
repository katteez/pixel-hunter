import GameView from './game-view';

export default class Game2View extends GameView {
  constructor(gameState, statsBar, data) {
    super(data.question, gameState);
    this.statsBar = statsBar(gameState);
    this.answers = data.answers;
  }

  get template() {
    return String.raw`
    <header class="header"></header>
    <div class="game">
      <p class="game__task">${this.question}</p>
      <form class="game__content  game__content--wide">
        <div class="game__option">
          <img src="${this.answers[0].image.url}" alt="Option 1" width="705" height="455">
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
    super.bind();
    const answersForm = this.element.querySelector(`.game__content`);
    const questions1 = answersForm.querySelectorAll(`input[name=question1]`);

    answersForm.addEventListener(`click`, () => this.onFormClick(questions1, this.answers[0].type));
  }
}
