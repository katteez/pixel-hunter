import currentGameState from '../../game-state';
import {CORRECT_ANSWER_SCORES, Bonuses} from './stats-data';
import {resetGame} from '../../game-logic';
import StatsView from './stats-view';
import getScore from '../../get-score';
import renderScreen from '../../render-screen';
import App from '../../application';
import Loader from '../../loader';

class StatsScreen {
  init() {
    const title = (currentGameState.win) ? `Победа!` : `Проигрыш`;

    Loader.loadResults(App.userName).then((results) => {
      const scores = [];

      results.forEach((gameState) => {
        const correctAnswersCount = gameState.answers
            .filter((answer) => answer && answer.isCorrect).length;
        const correctScoresTotal = correctAnswersCount * CORRECT_ANSWER_SCORES;

        const fastAnswersCount = gameState.answers
            .filter((answer) => answer && answer.isCorrect && answer.answerRate === `fast`).length;
        const fastBonusesTotal = fastAnswersCount * Bonuses.FAST;

        let lives;
        if (gameState.lives > 0) {
          lives = gameState.lives;
        } else {
          lives = 0;
        }
        const livesBonusesTotal = lives * Bonuses.LIVES;

        const slowAnswersCount = gameState.answers
            .filter((answer) => answer && answer.isCorrect && answer.answerRate === `slow`).length;
        const slowBonusesTotal = slowAnswersCount * Bonuses.SLOW;

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
        scores.push(scoring);
      });
      this.view = new StatsView(title, Bonuses, CORRECT_ANSWER_SCORES, scores);

      this.view.onBackButtonClick = () => resetGame(currentGameState);

      renderScreen(this.view.element);
    });
  }
}

export default new StatsScreen();
