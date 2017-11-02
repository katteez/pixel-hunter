import Game3View from './game-3-view';
import GameScreen from './game';
import statsBar from '../stats-bar';
import pictures from '../../pictures';
import {getUniqueImgArray} from '../../utils';
import {getAnswerRate} from '../../game-logic';

class Game3Screen extends GameScreen {
  constructor() {
    super();
  }

  init(gameState) {
    const RIGHT_IMG_TYPE = `paint`;
    const IMG_COUNT = 3;

    const imgArray = getUniqueImgArray(pictures, IMG_COUNT);

    this.view = new Game3View(gameState, statsBar, imgArray[0], imgArray[1], imgArray[2]);

    const imgSrcArray = imgArray.map((img) => img.imgSrc);

    this.view.onFormClick = (e) => {
      if (e.target.classList.contains(`game__option`)) {
        let answerIndex = imgSrcArray.indexOf(e.target.children[0].src);
        let isCorrect = imgArray[answerIndex].imgType === RIGHT_IMG_TYPE;
        let answerRate = getAnswerRate(gameState.time);

        this.view.continueGame(isCorrect, answerRate);
      }
    };
    super.init(gameState);
  }
}

export default new Game3Screen();
