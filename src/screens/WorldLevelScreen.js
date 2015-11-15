import LevelScreen from './LevelScreen';

import {levels, allVariants} from '../data/training';
import world from '../data/world';
import {getNRandom} from '../util';

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
    // worldParams.levelChoices = getNRandom(, 3);
    worldParams.levelChoices = ['basics1', 'basics2'];
    // var levelChoices = Object.keys(this.game.data.trainingUnlocked);
    var levelChoices = worldParams.levelChoices;
    var words = levelChoices.map(level => levels[level].words);
    worldParams.words = flatten(words);
    worldParams.variants = allVariants;

    // The isComplete() check happens before nextEnemy()
    // so we have to start reduced by 1 to get the proper count
    this.enemiesLeft = worldParams.killsRequired - 1;
    
    super(game, worldParams);
  }

  nextEnemy() {
    super.nextEnemy(...arguments);
    this.enemy.container.on('enemy:died', () => {this.enemiesLeft--});
  }

  fireCompleted() {
    this.game.stage.emit('worldLevel:completed', this);
  }

  isComplete() {
    return this.enemiesLeft < 1;
  }
}

export default WorldLevelScreen;
