import Game2View from './game-2-view';
import GameScreen from './game';
import statsBar from '../stats-bar';
import {getAnswerRate} from '../../game-logic';
import ImgType from './img-type';

class Game2Screen extends GameScreen {
  constructor(gameData) {
    super();
    this._data = gameData;
  }

  init(gameState) {
    const data = this._data[gameState.questionNumber];

    this._view = new Game2View(gameState, statsBar, data);

    this._view.onFormClick = (questions1, imgType) => {
      if (this._view.hasCheckedAnswer(questions1)) {
        let answerOnQuestion1 = ImgType[this._view.getCheckedAnswer(questions1).toUpperCase()];
        let isCorrect = answerOnQuestion1 === imgType;
        let answerRate = getAnswerRate(gameState.time);

        this._view.continueGame(isCorrect, answerRate);
      }
    };
    super.init(gameState);
  }
}

export default Game2Screen;
