var dataLevels = deepClone(Game.data.levels);
var dataEnemies = deepClone(Game.data.enemies);
var dataWords = deepClone(Game.data.words);

class LevelManager {
  constructor(level) {
    this.levelNumber = level;
    var levelData = dataLevels[level];
    this.enemyChoices = levelData.enemies.map(enemy => dataEnemies[enemy]);
    this.wordChoices = levelData.words.map(word => dataWords[word]);

    this.wordChoices.forEach(word => {
      word.parts = word.parts.map(part => dataWords[part]);
    });

    this.points = 0;

    this.container = new PIXI.Container();

    this.step = this.step.bind(this);
    this.step();
  }

  step() {
    if (this.wordpartSet) {
      this.points += this.enemy.points;
      this.removeEntities();
    }

    this.generateEntities();
  }

  generateEntities() {
    var word = getRandom(this.wordChoices);
    var enemyData = getRandom(this.enemyChoices);
    this.enemy = new Enemy(word, enemyData)
    this.wordpartSet = new WordpartSet(word, 6);

    this.container.addChild(this.wordpartSet.container);
    this.container.addChild(this.enemy.container);
    this.wordpartSet.container.on('word:completed', () => {
      this.wordpartSet.container.removeAllListeners();
      setTimeout(this.step, 1000);
    });
  }

  removeEntities() {
    this.container.removeChild(this.wordpartSet.container);
    this.container.removeChild(this.enemy.container);
    this.wordpartSet.container.destroy();
  }
}
