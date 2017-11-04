import Game1View from './game-1-view';
import GameScreen from './game';
import statsBar from '../stats-bar';
import {getAnswerRate} from '../../game-logic';
import IMG_TYPE from './img-type';

class Game1Screen extends GameScreen {
  constructor(gameData) {
    super();
    this.data = gameData;
  }

  init(gameState) {
    const data = this.data[gameState.questionNumber];

    this.view = new Game1View(gameState, statsBar, data);

    const hasCheckedAnswer = (collection) => [...collection].some((item) => item.checked);
    const getCheckedAnswer = (collection) => [...collection].filter((item) => item.checked)[0].value;

    this.view.onFormClick = (questions1, questions2, img1Type, img2Type) => {
      if (hasCheckedAnswer(questions1) && hasCheckedAnswer(questions2)) {
        let answerOnQuestion1 = IMG_TYPE[getCheckedAnswer(questions1)];
        let answerOnQuestion2 = IMG_TYPE[getCheckedAnswer(questions2)];
        let isCorrect = answerOnQuestion1 === img1Type && answerOnQuestion2 === img2Type;
        let answerRate = getAnswerRate(gameState.time);

        this.view.continueGame(isCorrect, answerRate);
      }
    };
    super.init(gameState);
  }
}

export default Game1Screen;
