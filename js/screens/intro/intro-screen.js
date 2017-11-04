import App from '../../application';
import IntroView from './intro-view';

const REMOVE_ELEMENT_TIME = 1000;
const mainElement = document.querySelector(`.central`);

class IntroScreen {
  init() {
    this.view = new IntroView();
    this.view.onButtonClick = App.showGreeting;
    const introElement = this.view.element;
    introElement.classList.add(`intro-wrap`);
    mainElement.appendChild(introElement);
  }

  remove() {
    this.view.element.classList.add(`transparent`);
    setTimeout(() => {
      this.view.element.remove();
    }, REMOVE_ELEMENT_TIME);
  }
}

export default new IntroScreen();
