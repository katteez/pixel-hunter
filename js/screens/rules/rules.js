import getHtmlElement from '../../create-element';
import headerBack from '../header/header-back';
import gameState from '../../game-state';
import data from './rules-data';
import renderScreen from '../../render-screen';
import {resetGame} from '../../game-logic';

const innerHtml = String.raw`
  ${headerBack}
  <div class="rules">
    <h1 class="rules__title">${data.title}</h1>
    <p class="rules__description">${data.text}</p>
    <form class="rules__form">
      <input class="rules__input" type="text" placeholder="Ваше Имя">
      <button class="rules__button  continue" type="submit" disabled>Go!</button>
    </form>
  </div>`;

const rules = getHtmlElement(innerHtml);
const playerName = rules.querySelector(`.rules__input`);
const beginGameButton = rules.querySelector(`.rules__button`);
const goBackButton = rules.querySelector(`.back`);

playerName.addEventListener(`input`, (e) => {
  beginGameButton.disabled = !e.target.value;
});

beginGameButton.addEventListener(`click`, () => {
  renderScreen(data.nextScreen(gameState));
});

goBackButton.addEventListener(`click`, resetGame);

export default rules;
