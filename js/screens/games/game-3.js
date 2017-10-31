import Game3View from './game-3-view';
import statsBar from '../stats-bar';
import pictures from '../../pictures';
import {getUniqueImgArray} from '../../utils';
import {resetGame, getAnswerRate, recordAnswer, checkContinue} from '../../game-logic';

const RIGHT_IMG_TYPE = `paint`;
const IMG_COUNT = 3;

export default (data, gameState) => {
  let imgArray = getUniqueImgArray(pictures, IMG_COUNT);

  const game3Screen = new Game3View(gameState, statsBar, data.text, imgArray[0], imgArray[1], imgArray[2]);

  const imgSrcArray = imgArray.map((img) => img.imgSrc);

  game3Screen.onFormClick = (e) => {
    if (e.target.classList.contains(`game__option`)) {
      let answerIndex = imgSrcArray.indexOf(e.target.children[0].src);
      let isCorrect = imgArray[answerIndex].imgType === RIGHT_IMG_TYPE;
      let answerRate = getAnswerRate(gameState.time);

      recordAnswer(isCorrect, answerRate, gameState);
      checkContinue(gameState, data.type);
    }
  };

  game3Screen.onBackButtonClick = () => resetGame(gameState);

  return game3Screen.element;
};
