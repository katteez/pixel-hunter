import App from './application';
import footer from './screens/footer';

App.showIntro();

const mainElement = document.querySelector(`.central`);
mainElement.insertAdjacentHTML(`afterEnd`, footer);
