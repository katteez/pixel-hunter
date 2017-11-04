import App from '../../application';
import GreetingView from './greeting-view';
import greetingData from './greeting-data';
import renderScreen from '../../render-screen';

class GreetingScreen {
  init() {
    this.view = new GreetingView(greetingData.title, greetingData.text);
    this.view.onButtonClick = () => App.showRules();
    renderScreen(this.view.element);
  }

  fadeOut() {
    this.view._greetingElement.classList.add(`transparent`);
  }

  fadeIn() {
    this.view._greetingElement.classList.remove(`transparent`);
  }
}

export default new GreetingScreen();
