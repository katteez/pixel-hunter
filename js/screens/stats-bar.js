export default (gameState) => String.raw `
  <div class="stats">
    <ul class="stats">
      ${gameState.answers.map((answerRate) => `<li class="stats__result stats__result--${answerRate}"></li>`).join(``)}      
    </ul>
  </div>`;
