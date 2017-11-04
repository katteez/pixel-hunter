import introScreen from './screens/intro/intro-screen';
import greetingScreen from './screens/greeting/greeting-screen';
import rulesScreen from './screens/rules/rules-screen';
import Game1Screen from './screens/games/game-1';
import Game2Screen from './screens/games/game-2';
import Game3Screen from './screens/games/game-3';
import statsScreen from './screens/stats/stats-screen';
import statsData from './screens/stats/stats-data';
import gameState from './game-state';
import Loader from './loader';

const ControllerId = {
  INTRO: ``,
  GREETING: `greeting`,
  RULES: `rules`,
  GAME_1: `game1`,
  GAME_2: `game2`,
  GAME_3: `game3`,
  STATS: `stats`
};

export default class Application {
  static init(gameData) {
    this.gameData = gameData;
    this.userName = `katteez`;

    this.routes = {
      [ControllerId.INTRO]: introScreen,
      [ControllerId.GREETING]: greetingScreen,
      [ControllerId.RULES]: rulesScreen,
      [ControllerId.GAME_1]: new Game1Screen(gameData),
      [ControllerId.GAME_2]: new Game2Screen(gameData),
      [ControllerId.GAME_3]: new Game3Screen(gameData),
      [ControllerId.STATS]: statsScreen
    };

    const onHashChange = () => {
      const hashValue = location.hash.replace(`#`, ``);
      const [id, name] = hashValue.split(`?`);
      if (name) {
        this.userName = name;
      }
      this.changeHash(id);
    };
    window.addEventListener(`hashchange`, onHashChange);
    onHashChange();
  }

  static changeHash(id) {
    const controller = this.routes[id];
    if (controller) {
      switch (controller) {
        case statsScreen:
          controller.init(statsData);
          break;
        default:
          controller.init(gameState);
          break;
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

  static showGame(state) {
    switch (this.gameData[gameState.questionNumber].type) {
      case `two-of-two`:
        Application.routes[ControllerId.GAME_1].init(state);
        break;
      case `tinder-like`:
        Application.routes[ControllerId.GAME_2].init(state);
        break;
      case `one-of-three`:
        Application.routes[ControllerId.GAME_3].init(state);
        break;
    }
  }

  static showStats(state) {
    Loader.saveResults(state, state.playerName).then(() => {
      location.hash = `${ControllerId.STATS}?${state.playerName}`;
    });
  }
}


Loader.loadData()
    .then((gameData) => Application.init(gameData))
    .catch(window.console.error);
