const classFromRate = {
  normal: `correct`,
  fast: `fast`,
  slow: `slow`,
  wrong: `wrong`,
  unknown: `unknown`
};

export default (gameState) => String.raw `
  <ul class="stats">
    ${gameState.answers.map((answerRate) => `<li class="stats__result stats__result--${classFromRate[answerRate]}"></li>`).join(``)}
  </ul>`;
