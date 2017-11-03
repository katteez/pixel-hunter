import Game2View from './game-2-view';
import GameScreen from './game';
import statsBar from '../stats-bar';
import pictures from '../../pictures';
import {getRandomFromInterval} from '../../utils';
import {getAnswerRate} from '../../game-logic';

class Game2Screen extends GameScreen {
  constructor() {
    super();
  }

  init(gameState) {
    let img = pictures[getRandomFromInterval(0, pictures.length)];

    this.view = new Game2View(gameState, statsBar, img);

    const hasCheckedAnswer = (collection) => [...collection].some((item) => item.checked);
    const getCheckedAnswer = (collection) => [...collection].filter((item) => item.checked)[0].value;

    this.view.onFormClick = (questions1, imgType) => {
      if (hasCheckedAnswer(questions1)) {
        let answerOnQuestion1 = getCheckedAnswer(questions1);
        let isCorrect = answerOnQuestion1 === imgType;
        let answerRate = getAnswerRate(gameState.time);

        this.view.continueGame(isCorrect, answerRate);
      }
    };
    super.init(gameState);
  }
}

export default new Game2Screen();
