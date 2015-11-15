define(["exports", "module", "./layout", "./data/training", "./screens/WorldLevelScreen", "./screens/TrainingLevelScreen", "./screens/TrainingMenuScreen", "./GameOverlay"], function (exports, module, _layout, _dataTraining, _screensWorldLevelScreen, _screensTrainingLevelScreen, _screensTrainingMenuScreen, _GameOverlay) {
  "use strict";

  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

  var _defineProperty = function (obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); };

  var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

  var SCREENS = _layout.SCREENS;
  var levels = _dataTraining.levels;

  var WorldLevelScreen = _interopRequire(_screensWorldLevelScreen);

  var TrainingLevelScreen = _interopRequire(_screensTrainingLevelScreen);

  var TrainingMenuScreen = _interopRequire(_screensTrainingMenuScreen);

  var GameOverlay = _interopRequire(_GameOverlay);

  var screenClasses = (function () {
    var _screenClasses = {};

    _defineProperty(_screenClasses, SCREENS.WORLD_LEVEL, WorldLevelScreen);

    _defineProperty(_screenClasses, SCREENS.TRAINING_LEVEL, TrainingLevelScreen);

    _defineProperty(_screenClasses, SCREENS.TRAINING_MENU, TrainingMenuScreen);

    return _screenClasses;
  })();

  var INITIAL_PLAYER = {
    gold: 0,
    worldLevel: 1,
    trainingUnlocked: {},
    upgrades: []
  };

  /**
   * Switches screens
   * React to global events
   * Stores game save data
   */

  var Game = (function () {
    function Game() {
      _classCallCheck(this, Game);

      this.loadSave();

      var stage = this.stage = new PIXI.Container();

      this.overlay = new GameOverlay(this);
      stage.addChild(this.overlay.container);

      // blank placeholder
      this.currentScreen = { container: new PIXI.Container() };
      stage.addChild(this.currentScreen.container);

      this.initGlobalEventHandlers();

      // var goToParams = {levelId: 'basics1', subLevel: 0};
      // this.goTo(SCREENS.TRAINING_LEVEL, goToParams);
      this.goTo(SCREENS.WORLD_LEVEL);
    }

    _createClass(Game, {
      addGold: {
        value: function addGold(gold) {
          this.data.gold += gold;
          this.overlay.items.gold.text = this.data.gold;
        }
      },
      goTo: {
        value: function goTo(enumScreen, options) {
          var ScreenClass = screenClasses[enumScreen];
          var screen = new ScreenClass(this, options);
          this.stage.addChild(screen.container);

          this.stage.removeChild(this.currentScreen.container);
          this.currentScreen.container.destroy();
          this.currentScreen = screen;

          this.overlay.displayScreenOverlay(enumScreen);
        }
      },
      initGlobalEventHandlers: {
        value: function initGlobalEventHandlers() {
          var _this = this;

          this.stage.on("trainingLevel:completed", function (levelScreen) {
            var data = levelScreen.data;
            var levelId = data.levelId;

            if (~data.subLevel) {
              var subLevel = data.subLevel < 3 ? data.subLevel + 1 : -1;

              _this.goTo(SCREENS.TRAINING_LEVEL, { levelId: levelId, subLevel: subLevel });
            } else {
              if (levelId !== "basics1") {
                _this.goTo(SCREENS.TRAINING_MENU);
              }

              _this.data.trainingUnlocked[levelId] = { completed: true, highlight: false };
              _this.save();
            }
          });

          this.stage.on("worldLevel:completed", function (levelScreen) {
            var data = levelScreen.data;
            var highestLevel = _this.data.worldLevel;

            // unlock new levels
            // this.data.trainingUnlocked[levelId] = {completed: false, highlight: true}

            // if (data.levelNumber >= highestLevel) {
            highestLevel++;
            _this.data.worldLevel = highestLevel;
            _this.save();
            _this.stage.emit("worldLevel:new", highestLevel);
            _this.goTo(SCREENS.WORLD_LEVEL, { levelNumber: highestLevel });
            // } else {
            //   this.goTo(SCREENS.WORLD_MENU)
            // }
          });
        }
      },
      loadSave: {
        value: function loadSave() {
          var json = localStorage.getItem("player");
          if (json) {
            this.data = JSON.parse(json);
          } else {
            // create new players
            this.data = Object.assign({}, INITIAL_PLAYER);
          }
        }
      },
      save: {
        value: function save() {}
      }
    });

    return Game;
  })();

  // playerDamage

  module.exports = Game;
});
/*levelId: {completed, highlight}*/
// localStorage.setItem('player', JSON.stringify(this.data));