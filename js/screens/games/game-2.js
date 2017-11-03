import Game2View from './game-2-view';
import GameScreen from './game';
import statsBar from '../stats-bar';
import {getAnswerRate} from '../../game-logic';
import IMG_TYPE from './img-type';

class Game2Screen extends GameScreen {
  constructor(gameData) {
    super();
    this.data = gameData;
  }

  init(gameState) {
    const data = this.data[gameState.questionNumber];

    this.view = new Game2View(gameState, statsBar, data);

    const hasCheckedAnswer = (collection) => [...collection].some((item) => item.checked);
    const getCheckedAnswer = (collection) => [...collection].filter((item) => item.checked)[0].value;

    this.view.onFormClick = (questions1, imgType) => {
      if (hasCheckedAnswer(questions1)) {
        let answerOnQuestion1 = IMG_TYPE[getCheckedAnswer(questions1)];
        let isCorrect = answerOnQuestion1 === imgType;
        let answerRate = getAnswerRate(gameState.time);

        this.view.continueGame(isCorrect, answerRate);
      }
    };
    super.init(gameState);
  }
}

export default Game2Screen;
