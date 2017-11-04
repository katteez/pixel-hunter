import currentGameState from '../../game-state';
import {resetGame} from '../../game-logic';
import StatsView from './stats-view';
import getScore from '../../get-score';
import renderScreen from '../../render-screen';
import App from '../../application';
import Loader from '../../loader';

class StatsScreen {
  init(statsData) {
    const title = (currentGameState.win) ? `Победа!` : `Проигрыш`;

    Loader.loadResults(App.userName).then((results) => {
      const scoringArray = [];

      results.forEach((gameState) => {
        const correctAnswersCount = gameState.answers
            .filter((answer) => answer)
            .filter((answer) => answer.answerRate !== `wrong` && answer !== `unknown`).length;
        const correctScoresTotal = correctAnswersCount * statsData.correctAnswerScores;

        const fastAnswersCount = gameState.answers
            .filter((answer) => answer)
            .filter((answer) => answer.answerRate === `fast`).length;
        const fastBonusesTotal = fastAnswersCount * statsData.bonuses.fast;

        let lives;
        if (gameState.lives > 0) {
          lives = gameState.lives;
        } else {
          lives = 0;
        }
        const livesBonusesTotal = lives * statsData.bonuses.lives;

        const slowAnswersCount = gameState.answers
            .filter((answer) => answer)
            .filter((answer) => answer.answerRate === `slow`).length;
        const slowBonusesTotal = slowAnswersCount * statsData.bonuses.slow;

        const totalScores = getScore(gameState.answers, gameState.lives);

        const scoring = {
          gameState,
          correctScoresTotal,
          fastAnswersCount,
          fastBonusesTotal,
          lives,
          livesBonusesTotal,
          slowAnswersCount,
          slowBonusesTotal,
          totalScores
        };
        scoringArray.push(scoring);
      });
      this.view = new StatsView(title, statsData.bonuses, statsData.correctAnswerScores, scoringArray);

      this.view.onBackButtonClick = () => resetGame(currentGameState);

      renderScreen(this.view.element);
    });
  }
}

export default new StatsScreen();
