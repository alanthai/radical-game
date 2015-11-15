import {SCREENS} from './layout';
import {levels} from './data/training';

import WorldLevelScreen from './screens/WorldLevelScreen';
import TrainingLevelScreen from './screens/TrainingLevelScreen';
import TrainingMenuScreen from './screens/TrainingMenuScreen';

import GameOverlay from './GameOverlay';

const screenClasses = {
  [SCREENS.WORLD_LEVEL]: WorldLevelScreen,
  [SCREENS.TRAINING_LEVEL]: TrainingLevelScreen,
  [SCREENS.TRAINING_MENU]: TrainingMenuScreen,
};

const INITIAL_PLAYER = {
  gold: 0,
  worldLevel: 1,
  trainingUnlocked: {/*levelId: {completed, highlight}*/},
  upgrades: []
};

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

    // var goToParams = {levelId: 'basics1', subLevel: 0};
    // this.goTo(SCREENS.TRAINING_LEVEL, goToParams);
    this.goTo(SCREENS.WORLD_LEVEL);
  }

  addGold(gold) {
    this.data.gold += gold;
    this.overlay.items.gold.text = this.data.gold;
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
    this.stage.on('trainingLevel:completed', levelScreen => {
      var data = levelScreen.data;
      var levelId = data.levelId;

      if (~data.subLevel) {
        let subLevel = data.subLevel < 3
          ? data.subLevel + 1
          : -1;

        this.goTo(SCREENS.TRAINING_LEVEL, {levelId: levelId, subLevel});
      } else {
        if (levelId !== 'basics1') {
          this.goTo(SCREENS.TRAINING_MENU);
        }

        this.data.trainingUnlocked[levelId] = {completed: true, highlight: false};
        this.save();
      }
    });

    this.stage.on('worldLevel:completed', levelScreen => {
      var data = levelScreen.data;
      var highestLevel = this.data.worldLevel;

        // unlock new levels
        // this.data.trainingUnlocked[levelId] = {completed: false, highlight: true}

      // if (data.levelNumber >= highestLevel) {
        highestLevel++;
        this.data.worldLevel = highestLevel;
        this.save();
        this.stage.emit('worldLevel:new', highestLevel);
        this.goTo(SCREENS.WORLD_LEVEL, {levelNumber: highestLevel});
      // } else {
      //   this.goTo(SCREENS.WORLD_MENU)
      // }
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
    // localStorage.setItem('player', JSON.stringify(this.data));
  }
}

// playerDamage

export default Game;
