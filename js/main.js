const ARROW_LEFT_KEYCODE = 37;
const ARROW_RIGHT_KEYCODE = 39;

const mainElement = document.querySelector(`.central`);
const screenTemplates = document.querySelectorAll(`template`);
let usedTemplate;

// Отрисовываем экран игры по переданному индексу из массива экранов
function renderScreen(screenNumber) {
  if (screenTemplates[screenNumber]) {
    let screenElement = screenTemplates[screenNumber].content.cloneNode(true);

    mainElement.innerHTML = ``;
    mainElement.appendChild(screenElement);
    usedTemplate = screenNumber;
  }
}

renderScreen(0);

// Переключение экранов игры комбинацией Alt + arrow_key
function onKeyDown(e) {
  if (e.altKey && e.keyCode === ARROW_LEFT_KEYCODE) {
    if (usedTemplate > 0) {
      renderScreen(usedTemplate - 1);
    }
  } else if (e.altKey && e.keyCode === ARROW_RIGHT_KEYCODE) {
    if (usedTemplate < screenTemplates.length - 1) {
      renderScreen(usedTemplate + 1);
    }
  }
}

document.onkeydown = onKeyDown;
