import App from '../../application';
import GreetingView from './greeting-view';
import greetingData from './greeting-data';
import renderScreen from '../../render-screen';

class GreetingScreen {
  init() {
    this._view = new GreetingView(greetingData.title, greetingData.text);
    this._view.onButtonClick = () => App.showRules();
    renderScreen(this._view.element);
  }

  fadeOut() {
    this._view.greetingElement.classList.add(`transparent`);
  }

  fadeIn() {
    this._view.greetingElement.classList.remove(`transparent`);
  }
}

export default new GreetingScreen();
