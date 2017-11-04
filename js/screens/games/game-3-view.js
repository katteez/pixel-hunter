import GameView from './game-view';

export default class Game3View extends GameView {
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
      <form class="game__content  game__content--triple">
        <div class="game__option">
          <img src="${this.answers[0].image.url}" alt="Option 1">
        </div>
        <div class="game__option  game__option--selected">
          <img src="${this.answers[1].image.url}" alt="Option 1">
        </div>
        <div class="game__option">
          <img src="${this.answers[2].image.url}" alt="Option 1">
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

    answersForm.addEventListener(`click`, (e) => this.onFormClick(e, this.question));
  }
}
