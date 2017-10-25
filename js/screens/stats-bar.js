export default (gameState) => String.raw `
  <div class="stats">
    <ul class="stats">
      ${gameState.answers.map((answerType) => `<li class="stats__result stats__result--${answerType}"></li>`).join(``)}      
    </ul>
  </div>`;
