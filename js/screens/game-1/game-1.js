import getHtmlElement from '../../create-element';
import getHeader from '../header/header';
import statsBar from '../stats-bar';
import pictures from '../../pictures';
import playerAnswers from '../../player-answers';
import data from './game-1-data';
import {getUniqueImgArray} from '../../utils';
import {goBack, getAnswerType, recordAnswer, checkContinue} from '../../game-logic';

const IMG_COUNT = 2;
let imgArray = getUniqueImgArray(pictures, IMG_COUNT);

export default (gameState) => {
  const innerHTML = String.raw`
  ${getHeader(gameState)}
  <div class="game">
    <p class="game__task">${data.text}</p>
    <form class="game__content">
      <div class="game__option">
        <img src="${imgArray[0].imgSrc}" alt="Option 1">
        <label class="game__answer game__answer--photo">
          <input name="question1" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer game__answer--paint">
          <input name="question1" type="radio" value="paint">
          <span>Рисунок</span>
        </label>
      </div>
      <div class="game__option">
        <img src="${imgArray[1].imgSrc}" alt="Option 2">
        <label class="game__answer  game__answer--photo">
          <input name="question2" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer  game__answer--paint">
          <input name="question2" type="radio" value="paint">
          <span>Рисунок</span>
        </label>
      </div>
    </form>
    ${statsBar(gameState)}
  </div>`;

  const game1 = getHtmlElement(innerHTML);
  const answersForm = game1.querySelector(`.game__content`);
  const questions1 = answersForm.querySelectorAll(`input[name=question1]`);
  const questions2 = answersForm.querySelectorAll(`input[name=question2]`);
  const goBackButton = game1.querySelector(`.back`);

  const hasCheckedAnswer = (collection) => [...collection].some((item) => item.checked);
  const getCheckedAnswer = (collection) => [...collection].filter((item) => item.checked)[0].value;

  answersForm.addEventListener(`click`, () => {
    if (hasCheckedAnswer(questions1) && hasCheckedAnswer(questions2)) {
      let answerOnQuestion1 = getCheckedAnswer(questions1);
      let answerOnQuestion2 = getCheckedAnswer(questions2);
      let answerType = getAnswerType(gameState.time);
      let answerCorrectness = answerOnQuestion1 === imgArray[0].imgType && answerOnQuestion2 === imgArray[1].imgType;

      playerAnswers[gameState.questionNumber] = {
        isCorrect: answerCorrectness,
        answerRate: answerType
      };

      recordAnswer(answerCorrectness, answerType, gameState);
      checkContinue(gameState, data);
    }
  });

  goBackButton.addEventListener(`click`, () => goBack(gameState));

  return game1;
};
