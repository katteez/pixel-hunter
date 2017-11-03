import introScreen from './screens/intro/intro-screen';
import greetingScreen from './screens/greeting/greeting-screen';
import rulesScreen from './screens/rules/rules-screen';
import game1Screen from './screens/games/game-1';
import game2Screen from './screens/games/game-2';
import game3Screen from './screens/games/game-3';
import statsScreen from './screens/stats/stats-screen';
import statsData from './screens/stats/stats-data';
import {encode, decode} from './encode';

const ControllerId = {
  INTRO: ``,
  GREETING: `greeting`,
  RULES: `rules`,
  GAME_1: `game1`,
  GAME_2: `game2`,
  GAME_3: `game3`,
  STATS: `stats`
};

const routes = {
  [ControllerId.INTRO]: introScreen,
  [ControllerId.GREETING]: greetingScreen,
  [ControllerId.RULES]: rulesScreen,
  [ControllerId.GAME_1]: game1Screen,
  [ControllerId.GAME_2]: game2Screen,
  [ControllerId.GAME_3]: game3Screen,
  [ControllerId.STATS]: statsScreen
};


export default class Application {
  static init() {
    const onHashChange = () => {
      const hashValue = location.hash.replace(`#`, ``);
      const [id, data] = hashValue.split(`?`);
      this.changeHash(id, data);
    };
    window.addEventListener(`hashchange`, onHashChange);
    onHashChange();
  }

  static changeHash(id, data) {
    const controller = routes[id];
    if (controller) {
      if (data) {
        switch (controller) {
          case statsScreen:
            controller.init(decode(data), statsData);
            break;
          default:
            controller.init(decode(data));
            break;
        }
      } else {
        controller.init();
      }
    }
  }

  static showIntro() {
    location.hash = ControllerId.INTRO;
  }

  static showGreeting() {
    location.hash = ControllerId.GREETING;
  }

  static showRules() {
    location.hash = ControllerId.RULES;
  }

  static showGame1(gameState) {
    location.hash = `${ControllerId.GAME_1}?${encode(gameState)}`;
  }

  static showGame2(gameState) {
    location.hash = `${ControllerId.GAME_2}?${encode(gameState)}`;
  }

  static showGame3(gameState) {
    location.hash = `${ControllerId.GAME_3}?${encode(gameState)}`;
  }

  static showStats(gameState) {
    location.hash = `${ControllerId.STATS}?${encode(gameState)}`;
  }
}
