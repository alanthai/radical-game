import LevelScreen from './LevelScreen';

import {levels, allVariants} from '../data/training';

class TrainingLevelScreen extends LevelScreen {
  constructor(game, params) {
    var levelData = levels[params.levelId];

    var trainingParams = Object.assign({}, levelData, params);
    trainingParams.enemies = ['dummy'];
    trainingParams.display = `Training: ${levelData.title}`;
    trainingParams.levelChoices = ['basics1', 'basics2'];
    trainingParams.giveHints = true;
    trainingParams.enemyInfoOptions =
      {hideHealthbar: true, hideFleeCounter: true};
    trainingParams.background = 'img/background_training.png';

    trainingParams.variants = ~params.subLevel
      ? [allVariants[params.subLevel]]
      : allVariants;

    // temporary counter to track number of words left
    // until memory system is in place;
    this.wordsLeft = 1;

    super(game, trainingParams);
  }

  nextWordpartSet() {
    super.nextWordpartSet(...arguments);
    this.wordpartSet.container.on('word:completed', () => this.wordsLeft--);
  }

  fireCompleted() {
    this.container.removeChild(this.wordpartSet.container);
    this.game.stage.emit('trainingLevel:completed', this);
  }

  isComplete() {
    return this.wordsLeft < 1;
  }
}

export default TrainingLevelScreen;
