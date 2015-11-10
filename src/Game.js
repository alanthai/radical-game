import V from './Vector';
import {SCREENS, overlay} from './config';
import {getValues} from './util';

import WorldLevelScreen from './screens/WorldLevelScreen';
import TrainingLevelScreen from './screens/TrainingLevelScreen';
// import TrainingMenuScreen from './screens/TrainingMenuScreen';

var screenClasses = {
  [SCREENS.WORLD_LEVEL]: WorldLevelScreen,
  [SCREENS.TRAINING_LEVEL]: TrainingLevelScreen,
  // [SCREENS.TRAINING_MENU]: TrainingMenuScreen,
};

const INITIAL_PLAYER = {
  gold: 0,
  worldLevel: 0,
  trainingCompleted: [],
  upgrades: []
};

var displayScreenOverlay = {
  [SCREENS.WORLD_LEVEL]() {
    this.display('gold');
    // this.display('level');

    // this.game.data.trainingLevel === 2
    //   && this.display('trainingSelectButton');
  },

  [SCREENS.TRAINING_MENU]() {
    this.display('gold');
    this.display('worldLevelButton');
  },

  [SCREENS.TRAINING_LEVEL]() {
    this.display('gold');
    // this.display('level');

    // this.game.data.worldLevel === 2
    //   && this.display('trainingSelectButton');

    // this.game.data.worldLevel === 2
    //   && this.display('worldLevelButton');
  },
};

var createItem = {
  gold() {
    var gold = new PIXI.Text(this.game.data.gold);
    this.container.addChild(gold);
    V.move(gold, V(overlay.gold));

    return gold;
  },

  worldLevelButton() {
    // V.move(level, V(overlay.worldLevelButton));
  },

  trainingSelectButton() {
    // V.move(level, V(overlay.trainingSelectButton));
  },

  trainingLevelButton() {
    // V.move(level, V(overlay.trainingLevelButton));
  }
}

class GameOverlay {
  constructor(game) {
    this.game = game;
    this.container = new PIXI.Container();
    this.items = {};
  }

  displayScreenOverlay(enumScreen) {
    this.hideAll();
    displayScreenOverlay[enumScreen].call(this);
  }

  display(itemName) {
    if (!this.items[itemName]) {
      this.items[itemName] = createItem[itemName].call(this);
    }
    this.items[itemName].alpha = 1;
  }

  hideAll() {
    var items = this.items;
    getValues(items).forEach(item => {
      item.alpha = 1;
    });
  }
}

/**
 * Switches screens
 * React to global events
 * Stores game save data
 */
class Game {
  constructor() {
    this.loadSave();

    var stage = this.stage = new PIXI.Container();

    this.overlay = new GameOverlay(this);
    stage.addChild(this.overlay.container);

    // blank placeholder
    this.currentScreen = {container: new PIXI.Container()};
    stage.addChild(this.currentScreen.container);

    this.initGlobalEventHandlers();

    var goToParams = {levelId: 'basics1', subLevel: 0};
    this.goTo(SCREENS.TRAINING_LEVEL, goToParams);
  }

  addGold(gold) {
    this.data.gold = gold;
    this.overlay.items.gold.text = gold;
  }

  goTo(enumScreen, options) {
    var ScreenClass = screenClasses[enumScreen];
    var screen = new ScreenClass(this, options);
    this.stage.addChild(screen.container);

    this.stage.removeChild(this.currentScreen.container);
    this.currentScreen.container.destroy();
    this.currentScreen = screen;

    this.overlay.displayScreenOverlay(enumScreen);
  }

  initGlobalEventHandlers() {
    // on world level increase,
    this.stage.on('trainingLevel:completed', levelScreen => {
      var data = levelScreen.data;
      var subLevel = data.subLevel < 4
        ? data.subLevel + 1
        : -1;

      this.goTo(SCREENS.TRAINING_LEVEL, {levelId: data.levelId, subLevel});
    });

    this.stage.on('worldLevel:completed', levelScreen => {
      var data = levelScreen.data;
      var highestLevel = this.data.worldLevel;

      if (data.levelNumber >= highestLevel) {
        this.data.worldLevel++;
        // check unlocks
        this.save();
        this.goTo(SCREENS.WORLD_LEVEL, {levelNumber: highestLevel + 1});
      } else {
        // goTo(SCREENS.WORLD_MENU)
      }
    });
  }

  loadSave() {
    var json = localStorage.getItem('player');
    if (json) {
      this.data = JSON.parse(json);
    } else {
      // create new players
      this.data = Object.assign({}, INITIAL_PLAYER);
    }
  }

  save() {
    localStorage.setItem('player', JSON.parse(this.data));
  }
}

// playerDamage

export default Game;
