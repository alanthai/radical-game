import LevelScreen from './LevelScreen';

import {levels, allVariants} from '../data/training';
import world from '../data/world';
import {getNRandom} from '../util';
import {level as layoutLevel} from '../layout.js';
import {getTexture} from '../assetLoader';

function flatten(arr) {
  return [].concat(...arr);
}

/*
 * params includes: 
 *   dataWords, dataEnemies, 
 *   and dataLevels[level], selectFromLevelVocab
 *   levelId and subLevel
 */
class WorldLevelScreen extends LevelScreen {
  constructor(game, {levelNumber} = {}) {
    levelNumber = levelNumber || game.data.worldLevel;

    var levelData = world[levelNumber];

    var worldParams = Object.assign({levelNumber}, levelData);
    worldParams.display = `Level ${levelNumber}`;

    var levelIds = Object.keys(game.data.trainingUnlocked);
    worldParams.levelChoices = getNRandom(levelIds, 3);

    // worldParams.levelChoices = ['basics1', 'basics2'];

    var levelChoices = worldParams.levelChoices;
    var words = levelChoices.map(level => levels[level].words);
    worldParams.words = flatten(words);
    worldParams.variants = allVariants;
    worldParams.background = 'img/background_01.png';

    this.killCount = 0;
    this.killsRequired = worldParams.killsRequired;
    
    super(game, worldParams);
  }

  initEntities() {
    super.initEntities(...arguments);

    var kcOptions = layoutLevel.killCount;
    var killCounter = this.killCounter = new PIXI.Container();
    killCounter.position.set(...kcOptions.position);

    var skull = this.skull = new PIXI.Sprite(getTexture('skull'));
    skull.anchor.set(1, 0);
    skull.x = -5; // padding
    killCounter.addChild(skull);

    var killText = this.killText = new PIXI.Text('', kcOptions.style);
    killCounter.addChild(killText);

    this.container.addChild(killCounter);

    this.updateKillText();
  }

  updateKillText() {
    this.killText.text = `${this.killCount}/${this.killsRequired}`;
  }

  nextEnemy() {
    super.nextEnemy(...arguments);
    this.enemy.container.on('enemy:died', () => {
      this.killCount++;
      this.updateKillText();
    });
  }

  fireCompleted() {
    this.game.stage.emit('worldLevel:completed', this);
  }

  isComplete() {
      // The isComplete() check happens before nextEnemy()
    // so we have to start with +1 to get the proper count
    return this.killCount + 1 >= this.killsRequired;
  }
}

export default WorldLevelScreen;
