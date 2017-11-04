import Loader from './loader';
import App from './application';
import footer from './screens/footer';

Loader.loadData()
    .then((gameData) => App.init(gameData))
    .catch(window.console.error);

const mainElement = document.querySelector(`.central`);
mainElement.insertAdjacentHTML(`afterEnd`, footer);
