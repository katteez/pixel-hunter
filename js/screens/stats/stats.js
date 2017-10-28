import getHtmlElement from '../../create-element';
import headerBack from '../header/header-back';
import playerAnswers from '../../player-answers';
import data from './stats-data';
import getScore from '../../get-score';
import {resetGame} from '../../game-logic';

export default (gameState) => {
  let title;
  if (gameState.win) {
    title = `Победа!`;
  } else {
    title = `Проигрыш`;
  }

  const correctAnswersCount = gameState.answers.filter((answer) => answer !== `wrong` && answer !== `unknown`).length;
  const correctnessBonuses = correctAnswersCount * data.correctAnswerScores;

  /*
  * Баллы за правильные ответы
  */
  let templateCorrectScores = ``;
  if (gameState.win) {
    templateCorrectScores = String.raw`
    <td class="result__points">×&nbsp;${data.correctAnswerScores}</td>
    <td class="result__total">${correctnessBonuses}</td>`;
  } else {
    templateCorrectScores = String.raw`
    <td class="result__total"></td>
    <td class="result__total  result__total--final">fail</td>`;
  }

  /*
  * Бонус за скорость
  */
  const fastAnswersCount = gameState.answers.filter((answer) => answer === `fast`).length;
  const fastBonuses = fastAnswersCount * data.bonusScores.fast;

  let templateFast = ``;
  if (gameState.win && fastAnswersCount) {
    templateFast = String.raw`
    <tr>
      <td></td>
      <td class="result__extra">Бонус за скорость:</td>
      <td class="result__extra">${fastAnswersCount}&nbsp;<span class="stats__result stats__result--fast"></span></td>
      <td class="result__points">×&nbsp;${data.bonusScores.fast}</td>
      <td class="result__total">${fastBonuses}</td>
    </tr>`;
  }

  /*
  * Бонус за жизни
  */
  let lives;
  if (gameState.lives > 0) {
    lives = gameState.lives;
  } else {
    lives = 0;
  }
  let livesBonuses = lives * data.bonusScores.lives;

  let templateLives = ``;
  if (gameState.win && gameState.lives) {
    templateLives = String.raw`
    <tr>
      <td></td>
      <td class="result__extra">Бонус за жизни:</td>
      <td class="result__extra">${lives}&nbsp;<span class="stats__result stats__result--alive"></span></td>
      <td class="result__points">×&nbsp;${data.bonusScores.lives}</td>
      <td class="result__total">${livesBonuses}</td>
    </tr>`;
  }

  /*
  * Штраф за медлительность
  */
  const slowAnswersCount = gameState.answers.filter((answer) => answer === `slow`).length;
  const slowBonuses = slowAnswersCount * data.bonusScores.slow;

  let templateSlow = ``;
  if (gameState.win && slowAnswersCount) {
    templateSlow = String.raw`
    <tr>
      <td></td>
      <td class="result__extra">Штраф за медлительность:</td>
      <td class="result__extra">${slowAnswersCount}&nbsp;<span class="stats__result stats__result--slow"></span></td>
      <td class="result__points">×&nbsp;${data.bonusScores.slow}</td>
      <td class="result__total">-${slowBonuses}</td>
    </tr>`;
  }

  /*
  * Итоговое количество баллов
  */
  let templateTotalScore = ``;
  if (gameState.win) {
    templateTotalScore = String.raw`
    <tr>
      <td colspan="5" class="result__total  result__total--final">${getScore(playerAnswers, gameState.lives)}</td>
    </tr>`;
  }

  const innerHtml = String.raw`
  ${headerBack}
  <div class="result">
    <h1>${title}</h1>
    <table class="result__table">
      <tr>
        <td class="result__number">1.</td>
        <td colspan="2">
          <ul class="stats">
            ${gameState.answers.map((answerType) => `<li class="stats__result stats__result--${answerType}"></li>`).join(``)}
          </ul>
        </td>
        ${templateCorrectScores}
      </tr>
      ${templateFast}
      ${templateLives}
      ${templateSlow}
      ${templateTotalScore}
    </table> 
  </div>`;

  const stats = getHtmlElement(innerHtml);
  const goBackButton = stats.querySelector(`.back`);

  goBackButton.addEventListener(`click`, resetGame.bind(null, gameState));

  return stats;
};
