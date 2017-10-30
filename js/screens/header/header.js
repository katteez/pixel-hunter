import headerBack from './header-back';

export default (gameState) => String.raw `
  <header class="header">
    ${headerBack}
    <h1 class="game__timer">${gameState.time}</h1>
    <div class="game__lives">
      ${new Array(3 - gameState.lives)
      .fill(`<img src="img/heart__empty.svg" class="game__heart" alt="Life" width="32" height="32">`)
      .join(``)}
      ${new Array(gameState.lives)
      .fill(`<img src="img/heart__full.svg" class="game__heart" alt="Life" width="32" height="32">`)
      .join(``)}    
    </div>
  </header>`;
