import V from './Vector';
import {SCREENS, overlay} from './layout';
import {getValues} from './util';
import {getTexture} from './assetLoader';
import {levels} from './data/training';

const TRAINING_MENU_UNLOCK = 'basics1';
const WORLD_LEVEL_UNLOCK = 'basics1';

/** To do: Add messaging? */

var displayScreenOverlay = {
  [SCREENS.WORLD_LEVEL]() {
    this.display('gold');
    this.display('trainingMenuButton');
  },

  [SCREENS.TRAINING_MENU]() {
    this.display('gold');

    this.displayIfUnlocked(WORLD_LEVEL_UNLOCK, 'worldLevelButton');
  },

  [SCREENS.TRAINING_LEVEL]() {
    this.display('gold');

    this.displayIfUnlocked(TRAINING_MENU_UNLOCK, 'trainingMenuButton');
    this.displayIfUnlocked(WORLD_LEVEL_UNLOCK, 'worldLevelButton');
  },
};

var createItem = {
  gold() {
    var gold = new PIXI.Text(this.game.data.gold, overlay.gold.style);
    this.container.addChild(gold);
    gold.position.set(...overlay.gold.position);

    return gold;
  },

  worldLevelButton() {
    var button = new PIXI.Sprite(getTexture('world-button'));
    this.container.addChild(button);
    button.position.set(...overlay.worldLevelButton);
    button.anchor.set(0.5);

    button.interactive = true;
    button.click = button.tap = () => {
      button.interactive && this.game.goTo(SCREENS.WORLD_LEVEL);
    };

    return button;
  },

  trainingMenuButton() {
    var button = new PIXI.Sprite(getTexture('training-button'));
    this.container.addChild(button);
    button.position.set(...overlay.trainingMenuButton);
    button.anchor.set(0.5);

    button.interactive = true;
    button.click = button.tap = () => {
      button.interactive && this.game.goTo(SCREENS.TRAINING_MENU);
    };

    return button;
  }
}

class GameOverlay {
  constructor(game) {
    this.game = game;
    this.container = new PIXI.Container();
    this.items = {};
    
    this.initEventListeners();
  }

  initEventListeners() {
    this.game.stage.on('trainingLevel:completed', levelScreen => {
      var data = levelScreen.data;
      if (!~data.subLevel) {
        if (data.levelId === TRAINING_MENU_UNLOCK) {
          this.display('trainingMenuButton');
          this.highlight('trainingMenuButton');
        }
        if (data.levelId === WORLD_LEVEL_UNLOCK) {
          this.display('worldLevelButton');
          this.highlight('worldLevelButton');
        }
      }
    });

    function getUnlocked(levelNumber) {
      return getValues(levels).filter(level => level.unlock === levelNumber);
    }

    this.game.stage.on('worldLevel:new', levelNumber => {
        var unlocked = getUnlocked(levelNumber);
        if (unlocked.length) {
          var msg = 'New level unlocked!';
          this.game.highlight(this.items.trainingMenuButton, 'left', msg);
        }
    })
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
    this.items[itemName].interactive = true;
  }

  displayIfUnlocked(trainingLevelId, itemName) {
    var unlocked = this.game.data.trainingUnlocked[trainingLevelId];
    if (!unlocked) return;

    this.display(itemName);

    // if () {
    //   this.highlight(itemName);
    // }
  }

  highlight(itemName, message) {
  }

  hideAll() {
    getValues(this.items).forEach(item => {
      item.alpha = 0;
      item.interactive = false;
    });
  }
}

export default GameOverlay;
