import renderScreen from './render-screen';
import intro from './screens/intro/intro';
import footer from './screens/footer';

const mainElement = document.querySelector(`.central`);

renderScreen(intro);

mainElement.insertAdjacentHTML(`afterEnd`, footer);
