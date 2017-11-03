import Game2View from './game-2-view';
import processGame from './game';
import statsBar from '../stats-bar';
import pictures from '../../pictures';
import {getRandomFromInterval} from '../../utils';
import {getAnswerRate} from '../../game-logic';

export default (data, gameState) => {
  let img = pictures[getRandomFromInterval(0, pictures.length)];

  const game2Screen = new Game2View(gameState, statsBar, data.text, img);

  const hasCheckedAnswer = (collection) => [...collection].some((item) => item.checked);
  const getCheckedAnswer = (collection) => [...collection].filter((item) => item.checked)[0].value;

  game2Screen.onFormClick = (questions1, imgType) => {
    if (hasCheckedAnswer(questions1)) {
      let answerOnQuestion1 = getCheckedAnswer(questions1);
      let isCorrect = answerOnQuestion1 === imgType;
      let answerRate = getAnswerRate(gameState.time);

      game2Screen.continueGame(isCorrect, answerRate);
    }
  };

  processGame(gameState, game2Screen, data.type);

  return game2Screen.element;
};
