import App from './application';
import footer from './screens/footer';

const mainElement = document.querySelector(`.central`);

App.prepareDataAndInit();

mainElement.insertAdjacentHTML(`afterEnd`, footer);
