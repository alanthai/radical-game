import {SCREENS} from './layout';
import {levels} from './data/training';

import WorldLevelScreen from './screens/WorldLevelScreen';
import TrainingLevelScreen from './screens/TrainingLevelScreen';
import TrainingMenuScreen from './screens/TrainingMenuScreen';

import {getTexture} from './assetLoader'
import {ticker} from './globals';

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

    // blank placeholder
    this.currentScreen = {container: new PIXI.Container()};
    stage.addChildAt(this.currentScreen.container, 0);

    this.overlay = new GameOverlay(this);
    stage.addChildAt(this.overlay.container, 1);

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
    this.stage.addChildAt(screen.container, 0);

    this.stage.removeChild(this.currentScreen.container);
    this.currentScreen.container.destroy();
    this.currentScreen.container.interactiveChildren = false;

    this.currentScreen = screen;

    this.unhighlight();

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
        this.goTo(SCREENS.WORLD_LEVEL, {levelNumber: highestLevel});
        this.stage.emit('worldLevel:new', highestLevel);
      // } else {
      //   this.goTo(SCREENS.WORLD_MENU)
      // }
    });
  }

  // for now assume achor is center
  // consider making directions enum
  /**
   * Produces an arrow that visually shows points to something new or important
   * @param container Object being highlighted
   * @param direction Values are 'right', 'left', 'up', 'down'
  */
  highlight(container, direction='left') {
    var params = {
      left:  {dir:  1, z: 'x', rotation: 0 * Math.PI, dim: 'width'},
      right: {dir: -1, z: 'x', rotation: 1 * Math.PI, dim: 'width'},
      up:    {dir:  1, z: 'y', rotation: 0.5 * Math.PI, dim: 'height'},
      down:  {dir: -1, z: 'y', rotation: 1.5 * Math.PI, dim: 'height'}
    }[direction];

    var arrow = this.arrow = new PIXI.Sprite(getTexture('arrow'));
    arrow.anchor.set(0, 0.5);
    arrow.rotation = params.rotation;
    this.stage.addChild(arrow); 
    var {x, y} = container.getGlobalPosition();
    arrow.position.set(x, y);
    arrow[params.z] += container[params.dim] / 2;
    var z = arrow[params.z];

    // bouncing animation
    var theta = 0;
    var tf = 1200; // total time (in ms) to complete 2 bounces
    var TAU = 2 * Math.PI;
    var amplitude = 30; // is haved since we're taking abs value of sin wave

    this._tickerId = ticker.onTick((tick, diff) => {
      theta += TAU * diff / tf;
      arrow[params.z] = z + params.dir * amplitude * Math.abs(Math.sin(theta));
    });
  }

  unhighlight() {
    if (!this.arrow) return;

    this.stage.removeChild(this.arrow);
    this.arrow.destroy();
    this.arrow = null;
    ticker.removeListener(this._tickerId);
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
