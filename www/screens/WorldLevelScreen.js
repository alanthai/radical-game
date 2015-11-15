define(["exports", "module", "./LevelScreen", "../data/training", "../data/world", "../util"], function (exports, module, _LevelScreen2, _dataTraining, _dataWorld, _util) {
  "use strict";

  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

  var _toConsumableArray = function (arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } };

  var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

  var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

  var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

  var LevelScreen = _interopRequire(_LevelScreen2);

  var levels = _dataTraining.levels;
  var allVariants = _dataTraining.allVariants;

  var world = _interopRequire(_dataWorld);

  var getNRandom = _util.getNRandom;

  function flatten(arr) {
    var _ref;

    return (_ref = []).concat.apply(_ref, _toConsumableArray(arr));
  }

  /*
   * params includes: 
   *   dataWords, dataEnemies, 
   *   and dataLevels[level], selectFromLevelVocab
   *   levelId and subLevel
   */

  var WorldLevelScreen = (function (_LevelScreen) {
    function WorldLevelScreen(game) {
      var _ref = arguments[1] === undefined ? {} : arguments[1];

      var levelNumber = _ref.levelNumber;

      _classCallCheck(this, WorldLevelScreen);

      levelNumber = levelNumber || game.data.worldLevel;

      var levelData = world[levelNumber];

      var worldParams = Object.assign({ levelNumber: levelNumber }, levelData);
      worldParams.display = "Level " + levelNumber;
      // worldParams.levelChoices = getNRandom(, 3);
      worldParams.levelChoices = ["basics1", "basics2"];
      // var levelChoices = Object.keys(this.game.data.trainingUnlocked);
      var levelChoices = worldParams.levelChoices;
      var words = levelChoices.map(function (level) {
        return levels[level].words;
      });
      worldParams.words = flatten(words);
      worldParams.variants = allVariants;

      // The isComplete() check happens before nextEnemy()
      // so we have to start reduced by 1 to get the proper count
      this.enemiesLeft = worldParams.killsRequired - 1;

      _get(Object.getPrototypeOf(WorldLevelScreen.prototype), "constructor", this).call(this, game, worldParams);
    }

    _inherits(WorldLevelScreen, _LevelScreen);

    _createClass(WorldLevelScreen, {
      nextEnemy: {
        value: function nextEnemy() {
          var _this = this;

          _get(Object.getPrototypeOf(WorldLevelScreen.prototype), "nextEnemy", this).apply(this, arguments);
          this.enemy.container.on("enemy:died", function () {
            _this.enemiesLeft--;
          });
        }
      },
      fireCompleted: {
        value: function fireCompleted() {
          this.game.stage.emit("worldLevel:completed", this);
        }
      },
      isComplete: {
        value: function isComplete() {
          return this.enemiesLeft < 1;
        }
      }
    });

    return WorldLevelScreen;
  })(LevelScreen);

  module.exports = WorldLevelScreen;
});