import introScreen from './screens/intro/intro-screen';
import greetingScreen from './screens/greeting/greeting-screen';
import rulesScreen from './screens/rules/rules-screen';
import game1Screen from './screens/games/game-1';
import game2Screen from './screens/games/game-2';
import game3Screen from './screens/games/game-3';
import statsScreen from './screens/stats/stats-screen';

export default class Application {

  static showIntro() {
    introScreen.init();
  }

  static showGreeting() {
    greetingScreen.init();
  }

  static showRules() {
    rulesScreen.init();
  }

  static showGame1(gameState) {
    game1Screen.init(gameState);
  }

  static showGame2(gameState) {
    game2Screen.init(gameState);
  }

  static showGame3(gameState) {
    game3Screen.init(gameState);
  }

  static showStats(gameState) {
    statsScreen.init(gameState);
  }
}
