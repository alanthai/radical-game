define(["exports", "module", "./util", "./data/index", "./Vector", "./Word", "./WordpartSet", "./entities/enemy", "./config"], function (exports, module, _util, _dataIndex, _Vector, _Word, _WordpartSet, _entitiesEnemy, _config) {
  "use strict";

  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

  var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

  var deepClone = _util.deepClone;
  var shuffle = _util.shuffle;
  var getRandom = _util.getRandom;

  var data = _interopRequire(_dataIndex);

  var dataLevels = deepClone(data.levels);
  var dataEnemies = deepClone(data.enemies);
  var dataWords = deepClone(data.words);

  var Vector = _interopRequire(_Vector);

  var Word = _interopRequire(_Word);

  var WordpartSet = _interopRequire(_WordpartSet);

  var Enemy = _interopRequire(_entitiesEnemy);

  var config = _interopRequire(_config);

  function pad(n) {
    return ("00000" + n).slice(-5);
  }

  /**
   * returns a generator function that takes no arguments.
   * generator() returns a random word's variant
   * @param variant {string} I.E., chinese, english, pinyin, parts
   * @param levelNumbers {Array.<number>} get random word from select levels
  */
  function generateRandomWord(variant, levelNumbers) {
    // get unique set of words
    var hashWords = levelNumbers.reduce(function (hash, n) {
      dataLevels[n].words.forEach(function (word) {
        return hash[word] = true;
      });
      return hash;
    }, {});

    var wordVariants = Object.keys(hashWords).reduce(function (words, word) {
      var wordVar = dataWords[word][variant];
      if (typeof wordVar === "undefined") debugger;
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
    for (var i = 0, len = numPoints - parts.length; i < len; i++) {
      parts.push(generateFn());
    }

    return shuffle(parts);
  }

  var LevelManager = (function () {
    function LevelManager(level) {
      _classCallCheck(this, LevelManager);

      this.levelNumber = level;
      var levelData = this.data = dataLevels[level];
      this.enemyChoices = levelData.enemies.map(function (enemy) {
        return dataEnemies[enemy];
      });
      this.wordChoices = levelData.words.map(function (word) {
        return new Word(dataWords[word], levelData.variants.build);
      });

      var container = this.container = new PIXI.Container();

      this.completed = false;

      // Scores and level displays don't belong in a level manager.
      // They are persistent throughout each level
      this.score = 0;
      this.scoreboard = new PIXI.Text("00000");
      container.addChild(this.scoreboard);
      var scoreboardPos = new Vector(config.levelManager.scoreboard);
      Vector.move(this.scoreboard, scoreboardPos);

      var dispLevel = this.dispLevel = new PIXI.Text("Level " + level);
      dispLevel.anchor.x = 1;
      container.addChild(dispLevel);
      var levelDisplayPos = new Vector(config.levelManager.levelDisplay);
      Vector.move(dispLevel, levelDisplayPos);

      this.step = this.step.bind(this);
      this.step();
    }

    _createClass(LevelManager, {
      setScore: {
        value: function setScore(score) {
          this.score = score;
          this.scoreboard.text = pad(score);
        }
      },
      addPoints: {
        value: function addPoints(points) {
          this.setScore(this.score + points);
        }
      },
      step: {
        value: function step() {
          if (this.wordpartSet) {
            this.addPoints(this.enemy.data.points);
            this.removeEntities();
            this.completed = this.score >= this.data.pointsGoal;
          }

          if (!this.completed) {
            this.generateEntities();
          } else {
            this.container.emit("level:completed", this.levelNumber);
          }
        }
      },
      generateEntities: {
        value: function generateEntities() {
          var _this = this;

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
          this.wordpartSet.container.on("word:completed", function () {
            _this.wordpartSet.container.removeAllListeners();
            setTimeout(_this.step, 500);
          });
        }
      },
      removeEntities: {
        value: function removeEntities() {
          this.container.removeChild(this.wordpartSet.container);
          this.container.removeChild(this.enemy.container);
          this.wordpartSet.container.destroy();
        }
      }
    });

    return LevelManager;
  })();

  module.exports = LevelManager;
});