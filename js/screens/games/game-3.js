import Game3View from './game-3-view';
import GameScreen from './game';
import statsBar from '../stats-bar';
import {getAnswerRate} from '../../game-logic';

class Game3Screen extends GameScreen {
  constructor(gameData) {
    super();
    this._data = gameData;
  }

  init(gameState) {
    const data = this._data[gameState.questionNumber];
    const imgArray = data.answers;
    const imgSrcArray = imgArray.map((item) => item.image.url);

    this._view = new Game3View(gameState, statsBar, data);

    this._view.onFormClick = (e, question) => {
      if (e.target.classList.contains(`game__option`)) {
        let answerIndex = imgSrcArray.indexOf(e.target.children[0].src);
        let imgType;
        if (question.includes(`фото`)) {
          imgType = `photo`;
        } else if (question.includes(`рисунок`)) {
          imgType = `painting`;
        } else {
          throw new Error(`Cannot determine question image type`);
        }
        let isCorrect = imgArray[answerIndex].type === imgType;
        let answerRate = getAnswerRate(gameState.time);

        this._view.continueGame(isCorrect, answerRate);
      }
    };
    super.init(gameState);
  }
}

export default Game3Screen;
