define(["exports", "module", "./Vector", "./config", "./util", "./screens/WorldLevelScreen", "./screens/TrainingLevelScreen"], function (exports, module, _Vector, _config, _util, _screensWorldLevelScreen, _screensTrainingLevelScreen) {
  "use strict";

  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

  var _defineProperty = function (obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); };

  var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

  var V = _interopRequire(_Vector);

  var SCREENS = _config.SCREENS;
  var overlay = _config.overlay;
  var getValues = _util.getValues;

  var WorldLevelScreen = _interopRequire(_screensWorldLevelScreen);

  var TrainingLevelScreen = _interopRequire(_screensTrainingLevelScreen);

  // import TrainingMenuScreen from './screens/TrainingMenuScreen';

  var screenClasses = (function () {
    var _screenClasses = {};

    _defineProperty(_screenClasses, SCREENS.WORLD_LEVEL, WorldLevelScreen);

    _defineProperty(_screenClasses, SCREENS.TRAINING_LEVEL, TrainingLevelScreen);

    return _screenClasses;
  })();

  var INITIAL_PLAYER = {
    gold: 0,
    worldLevel: 0,
    trainingCompleted: [],
    upgrades: []
  };

  var displayScreenOverlay = (function () {
    var _displayScreenOverlay2 = {};

    _defineProperty(_displayScreenOverlay2, SCREENS.WORLD_LEVEL, function () {
      this.display("gold");
      // this.display('level');

      // this.game.data.trainingLevel === 2
      //   && this.display('trainingSelectButton');
    });

    _defineProperty(_displayScreenOverlay2, SCREENS.TRAINING_MENU, function () {
      this.display("gold");
      this.display("worldLevelButton");
    });

    _defineProperty(_displayScreenOverlay2, SCREENS.TRAINING_LEVEL, function () {
      this.display("gold");
      // this.display('level');

      // this.game.data.worldLevel === 2
      //   && this.display('trainingSelectButton');

      // this.game.data.worldLevel === 2
      //   && this.display('worldLevelButton');
    });

    return _displayScreenOverlay2;
  })();

  var createItem = {
    gold: (function (_gold) {
      var _goldWrapper = function gold() {
        return _gold.apply(this, arguments);
      };

      _goldWrapper.toString = function () {
        return _gold.toString();
      };

      return _goldWrapper;
    })(function () {
      var gold = new PIXI.Text(this.game.data.gold);
      this.container.addChild(gold);
      V.move(gold, V(overlay.gold));

      return gold;
    }),

    worldLevelButton: function worldLevelButton() {},

    trainingSelectButton: function trainingSelectButton() {},

    trainingLevelButton: function trainingLevelButton() {}
  };

  var GameOverlay = (function () {
    function GameOverlay(game) {
      _classCallCheck(this, GameOverlay);

      this.game = game;
      this.container = new PIXI.Container();
      this.items = {};
    }

    _createClass(GameOverlay, {
      displayScreenOverlay: {
        value: (function (_displayScreenOverlay) {
          var _displayScreenOverlayWrapper = function displayScreenOverlay(_x) {
            return _displayScreenOverlay.apply(this, arguments);
          };

          _displayScreenOverlayWrapper.toString = function () {
            return _displayScreenOverlay.toString();
          };

          return _displayScreenOverlayWrapper;
        })(function (enumScreen) {
          this.hideAll();
          displayScreenOverlay[enumScreen].call(this);
        })
      },
      display: {
        value: function display(itemName) {
          if (!this.items[itemName]) {
            this.items[itemName] = createItem[itemName].call(this);
          }
          this.items[itemName].alpha = 1;
        }
      },
      hideAll: {
        value: function hideAll() {
          var items = this.items;
          getValues(items).forEach(function (item) {
            item.alpha = 1;
          });
        }
      }
    });

    return GameOverlay;
  })();

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

      var goToParams = { levelId: "basics1", subLevel: 0 };
      this.goTo(SCREENS.TRAINING_LEVEL, goToParams);
    }

    _createClass(Game, {
      addGold: {
        value: function addGold(gold) {
          this.data.gold = gold;
          this.overlay.items.gold.text = gold;
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

          // on world level increase,
          this.stage.on("trainingLevel:completed", function (levelScreen) {
            var data = levelScreen.data;
            var subLevel = data.subLevel < 4 ? data.subLevel + 1 : -1;

            _this.goTo(SCREENS.TRAINING_LEVEL, { levelId: data.levelId, subLevel: subLevel });
          });

          this.stage.on("worldLevel:completed", function (levelScreen) {
            var data = levelScreen.data;
            var highestLevel = _this.data.worldLevel;

            if (data.levelNumber >= highestLevel) {
              _this.data.worldLevel++;
              // check unlocks
              _this.save();
              _this.goTo(SCREENS.WORLD_LEVEL, { levelNumber: highestLevel + 1 });
            } else {}
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
        value: function save() {
          localStorage.setItem("player", JSON.parse(this.data));
        }
      }
    });

    return Game;
  })();

  // playerDamage

  module.exports = Game;
});

// [SCREENS.TRAINING_MENU]: TrainingMenuScreen,

// V.move(level, V(overlay.worldLevelButton));

// V.move(level, V(overlay.trainingSelectButton));

// V.move(level, V(overlay.trainingLevelButton));

// goTo(SCREENS.WORLD_MENU)