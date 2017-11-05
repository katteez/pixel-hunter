import App from './application';
import footer from './screens/footer';

App.prepareDataAndInit();

App.mainElement.insertAdjacentHTML(`afterEnd`, footer);
