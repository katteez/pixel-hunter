import getHtmlElement from '../../create-element';
import getHeader from '../header/header';
import statsBar from '../stats-bar';
import pictures from '../../pictures';
import playerAnswers from '../../player-answers';
import data from './game-3-data';
import {getUniqueImgArray} from '../../utils';
import {goBack, getAnswerType, recordAnswer, checkContinue} from '../../game-logic';

const RIGHT_IMG_TYPE = `paint`;
const IMG_COUNT = 3;
let imgArray = getUniqueImgArray(pictures, IMG_COUNT);

export default (gameState) => {
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
    ${statsBar(gameState)}
  </div>`;

  const game3 = getHtmlElement(innerHTML);
  const answersForm = game3.querySelector(`.game__content`);
  const goBackButton = game3.querySelector(`.back`);

  const imgSrcArray = imgArray.map((img) => img.imgSrc);

  answersForm.addEventListener(`click`, (e) => {
    if (e.target.classList.contains(`game__option`)) {
      let answerIndex = imgSrcArray.indexOf(e.target.children[0].src);
      let answerType = getAnswerType(gameState.time);
      let answerCorrectness = imgArray[answerIndex].imgType === RIGHT_IMG_TYPE;

      playerAnswers[gameState.questionNumber] = {
        isCorrect: answerCorrectness,
        answerRate: answerType
      };

      recordAnswer(answerCorrectness, answerType, gameState);
      checkContinue(gameState, data);
    }
  });

  goBackButton.addEventListener(`click`, goBack.bind({}, gameState));

  return game3;
};
