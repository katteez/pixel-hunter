import Game1View from './game-1-view';
import GameScreen from './game';
import statsBar from '../stats-bar';
import {getAnswerRate} from '../../game-logic';
import ImgType from './img-type';

class Game1Screen extends GameScreen {
  constructor(gameData) {
    super();
    this._data = gameData;
  }

  init(gameState) {
    const data = this._data[gameState.questionNumber];

    this._view = new Game1View(gameState, statsBar, data);

    this._view.onFormClick = (questions1, questions2, img1Type, img2Type) => {
      if (this._view.hasCheckedAnswer(questions1) && this._view.hasCheckedAnswer(questions2)) {
        let answerOnQuestion1 = ImgType[this._view.getCheckedAnswer(questions1).toUpperCase()];
        let answerOnQuestion2 = ImgType[this._view.getCheckedAnswer(questions2).toUpperCase()];
        let isCorrect = answerOnQuestion1 === img1Type && answerOnQuestion2 === img2Type;
        let answerRate = getAnswerRate(gameState.time);

        this._view.continueGame(isCorrect, answerRate);
      }
    };
    super.init(gameState);
  }
}

export default Game1Screen;
