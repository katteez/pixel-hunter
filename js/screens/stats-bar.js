const classFromRate = {
  normal: `correct`,
  fast: `fast`,
  slow: `slow`,
  wrong: `wrong`,
  unknown: `unknown`
};

export default (gameState) => String.raw `
  <ul class="stats">
    ${gameState.answers
      .map((answer) => {
        let rate;
        if (answer && answer.answerRate) {
          rate = answer.isCorrect || answer.answerRate === `unknown`
            ? answer.answerRate
            : `wrong`;
        } else {
          rate = `unknown`;
        }
        return rate;
      })
      .map((rate) => `<li class="stats__result stats__result--${classFromRate[rate]}"></li>`)
      .join(``)}
  </ul>`;
