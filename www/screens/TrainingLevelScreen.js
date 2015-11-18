define(["exports", "module", "./LevelScreen", "../data/training"], function (exports, module, _LevelScreen2, _dataTraining) {
  "use strict";

  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

  var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

  var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

  var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

  var LevelScreen = _interopRequire(_LevelScreen2);

  var levels = _dataTraining.levels;
  var allVariants = _dataTraining.allVariants;

  var TrainingLevelScreen = (function (_LevelScreen) {
    function TrainingLevelScreen(game, params) {
      _classCallCheck(this, TrainingLevelScreen);

      var levelData = levels[params.levelId];

      var trainingParams = Object.assign({}, levelData, params);
      trainingParams.enemies = ["dummy"];
      trainingParams.display = "Training: " + levelData.title;
      trainingParams.levelChoices = ["basics1", "basics2"];
      trainingParams.giveHints = true;
      trainingParams.enemyInfoOptions = { hideHealthbar: true, hideFleeCounter: true };

      trainingParams.variants = ~params.subLevel ? [allVariants[params.subLevel]] : allVariants;

      // temporary counter to track number of words left
      // until memory system is in place;
      this.wordsLeft = 1;

      _get(Object.getPrototypeOf(TrainingLevelScreen.prototype), "constructor", this).call(this, game, trainingParams);
    }

    _inherits(TrainingLevelScreen, _LevelScreen);

    _createClass(TrainingLevelScreen, {
      nextWordpartSet: {
        value: function nextWordpartSet() {
          var _this = this;

          _get(Object.getPrototypeOf(TrainingLevelScreen.prototype), "nextWordpartSet", this).apply(this, arguments);
          this.wordpartSet.container.on("word:completed", function () {
            return _this.wordsLeft--;
          });
        }
      },
      fireCompleted: {
        value: function fireCompleted() {
          this.game.stage.emit("trainingLevel:completed", this);
        }
      },
      isComplete: {
        value: function isComplete() {
          return this.wordsLeft < 1;
        }
      }
    });

    return TrainingLevelScreen;
  })(LevelScreen);

  module.exports = TrainingLevelScreen;
});