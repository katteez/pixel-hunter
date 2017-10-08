const mainElement = document.querySelector(`.central`);

const renderScreen = (screenElement) => {
  mainElement.innerHTML = ``;
  mainElement.appendChild(screenElement);
};

export default renderScreen;
