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
}

export default new GreetingScreen();
