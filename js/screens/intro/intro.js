import IntroView from './intro-view';
import data from './intro-data';
import renderScreen from '../../render-screen';

const introScreen = new IntroView(data.text);

introScreen.onButtonClick = () => renderScreen(data.nextScreen);

export default introScreen.element;
