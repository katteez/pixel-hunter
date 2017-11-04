import AbstractView from '../abstract-view';
import headerBack from '../header/header-back';
import statsBar from '../stats-bar';

export default class StatsView extends AbstractView {
  constructor(bonusScores, correctAnswerScores, scoringArray) {
    super();
    this.fastBonuses = bonusScores.fast;
    this.livesBonuses = bonusScores.lives;
    this.slowBonuses = bonusScores.slow;
    this.correctAnswerScores = correctAnswerScores;
    this.scoringArray = scoringArray;
  }

  /*
  * Баллы за правильные ответы
  */
  _templateCorrectScores(gameState, correctAnswerScores, correctScoresTotal) {
    if (gameState.win) {
      return `
      <td class="result__points">×&nbsp;${correctAnswerScores}</td>
      <td class="result__total">${correctScoresTotal}</td>`;
    } else {
      return String.raw`
      <td class="result__total"></td>
      <td class="result__total  result__total--final">fail</td>`;
    }
  }

  /*
  * Бонусы за скорость
  */
  _templateFast(gameState, fastAnswersCount, fastBonuses, fastBonusesTotal) {
    if (gameState.win && fastAnswersCount) {
      return `
      <tr>
        <td></td>
        <td class="result__extra">Бонус за скорость:</td>
        <td class="result__extra">${fastAnswersCount}&nbsp;<span class="stats__result stats__result--fast"></span></td>
        <td class="result__points">×&nbsp;${fastBonuses}</td>
        <td class="result__total">${fastBonusesTotal}</td>
      </tr>`;
    } else {
      return ``;
    }
  }

  /*
  * Бонусы за жизни
  */
  _templateLives(gameState, lives, livesBonuses, livesBonusesTotal) {
    if (gameState.win && lives) {
      return `
      <tr>
        <td></td>
        <td class="result__extra">Бонус за жизни:</td>
        <td class="result__extra">${lives}&nbsp;<span class="stats__result stats__result--alive"></span></td>
        <td class="result__points">×&nbsp;${livesBonuses}</td>
        <td class="result__total">${livesBonusesTotal}</td>
      </tr>`;
    } else {
      return ``;
    }
  }

  /*
  * Штраф за медлительность
  */
  _templateSlow(gameState, slowAnswersCount, slowBonuses, slowBonusesTotal) {
    if (gameState.win && slowAnswersCount) {
      return `
      <tr>
        <td></td>
        <td class="result__extra">Штраф за медлительность:</td>
        <td class="result__extra">${slowAnswersCount}&nbsp;<span class="stats__result stats__result--slow"></span></td>
        <td class="result__points">×&nbsp;${slowBonuses}</td>
        <td class="result__total">-${slowBonusesTotal}</td>
      </tr>`;
    } else {
      return ``;
    }
  }

  /*
  * Итоговое количество баллов
  */
  _templateTotalScore(gameState, totalScores) {
    if (gameState.win) {
      return `
      <tr>
        <td colspan="5" class="result__total  result__total--final">${totalScores}</td>
      </tr>`;
    } else {
      return ``;
    }
  }

  get template() {
    return String.raw`
    ${headerBack}
    ${this.scoringArray.map((scoring) => `
    <div class="result">
      <h1>${scoring.title}</h1>
        <table class="result__table">
          <tr>
            <td class="result__number"></td>
            <td colspan="2">
              ${statsBar(scoring.gameState)}
            </td>
            ${this._templateCorrectScores(scoring.gameState, this.correctAnswerScores, scoring.correctScoresTotal)}
          </tr>
          ${this._templateFast(scoring.gameState, scoring.fastAnswersCount, this.fastBonuses, scoring.fastBonusesTotal)}
          ${this._templateLives(scoring.gameState, scoring.lives, this.livesBonuses, scoring.livesBonusesTotal)}
          ${this._templateSlow(scoring.gameState, scoring.slowAnswersCount, this.slowBonuses, scoring.slowBonusesTotal)}
          ${this._templateTotalScore(scoring.gameState, scoring.totalScores)}
        </table>
    </div>`).join(``)}`;
  }

  bind() {
    const goBackButton = this.element.querySelector(`.back`);

    goBackButton.addEventListener(`click`, this.onBackButtonClick);
  }

  onBackButtonClick() {}
}
