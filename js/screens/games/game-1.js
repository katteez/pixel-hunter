import Game1View from './game-1-view';
import statsBar from '../stats-bar';
import pictures from '../../pictures';
import {getUniqueImgArray} from '../../utils';
import {resetGame, getAnswerRate, recordAnswer, checkContinue} from '../../game-logic';

const IMG_COUNT = 2;

export default (data, gameState) => {
  let imgArray = getUniqueImgArray(pictures, IMG_COUNT);

  const game1Screen = new Game1View(gameState, statsBar, data.text, imgArray[0], imgArray[1]);

  const hasCheckedAnswer = (collection) => [...collection].some((item) => item.checked);
  const getCheckedAnswer = (collection) => [...collection].filter((item) => item.checked)[0].value;

  game1Screen.onFormClick = (questions1, questions2, img1Type, img2Type) => {
    if (hasCheckedAnswer(questions1) && hasCheckedAnswer(questions2)) {
      let answerOnQuestion1 = getCheckedAnswer(questions1);
      let answerOnQuestion2 = getCheckedAnswer(questions2);
      let isCorrect = answerOnQuestion1 === img1Type && answerOnQuestion2 === img2Type;
      let answerRate = getAnswerRate(gameState.time);

      recordAnswer(isCorrect, answerRate, gameState);
      checkContinue(gameState, data.type);
    }
  };

  game1Screen.onBackButtonClick = () => resetGame(gameState);

  return game1Screen.element;
};
