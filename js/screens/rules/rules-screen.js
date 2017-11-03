import App from '../../application';
import RulesView from './rules-view';
import rulesData from './rules-data';
import gameState from '../../game-state';
import {resetGame} from '../../game-logic';
import renderScreen from '../../render-screen';

class RulesScreen {
  init() {
    this.view = new RulesView(rulesData.title, rulesData.text);

    this.view.onInputChange = (target, buttonSubmit) => {
      buttonSubmit.disabled = !target.value;
    };

    this.view.onFormSubmit = (input) => {
      gameState.playerName = input.value;
      App.showGame1(gameState);
    };

    this.view.onBackButtonClick = resetGame;

    renderScreen(this.view.element);
  }
}

export default new RulesScreen();
