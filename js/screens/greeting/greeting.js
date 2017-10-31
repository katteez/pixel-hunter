import GreetingView from './greeting-view';
import data from './greeting-data';
import renderScreen from '../../render-screen';

const greetingScreen = new GreetingView(data.title, data.text);

greetingScreen.onButtonClick = () => renderScreen(data.nextScreen);

export default greetingScreen.element;
