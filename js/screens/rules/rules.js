import RulesView from './rules-view';
import data from './rules-data';
import gameData from '../games/gameData';
import gameState from '../../game-state';
import game1 from '../games/game-1';
import renderScreen from '../../render-screen';
import {resetGame} from '../../game-logic';

const rulesScreen = new RulesView(data.title, data.text);

rulesScreen.onInputChange = (target, buttonSubmit) => {
  buttonSubmit.disabled = !target.value;
};

rulesScreen.onFormSubmit = () => renderScreen(game1(gameData[0], gameState));

rulesScreen.onBackButtonClick = resetGame;

export default rulesScreen.element;
