import AbstractView from '../abstract-view';
import headerBack from '../header/header-back';

export default class StatsView extends AbstractView {
  constructor(gameState, statsBar, title, bonusScores, correctAnswerScores, scoring) {
    super();
    this.gameState = gameState;
    this.statsBar = statsBar(this.gameState);
    this.title = title;
    this.fastBonuses = bonusScores.fast;
    this.livesBonuses = bonusScores.lives;
    this.slowBonuses = bonusScores.slow;
    this.correctAnswerScores = correctAnswerScores;
    this.correctScoresTotal = scoring.correctScoresTotal;
    this.fastAnswersCount = scoring.fastAnswersCount;
    this.fastBonusesTotal = scoring.fastBonusesTotal;
    this.lives = scoring.lives;
    this.livesBonusesTotal = scoring.livesBonusesTotal;
    this.slowAnswersCount = scoring.slowAnswersCount;
    this.slowBonusesTotal = scoring.slowBonusesTotal;
    this.totalScores = scoring.totalScores;
  }

  /*
  * Баллы за правильные ответы
  */
  _templateCorrectScores(gameState, correctAnswerScores, correctScoresTotal) {
    if (gameState.win) {
      return String.raw`
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
      return String.raw`
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
      return String.raw`
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
      return String.raw`
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
      return String.raw`
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
    <div class="result">
      <h1>${this.title}</h1>
      <table class="result__table">
        <tr>
          <td class="result__number">1.</td>
          <td colspan="2">
            ${this.statsBar}
          </td>
          ${this._templateCorrectScores(this.gameState, this.correctAnswerScores, this.correctScoresTotal)}
        </tr>
        ${this._templateFast(this.gameState, this.fastAnswersCount, this.fastBonuses, this.fastBonusesTotal)}
        ${this._templateLives(this.gameState, this.lives, this.livesBonuses, this.livesBonusesTotal)}
        ${this._templateSlow(this.gameState, this.slowAnswersCount, this.slowBonuses, this.slowBonusesTotal)}
        ${this._templateTotalScore(this.gameState, this.totalScores)}
      </table>
    </div>`;
  }

  bind() {
    const goBackButton = this.element.querySelector(`.back`);

    goBackButton.addEventListener(`click`, this.onBackButtonClick);
  }

  onBackButtonClick() {}
}
