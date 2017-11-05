import App from './application';

const renderScreen = (screenElement) => {
  App.mainElement.innerHTML = ``;
  App.mainElement.appendChild(screenElement);
};

export default renderScreen;
