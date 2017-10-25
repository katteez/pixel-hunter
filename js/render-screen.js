import footer from './screens/footer';

const mainElement = document.querySelector(`.central`);

const renderScreen = (screenElement) => {
  mainElement.innerHTML = ``;
  mainElement.appendChild(screenElement);
  mainElement.appendChild(footer);
};

export default renderScreen;
