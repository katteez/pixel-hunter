import introScreen from './screens/intro/intro-screen';
import greetingScreen from './screens/greeting/greeting-screen';
import rulesScreen from './screens/rules/rules-screen';
import Game1Screen from './screens/games/game-1';
import Game2Screen from './screens/games/game-2';
import Game3Screen from './screens/games/game-3';
import statsScreen from './screens/stats/stats-screen';
import statsData from './screens/stats/stats-data';
import gameState from './game-state';
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

export default class Application {
  static init(gameData) {
    this.gameData = gameData;

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
      const [id, data] = hashValue.split(`?`);
      this.changeHash(id, data);
    };
    window.addEventListener(`hashchange`, onHashChange);
    onHashChange();
  }

  static changeHash(id, data) {
    const controller = this.routes[id];
    if (controller) {
      if (data) {
        const newGameState = decode(data);
        gameState.time = newGameState.time;
        gameState.lives = newGameState.lives;
        gameState.answers = newGameState.answers;
        gameState.questionNumber = newGameState.questionNumber;
        gameState.win = newGameState.win;

        switch (controller) {
          case statsScreen:
            controller.init(gameState, statsData);
            break;
          default:
            controller.init(gameState);
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
    location.hash = `${ControllerId.STATS}?${encode(state)}`;
  }
}
