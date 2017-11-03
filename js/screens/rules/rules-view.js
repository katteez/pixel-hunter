import AbstractView from '../abstract-view';
import headerBack from '../header/header-back';

export default class RulesView extends AbstractView {
  constructor(title, text) {
    super();
    this.title = title;
    this.text = text;
  }

  get template() {
    return String.raw`
      ${headerBack}
      <div class="rules">
        <h1 class="rules__title">${this.title}</h1>
        <p class="rules__description">${this.text}</p>
        <form class="rules__form">
          <input class="rules__input" type="text" placeholder="Ваше Имя">
          <button class="rules__button  continue" type="submit" disabled>Go!</button>
        </form>
      </div>`;
  }

  bind() {
    const playerName = this.element.querySelector(`.rules__input`);
    const buttonSubmit = this.element.querySelector(`.rules__button`);
    const goBackButton = this.element.querySelector(`.back`);

    playerName.addEventListener(`input`, (e) => this.onInputChange(e.target, buttonSubmit));
    buttonSubmit.addEventListener(`click`, this.onFormSubmit);
    goBackButton.addEventListener(`click`, this.onBackButtonClick);
  }

  onInputChange() {}

  onFormSubmit() {}

  onBackButtonClick() {}
}