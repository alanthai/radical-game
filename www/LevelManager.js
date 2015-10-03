"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var dataLevels = deepClone(Game.data.levels);
var dataEnemies = deepClone(Game.data.enemies);
var dataWords = deepClone(Game.data.words);

var LevelManager = (function () {
  function LevelManager(level) {
    _classCallCheck(this, LevelManager);

    this.levelNumber = level;
    var levelData = dataLevels[level];
    this.enemyChoices = levelData.enemies.map(function (enemy) {
      return dataEnemies[enemy];
    });
    this.wordChoices = levelData.words.map(function (word) {
      return dataWords[word];
    });

    this.wordChoices.forEach(function (word) {
      word.parts = word.parts.map(function (part) {
        return dataWords[part];
      });
    });

    this.points = 0;

    this.container = new PIXI.Container();

    this.step = this.step.bind(this);
    this.step();
  }

  _createClass(LevelManager, {
    step: {
      value: function step() {
        if (this.wordpartSet) {
          this.points += this.enemy.points;
          this.removeEntities();
        }

        this.generateEntities();
      }
    },
    generateEntities: {
      value: function generateEntities() {
        var _this = this;

        var word = getRandom(this.wordChoices);
        var enemyData = getRandom(this.enemyChoices);
        this.enemy = new Enemy(word, enemyData);
        this.wordpartSet = new WordpartSet(word, 6);

        this.container.addChild(this.wordpartSet.container);
        this.container.addChild(this.enemy.container);
        this.wordpartSet.container.on("word:completed", function () {
          _this.wordpartSet.container.removeAllListeners();
          setTimeout(_this.step, 1000);
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