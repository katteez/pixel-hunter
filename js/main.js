import App from './application';
import footer from './screens/footer';

App.init();

const mainElement = document.querySelector(`.central`);
mainElement.insertAdjacentHTML(`afterEnd`, footer);
