import getHtmlElement from '../../create-element';
import getHeader from '../header/header';
import statsBar from '../stats-bar';
import pictures from '../../pictures';
import playerAnswers from '../../player-answers';
import data from './game-2-data';
import {getRandomFromInterval} from '../../utils';
import {goBack, getAnswerType, recordAnswer, checkContinue} from '../../game-logic';

let img = pictures[getRandomFromInterval(0, pictures.length)];

export default (gameState) => {
  const innerHTML = String.raw`
  ${getHeader(gameState)}
  <div class="game">
    <p class="game__task">${data.text}</p>
    <form class="game__content  game__content--wide">
      <div class="game__option">
        <img src="${img.imgSrc}" alt="Option 1" width="705" height="455">
        <label class="game__answer  game__answer--photo">
          <input name="question1" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer  game__answer--wide  game__answer--paint">
          <input name="question1" type="radio" value="paint">
          <span>Рисунок</span>
        </label>
      </div>
    </form>
    ${statsBar(gameState)}
  </div>`;

  const game2 = getHtmlElement(innerHTML);
  const answersForm = game2.querySelector(`.game__content`);
  const questions1 = answersForm.querySelectorAll(`input[name=question1]`);
  const goBackButton = game2.querySelector(`.back`);

  const hasCheckedAnswer = (collection) => [...collection].some((item) => item.checked);
  const getCheckedAnswer = (collection) => [...collection].filter((item) => item.checked)[0].value;

  answersForm.addEventListener(`click`, () => {
    if (hasCheckedAnswer(questions1)) {
      let answerOnQuestion1 = getCheckedAnswer(questions1);
      let answerType = getAnswerType(gameState.time);
      let answerCorrectness = answerOnQuestion1 === img.imgType;

      playerAnswers[gameState.questionNumber] = {
        isCorrect: answerCorrectness,
        answerRate: answerType
      };

      recordAnswer(answerCorrectness, answerType, gameState);
      checkContinue(gameState, data);
    }
  });

  goBackButton.addEventListener(`click`, goBack.bind({}, gameState));

  return game2;
};
