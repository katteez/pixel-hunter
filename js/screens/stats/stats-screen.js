import StatsView from './stats-view';
import statsBar from '../stats-bar';
import statsData from './stats-data';
import getScore from '../../get-score';
import {resetGame} from '../../game-logic';
import renderScreen from '../../render-screen';

class StatsScreen {
  init(gameState) {
    const title = (gameState.win) ? `Победа!` : `Проигрыш`;

    const correctAnswersCount = gameState.answers.filter((answer) => answer !== `wrong` && answer !== `unknown`).length;
    const correctScoresTotal = correctAnswersCount * statsData.correctAnswerScores;

    const fastAnswersCount = gameState.answers.filter((answer) => answer === `fast`).length;
    const fastBonusesTotal = fastAnswersCount * statsData.bonuses.fast;

    let lives;
    if (gameState.lives > 0) {
      lives = gameState.lives;
    } else {
      lives = 0;
    }
    const livesBonusesTotal = lives * statsData.bonuses.lives;

    const slowAnswersCount = gameState.answers.filter((answer) => answer === `slow`).length;
    const slowBonusesTotal = slowAnswersCount * statsData.bonuses.slow;

    const totalScores = getScore(statsData.playerAnswers, gameState.lives);

    const scoring = {correctScoresTotal, fastAnswersCount, fastBonusesTotal, lives, livesBonusesTotal, slowAnswersCount, slowBonusesTotal, totalScores};

    this.view = new StatsView(gameState, statsBar, title, statsData.bonuses, statsData.correctAnswerScores, scoring);

    this.view.onBackButtonClick = () => resetGame(gameState);

    renderScreen(this.view.element);
  }
}

export default new StatsScreen();
