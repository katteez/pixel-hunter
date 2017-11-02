import renderScreen from './render-screen';
import intro from './screens/intro/intro';
import footer from './screens/footer/index';

const mainElement = document.querySelector(`.central`);

renderScreen(intro);

mainElement.insertAdjacentElement(`afterEnd`, footer);
