import AbstractView from '../abstract-view';

export default class IntroView extends AbstractView {
  constructor(text) {
    super();
    this.text = text;
  }

  get template() {
    return String.raw`
      <div id="main" class="central__content">
        <div id="intro" class="intro">
          <h1 class="intro__asterisk">*</h1>
          <p class="intro__motto"><sup>*</sup>${this.text}</p>
        </div>
      </div>`;
  }

  bind() {
    const asteriskButton = this.element.querySelector(`.intro__asterisk`);

    asteriskButton.addEventListener(`click`, this.onButtonClick);
  }

  onButtonClick() {}
}
