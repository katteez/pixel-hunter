import App from '../../application';
import RulesView from './rules-view';
import rulesData from './rules-data';
import gameState from '../../game-state';
import {resetGame} from '../../game-logic';
import renderScreen from '../../render-screen';

class RulesScreen {
  init() {
    this._view = new RulesView(rulesData.title, rulesData.text);

    this._view.onInputChange = (target, buttonSubmit) => {
      buttonSubmit.disabled = !target.value;
    };

    this._view.onFormSubmit = (input) => {
      gameState.playerName = input.value;
      App.showGame(gameState);
    };

    this._view.onBackButtonClick = resetGame;

    renderScreen(this._view.element);
  }
}

export default new RulesScreen();
