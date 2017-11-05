import GameView from './game-view';

export default class Game3View extends GameView {
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
      <form class="game__content  game__content--triple">
        <div class="game__option">
          <img src="${this._answers[0].image.url}" alt="Option 1">
        </div>
        <div class="game__option  game__option--selected">
          <img src="${this._answers[1].image.url}" alt="Option 1">
        </div>
        <div class="game__option">
          <img src="${this._answers[2].image.url}" alt="Option 1">
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

    answersForm.addEventListener(`click`, (e) => this.onFormClick(e, this._question));
  }
}
