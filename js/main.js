const ARROW_LEFT_KEYCODE = 37;
const ARROW_RIGHT_KEYCODE = 39;

const mainElement = document.querySelector(`.central`);
const screenTemplates = document.querySelectorAll(`template`);
let currentScreenIndex;

// Отрисовываем экран игры по переданному индексу из массива экранов
function renderScreen(screenIndex) {
  if (screenTemplates[screenIndex]) {
    let screenElement = screenTemplates[screenIndex].content.cloneNode(true);

    mainElement.innerHTML = ``;
    mainElement.appendChild(screenElement);
    currentScreenIndex = screenIndex;
  }
}

renderScreen(0);

// Переключение экранов игры комбинацией Alt + arrow_key
function onScreenToggle(e) {
  if (e.altKey) {
    if (e.keyCode === ARROW_LEFT_KEYCODE && currentScreenIndex > 0) {
      renderScreen(currentScreenIndex - 1);
    } else if (e.keyCode === ARROW_RIGHT_KEYCODE && currentScreenIndex < screenTemplates.length - 1) {
      renderScreen(currentScreenIndex + 1);
    }
  }
}

document.onkeydown = onScreenToggle;
