import LevelScreen from './LevelScreen';

import {levels, allVariants} from '../data/training';
import world from '../data/world';
import {getNRandom} from '../util';

/*
 * params includes: 
 *   dataWords, dataEnemies, 
 *   and dataLevels[level], selectFromLevelVocab
 *   levelId and subLevel
 */
class WorldLevelScreen extends LevelScreen {
  constructor(game, params) {
    this.data = params;
    var levelData = world[params.levelNumber];

    var worldParams = Object.assign({}, params);
    worldParams.display = `Level ${params.levelNumber}`;
    // worldParams.levelChoices = getNRandom(, 3);
    worldParams.levelChoices = ['basics1', 'basics2'];
    worldParams.variants = allVariants;

    // The isComplete() check happens before nextEnemy()
    // so we have to start reduced by 1 to get the proper count
    this.enemiesLeft = params.killsRequired - 1;
    
    super(game, worldParams);
  }

  nextEnemy() {
    super.nextEnemy();
    this.enemy.container.on('enemy:died', () => this.enemiesLeft--);
  }

  fireCompleted() {
    this.game.stage.emit('worldLevel:completed', this);
  }

  isComplete() {
    return this.killsRequired < 1;
  }
}

export default WorldLevelScreen;
