import AbstractView from '../abstract-view';

export default class GreetingView extends AbstractView {
  constructor(title, text) {
    super();
    this._title = title;
    this._text = text;
  }

  get template() {
    return String.raw`
      <div class="greeting central--blur">
        <div class="greeting__logo"><img src="img/logo_big.png" width="201" height="89" alt="Pixel Hunter"></div>
        <h1 class="greeting__asterisk">*</h1>
        <div class="greeting__challenge">
          <h3>${this._title}</h3>
          <p>${this._text}</p>
        </div>
        <div class="greeting__continue"><span><img src="img/arrow_right.svg" width="64" height="64" alt="Next"></span></div>
      </div>`;
  }

  get greetingElement() {
    return this.element.querySelector(`.greeting`);
  }

  bind() {
    const continueButton = this.element.querySelector(`.greeting__continue`);

    continueButton.addEventListener(`click`, this.onButtonClick);
  }

  onButtonClick() {}
}
