define(["exports", "module", "./Vector", "./layout", "./util", "./assetLoader", "./data/training"], function (exports, module, _Vector, _layout, _util, _assetLoader, _dataTraining) {
  "use strict";

  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

  var _defineProperty = function (obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); };

  var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

  var V = _interopRequire(_Vector);

  var SCREENS = _layout.SCREENS;
  var overlay = _layout.overlay;
  var getValues = _util.getValues;
  var getTexture = _assetLoader.getTexture;
  var levels = _dataTraining.levels;

  var TRAINING_MENU_UNLOCK = "basics1";
  var WORLD_LEVEL_UNLOCK = "basics1";

  var displayScreenOverlay = (function () {
    var _displayScreenOverlay2 = {};

    _defineProperty(_displayScreenOverlay2, SCREENS.WORLD_LEVEL, function () {
      this.display("gold");
      this.display("trainingMenuButton");
    });

    _defineProperty(_displayScreenOverlay2, SCREENS.TRAINING_MENU, function () {
      this.display("gold");

      this.displayIfUnlocked(WORLD_LEVEL_UNLOCK, "worldLevelButton");
    });

    _defineProperty(_displayScreenOverlay2, SCREENS.TRAINING_LEVEL, function () {
      this.display("gold");

      this.displayIfUnlocked(TRAINING_MENU_UNLOCK, "trainingMenuButton");
      this.displayIfUnlocked(WORLD_LEVEL_UNLOCK, "worldLevelButton");
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

    worldLevelButton: function worldLevelButton() {
      var _this = this;

      var button = new PIXI.Sprite(getTexture("world-button"));
      this.container.addChild(button);
      V.move(button, V(overlay.worldLevelButton));

      button.interactive = true;
      button.mouseup = function () {
        return _this.game.goTo(SCREENS.WORLD_LEVEL);
      };

      return button;
    },

    trainingMenuButton: function trainingMenuButton() {
      var _this = this;

      var button = new PIXI.Sprite(getTexture("training-button"));
      this.container.addChild(button);
      V.move(button, V(overlay.trainingMenuButton));

      button.interactive = true;
      button.mouseup = function () {
        return _this.game.goTo(SCREENS.TRAINING_MENU);
      };

      return button;
    }
  };

  var GameOverlay = (function () {
    function GameOverlay(game) {
      _classCallCheck(this, GameOverlay);

      this.game = game;
      this.container = new PIXI.Container();
      this.items = {};

      this.initEventListeners();
    }

    _createClass(GameOverlay, {
      initEventListeners: {
        value: function initEventListeners() {
          var _this = this;

          this.game.stage.on("trainingLevel:completed", function (levelScreen) {
            var data = levelScreen.data;
            if (! ~data.subLevel) {
              if (data.levelId === TRAINING_MENU_UNLOCK) {
                _this.display("trainingMenuButton");
                _this.highlight("trainingMenuButton");
              }
              if (data.levelId === WORLD_LEVEL_UNLOCK) {
                _this.display("worldLevelButton");
                _this.highlight("worldLevelButton");
              }
            }
          });

          function getUnlocked(levelNumber) {
            return getValues(levels).filter(function (level) {
              return level.unlock === levelNumber;
            });
          }
          this.game.stage.on("worldLevel:new", function (levelNumber) {

            var unlocked = getUnlocked(levelNumber);
            if (unlocked.length) {
              var msg = "New level unlocked!";
              // this.highlight('worldLevelButton', msg);
              console.log(msg);
            }
          });
        }
      },
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
      displayIfUnlocked: {
        value: function displayIfUnlocked(trainingLevelId, itemName) {
          var unlocked = this.game.data.trainingUnlocked[trainingLevelId];
          if (!unlocked) {
            return;
          }this.display(itemName);

          // if () {
          //   this.highlight(itemName);
          // }
        }
      },
      highlight: {
        value: function highlight(itemName, message) {}
      },
      hideAll: {
        value: function hideAll() {
          getValues(this.items).forEach(function (item) {
            return item.alpha = 0;
          });
        }
      }
    });

    return GameOverlay;
  })();

  module.exports = GameOverlay;
});