import StatsView from './stats-view';
import statsBar from '../stats-bar';
import data from './stats-data';

import getScore from '../../get-score';
import {resetGame} from '../../game-logic';

export default (gameState) => {
  const title = (gameState.win) ? `Победа!` : `Проигрыш`;

  const correctAnswersCount = gameState.answers.filter((answer) => answer !== `wrong` && answer !== `unknown`).length;
  const correctScoresTotal = correctAnswersCount * data.correctAnswerScores;

  const fastAnswersCount = gameState.answers.filter((answer) => answer === `fast`).length;
  const fastBonusesTotal = fastAnswersCount * data.bonuses.fast;

  let lives;
  if (gameState.lives > 0) {
    lives = gameState.lives;
  } else {
    lives = 0;
  }
  const livesBonusesTotal = lives * data.bonuses.lives;

  const slowAnswersCount = gameState.answers.filter((answer) => answer === `slow`).length;
  const slowBonusesTotal = slowAnswersCount * data.bonuses.slow;

  const totalScores = getScore(data.playerAnswers, gameState.lives);

  const scoring = {correctScoresTotal, fastAnswersCount, fastBonusesTotal, lives, livesBonusesTotal, slowAnswersCount, slowBonusesTotal, totalScores};

  const statsScreen = new StatsView(gameState, statsBar, title, data.bonuses, data.correctAnswerScores, scoring);

  statsScreen.onBackButtonClick = () => resetGame(gameState);

  return statsScreen.element;
};
