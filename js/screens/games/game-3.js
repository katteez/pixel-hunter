import Game3View from './game-3-view';
import GameScreen from './game';
import statsBar from '../stats-bar';
import {getAnswerRate} from '../../game-logic';

class Game3Screen extends GameScreen {
  constructor(gameData) {
    super();
    this.data = gameData;
  }

  init(gameState) {
    const data = this.data[gameState.questionNumber];

    this.view = new Game3View(gameState, statsBar, data);

    const RIGHT_IMG_TYPE = {
      'Найдите фото среди изображений': `photo`,
      'Найдите рисунок среди изображений': `painting`
    };
    const imgArray = data.answers;
    const imgSrcArray = imgArray.map((item) => item.image.url);

    this.view.onFormClick = (e, question) => {
      if (e.target.classList.contains(`game__option`)) {
        let answerIndex = imgSrcArray.indexOf(e.target.children[0].src);
        let isCorrect = imgArray[answerIndex].type === RIGHT_IMG_TYPE[question];
        let answerRate = getAnswerRate(gameState.time);

        this.view.continueGame(isCorrect, answerRate);
      }
    };
    super.init(gameState);
  }
}

export default Game3Screen;
