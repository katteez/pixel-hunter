import './application';
import footer from './screens/footer';

const mainElement = document.querySelector(`.central`);
mainElement.insertAdjacentHTML(`afterEnd`, footer);
