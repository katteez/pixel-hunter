import getHtmlElement from '../../create-element';
import getHeader from '../header/header';
import statsBar from '../stats-bar';
import pictures from '../../pictures';
import playerAnswers from '../../player-answers';
import {getUniqueImgArray} from '../../utils';
import {resetGame, getAnswerRate, recordAnswer, checkContinue} from '../../game-logic';

const RIGHT_IMG_TYPE = `paint`;
const IMG_COUNT = 3;
let imgArray = getUniqueImgArray(pictures, IMG_COUNT);

export default (data, gameState) => {
  const innerHTML = String.raw`
  ${getHeader(gameState)}
  <div class="game">
    <p class="game__task">${data.text}</p>
    <form class="game__content  game__content--triple">
      <div class="game__option">
        <img src="${imgArray[0].imgSrc}" alt="Option 1">
      </div>
      <div class="game__option  game__option--selected">
        <img src="${imgArray[1].imgSrc}" alt="Option 1">
      </div>
      <div class="game__option">
        <img src="${imgArray[2].imgSrc}" alt="Option 1">
      </div>
    </form>
    <div class="stats">
      ${statsBar(gameState)}
    </div>
  </div>`;

  const game3 = getHtmlElement(innerHTML);
  const answersForm = game3.querySelector(`.game__content`);
  const goBackButton = game3.querySelector(`.back`);

  const imgSrcArray = imgArray.map((img) => img.imgSrc);

  answersForm.addEventListener(`click`, (e) => {
    if (e.target.classList.contains(`game__option`)) {
      let answerIndex = imgSrcArray.indexOf(e.target.children[0].src);
      let isCorrect = imgArray[answerIndex].imgType === RIGHT_IMG_TYPE;
      let answerRate = getAnswerRate(gameState.time);

      playerAnswers[gameState.questionNumber] = {isCorrect, answerRate};

      recordAnswer(isCorrect, answerRate, gameState);
      checkContinue(gameState, data.type);
    }
  });

  goBackButton.addEventListener(`click`, () => resetGame(gameState));

  return game3;
};
