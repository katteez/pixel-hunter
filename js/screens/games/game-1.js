import Game1View from './game-1-view';
import GameScreen from './game';
import statsBar from '../stats-bar';
import pictures from '../../pictures';
import {getUniqueImgArray} from '../../utils';
import {getAnswerRate} from '../../game-logic';

class Game1Screen extends GameScreen {
  constructor() {
    super();
  }

  init(gameState) {
    const IMG_COUNT = 2;
    const imgArray = getUniqueImgArray(pictures, IMG_COUNT);

    this.view = new Game1View(gameState, statsBar, imgArray[0], imgArray[1]);

    const hasCheckedAnswer = (collection) => [...collection].some((item) => item.checked);
    const getCheckedAnswer = (collection) => [...collection].filter((item) => item.checked)[0].value;

    this.view.onFormClick = (questions1, questions2, img1Type, img2Type) => {
      if (hasCheckedAnswer(questions1) && hasCheckedAnswer(questions2)) {
        let answerOnQuestion1 = getCheckedAnswer(questions1);
        let answerOnQuestion2 = getCheckedAnswer(questions2);
        let isCorrect = answerOnQuestion1 === img1Type && answerOnQuestion2 === img2Type;
        let answerRate = getAnswerRate(gameState.time);

        this.view.continueGame(isCorrect, answerRate);
      }
    };
    super.init(gameState);
  }
}

export default new Game1Screen();
