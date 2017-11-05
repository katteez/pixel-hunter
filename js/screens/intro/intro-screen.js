import App from '../../application';
import IntroView from './intro-view';

const REMOVE_ELEMENT_TIME = 1000;

class IntroScreen {
  init() {
    this._view = new IntroView();
    this._view.onButtonClick = App.showGreeting;
    this._view.element.classList.add(`intro-wrap`);
    App.mainElement.appendChild(this._view.element);
  }

  remove() {
    this._view.element.classList.add(`transparent`);
    setTimeout(() => {
      this._view.element.remove();
    }, REMOVE_ELEMENT_TIME);
  }
}

export default new IntroScreen();
