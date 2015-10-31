var {deepClone, shuffle, getRandom} = require('./util.js');

var data = require('./data/index');

var dataLevels = deepClone(data.levels);
var dataEnemies = deepClone(data.enemies);
var dataWords = deepClone(data.words);

var Vector = require('./Vector');
var Word = require('./Word');
var WordpartSet = require('./WordpartSet');
var Enemy = require('./entities/enemy.js');

var config = require('./config');

function pad(n) {
  return ('00000' + n).slice(-5);
}

/**
 * returns a generator function that takes no arguments.
 * generator() returns a random word's variant
 * @param variant {string} I.E., chinese, english, pinyin, parts
 * @param levelNumbers {Array.<number>} get random word from select levels
*/
function generateRandomWord(variant, levelNumbers) {
  // get unique set of words
  var hashWords = levelNumbers.reduce((hash, n) => {
    dataLevels[n].words.forEach(word => hash[word] = true);
    return hash;
  }, {});

  var wordVariants = Object.keys(hashWords).reduce((words, word) => {
    var wordVar = dataWords[word][variant];
    if (typeof wordVar === 'undefined') debugger;
    return words.concat(wordVar);
  }, []);

  return getRandom(wordVariants);
}

/**
 * Fills `parts` array with random parts
 * until it reaches `numPoints` elements
 * @param generateFn {Function} returns a random part
 * @param wparts {Array.<String>} existing list of words
 * @param numPoints {Integer} number of total parts to return
 */
function generateMissingParts(generateFn, wparts, numPoints) {
  var parts = wparts.slice(0);
  for (let i = 0, len = numPoints - parts.length; i < len; i++) {
    parts.push(generateFn());
  }

  return shuffle(parts);
}

class LevelManager {
  constructor(level) {
    this.levelNumber = level;
    var levelData = this.data = dataLevels[level];
    this.enemyChoices = levelData.enemies.map(enemy => dataEnemies[enemy]);
    this.wordChoices = levelData.words
      .map(word => new Word(dataWords[word], levelData.variants.build));

    var container = this.container = new PIXI.Container();

    this.completed = false;

    // Scores and level displays don't belong in a level manager.
    // They are persistent throughout each level
    this.score = 0;
    this.scoreboard = new PIXI.Text('00000');
    container.addChild(this.scoreboard);
    var scoreboardPos = new Vector(config.levelManager.scoreboard);
    Vector.move(this.scoreboard, scoreboardPos);

    var dispLevel = this.dispLevel = new PIXI.Text('Level ' + level);
    dispLevel.anchor.x = 1;
    container.addChild(dispLevel);
    var levelDisplayPos = new Vector(config.levelManager.levelDisplay);
    Vector.move(dispLevel, levelDisplayPos);

    this.step = this.step.bind(this);
    this.step();
  }

  setScore(score) {
    this.score = score;
    this.scoreboard.text = pad(score);
  }

  addPoints(points) {
    this.setScore(this.score + points);
  }

  step() {
    if (this.wordpartSet) {
      this.addPoints(this.enemy.data.points);
      this.removeEntities();
      this.completed = this.score >= this.data.pointsGoal;
    }

    if (!this.completed) {
      this.generateEntities();
    } else {
      this.container.emit('level:completed', this.levelNumber);
    }
  }

  generateEntities() {
    var word = getRandom(this.wordChoices);
    var variants = this.data.variants;

    var wordparts = word.getPieces(variants.build);
    var buildVar = this.data.variants.build;
    var generator = generateRandomWord.bind(null, variants.build, [1, 2, 3]);
    var parts = generateMissingParts(generator, wordparts, 6);
    this.wordpartSet = new WordpartSet(word, parts);

    var enemyData = getRandom(this.enemyChoices);
    this.enemy = new Enemy(word.getPieces(variants.learn), enemyData);

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

module.exports = LevelManager;
