import {deepClone, shuffle, getRandom} from '../util';

import data from '../data/index';

var dataTraining = deepClone(data.training.levels);
var dataEnemies = deepClone(data.enemies);
var dataWords = deepClone(data.words);

import Word from '../Word';
import WordpartSet from '../WordpartSet';
import Enemy from '../entities/enemy';
import EnemyInfo from '../entities/enemyInfo';

import {level as layoutLevel} from '../layout';

/**
 * returns a generator function that takes no arguments.
 * generator() returns a random word's variant
 * @param variant {string} I.E., chinese, english, pinyin, parts
 * @param levelChoices {Array.<string>} get random word from select levels
*/
function generateRandomWord(variant, levelChoices) {
  // get unique set of words
  var hashWords = levelChoices.reduce((hash, n) => {
    dataTraining[n].words.forEach(word => hash[word] = true);
    return hash;
  }, {});

  var wordVariants = Object.keys(hashWords).reduce((words, word) => {
    var wordVar = dataWords[word][variant];
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
  var parts = wparts.slice();
  for (let i = 0, len = numPoints - parts.length; i < len; i++) {
    parts.push(generateFn());
  }

  return shuffle(parts);
}

export default class LevelScreen {
  constructor(game, params) {
    this.game = game;
    this.data = params;

    this.enemyChoices = params.enemies.map(enemy => dataEnemies[enemy]);
    this.wordChoices = params.words.map(word => dataWords[word]);

    this.nextWord = this.nextWord.bind(this);

    this.initEntities();
  }

  initEntities() {
    var container = this.container = new PIXI.Container();

    var display = this.display = new PIXI.Text(this.data.display);
    display.anchor.x = 1;
    container.addChild(display);
    display.position.set(...layoutLevel.display);

    // placeholders;
    this.enemy = {died: () => true, container: new PIXI.Container()};
    this.wordpartSet = {container: new PIXI.Container(), destroy: () => {}};
    this.enemyInfo = {container: new PIXI.Container()};

    this.nextWord();
  }

  nextWord() {
    var variants = getRandom(this.data.variants);
    var wordObj = getRandom(this.wordChoices);
    var newWord = new Word(wordObj, variants.build);

    if (this.enemy.died() || this.enemy.fled()) {
      this.nextEnemy(newWord, variants.learn);
    } else {
      this.enemy.nextWordVariant(newWord.getPieces(variants.learn));
    }

    this.nextWordpartSet(newWord, variants.build);
  }

  nextEnemy(word, variant) {
    this.container.removeChild(this.enemy.container);
    this.container.removeChild(this.enemyInfo.container);
    this.enemyInfo.container.destroy();

    var enemyData = getRandom(this.enemyChoices);
    var enemy = this.enemy = new Enemy(word.getPieces(variant), enemyData);
    this.container.addChild(enemy.container);
    enemy.container.position.set(...layoutLevel.enemy);

    this.enemyInfo = new EnemyInfo(enemy, this.data.enemyInfoOptions);
    var enemyInfo = this.enemyInfo;
    this.container.addChild(enemyInfo.container);
    enemyInfo.container.position.set(...layoutLevel.enemyInfo);

    enemy.container.on('enemy:died', () => {
      this.addGold();

      if (this.isComplete()) {
        return this.fireCompleted();
      }

      this.nextWord();
      // animate dying
      // setTimeout(() => {
      // }, 500);

    });

    enemy.container.on('enemy:hurt', this.nextWord);
    enemy.container.on('enemy:fled', this.nextWord);
    // enemy.container.on('enemy:hurt', setTimeout(this.nextWord, 500));
    // enemy.container.on('enemy:fled', setTimeout(this.nextWord, 500));
  }

  fireCompleted() {
    throw 'AbstractError: override #fireCompleted() method';
  }

  isComplete() {
    throw 'AbstractError: override #isComplete() method';
  }

  nextWordpartSet(word, variant) {
    var data = this.data;
    this.container.removeChild(this.wordpartSet.container);
    // this.wordpartSet.container.destroy();
    this.wordpartSet.destroy();

    var levelIds = data.levelChoices
    var wordparts = word.getPieces(variant);
    var generator = generateRandomWord.bind(
      null, variant, data.levelChoices);
    var parts = generateMissingParts(generator, wordparts, 6);
    this.wordpartSet = new WordpartSet(word, parts, data.giveHints);
    this.container.addChild(this.wordpartSet.container);

    this.wordpartSet.container.on('word:completed', () => {
      this.resolveAttack();
    });

    this.wordpartSet.container.on('word:incorrect', () => {
      this.resolveMiss();
    });
  }

  addGold() {
    var levelMultiplier = 1;
    var earned = this.enemy.get('gold') * levelMultiplier;

    this.game.addGold(earned);
  }

  resolveAttack() {
    // var levelMultipler = 1
    // var damage = this.game.getDamage();
    var damage = 1;
    this.enemy.attack(damage);
  }

  resolveMiss() {
    this.enemy.miss();
  }
};
