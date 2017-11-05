import AbstractView from '../abstract-view';
import headerBack from '../header/header-back';
import statsBar from '../stats-bar';

export default class StatsView extends AbstractView {
  constructor(title, bonusScores, correctAnswerScores, scores) {
    super();
    this._title = title;
    this._bonusScores = bonusScores;
    this._correctAnswerScores = correctAnswerScores;
    this._scores = scores;
  }

  /*
  * Баллы за правильные ответы
  */
  static _templateCorrectScores(gameState, correctAnswerScores, correctScoresTotal) {
    if (gameState.win) {
      return `
      <td class="result__points">×&nbsp;${correctAnswerScores}</td>
      <td class="result__total">${correctScoresTotal}</td>`;
    }
    return String.raw`
    <td class="result__total"></td>
    <td class="result__total  result__total--final">fail</td>`;
  }

  /*
  * Бонусы за скорость
  */
  static _templateFast(gameState, fastAnswersCount, fastBonuses, fastBonusesTotal) {
    if (gameState.win && fastAnswersCount) {
      return `
      <tr>
        <td></td>
        <td class="result__extra">Бонус за скорость:</td>
        <td class="result__extra">${fastAnswersCount}&nbsp;<span class="stats__result stats__result--fast"></span></td>
        <td class="result__points">×&nbsp;${fastBonuses}</td>
        <td class="result__total">${fastBonusesTotal}</td>
      </tr>`;
    }
    return ``;
  }

  /*
  * Бонусы за жизни
  */
  static _templateLives(gameState, lives, livesBonuses, livesBonusesTotal) {
    if (gameState.win && lives) {
      return `
      <tr>
        <td></td>
        <td class="result__extra">Бонус за жизни:</td>
        <td class="result__extra">${lives}&nbsp;<span class="stats__result stats__result--alive"></span></td>
        <td class="result__points">×&nbsp;${livesBonuses}</td>
        <td class="result__total">${livesBonusesTotal}</td>
      </tr>`;
    }
    return ``;
  }

  /*
  * Штраф за медлительность
  */
  static _templateSlow(gameState, slowAnswersCount, slowBonuses, slowBonusesTotal) {
    if (gameState.win && slowAnswersCount) {
      return `
      <tr>
        <td></td>
        <td class="result__extra">Штраф за медлительность:</td>
        <td class="result__extra">${slowAnswersCount}&nbsp;<span class="stats__result stats__result--slow"></span></td>
        <td class="result__points">×&nbsp;${slowBonuses}</td>
        <td class="result__total">-${slowBonusesTotal}</td>
      </tr>`;
    }
    return ``;
  }

  /*
  * Итоговое количество баллов
  */
  static _templateTotalScore(gameState, totalScores) {
    if (gameState.win) {
      return `
      <tr>
        <td colspan="5" class="result__total  result__total--final">${totalScores}</td>
      </tr>`;
    }
    return ``;
  }

  get template() {
    return String.raw`
    ${headerBack}
    <div class="result">
      <h1>${this._title}</h1>
      ${this._scores.map((scoring, id) => `
        <table class="result__table">
          <tr>
            <td class="result__number">${this._scores.length - id}.</td>
            <td colspan="2">
              ${statsBar(scoring.gameState)}
            </td>
            ${StatsView._templateCorrectScores(scoring.gameState, this._correctAnswerScores, scoring.correctScoresTotal)}
          </tr>
          ${StatsView._templateFast(scoring.gameState, scoring.fastAnswersCount, this._bonusScores.FAST, scoring.fastBonusesTotal)}
          ${StatsView._templateLives(scoring.gameState, scoring.lives, this._bonusScores.LIVES, scoring.livesBonusesTotal)}
          ${StatsView._templateSlow(scoring.gameState, scoring.slowAnswersCount, this._bonusScores.SLOW, scoring.slowBonusesTotal)}
          ${StatsView._templateTotalScore(scoring.gameState, scoring.totalScores)}
        </table>`).reverse().join(``)}
    </div>`;
  }

  bind() {
    const goBackButton = this.element.querySelector(`.back`);

    goBackButton.addEventListener(`click`, this.onBackButtonClick);
  }

  onBackButtonClick() {}
}
