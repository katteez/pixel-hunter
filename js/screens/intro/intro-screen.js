import App from '../../application';
import IntroView from './intro-view';
import renderScreen from '../../render-screen';

class IntroScreen {
  init() {
    this.view = new IntroView();
    this.view.onButtonClick = () => App.showGreeting();
    renderScreen(this.view.element);
  }
}

export default new IntroScreen();
