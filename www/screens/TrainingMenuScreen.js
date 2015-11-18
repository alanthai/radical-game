define(["exports", "module", "../entities/button", "../data/training", "../util", "../layout"], function (exports, module, _entitiesButton, _dataTraining, _util, _layout) {
  "use strict";

  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

  var _toConsumableArray = function (arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } };

  var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

  var Button = _interopRequire(_entitiesButton);

  var levels = _dataTraining.levels;
  var getValues = _util.getValues;
  var SCREENS = _layout.SCREENS;
  var trainingButton = _layout.trainingButton;

  var TrainingMenuScreen = (function () {
    function TrainingMenuScreen(game) {
      _classCallCheck(this, TrainingMenuScreen);

      this.game = game;

      this.container = new PIXI.Container();

      this.initButtons();
    }

    _createClass(TrainingMenuScreen, {
      initButtons: {
        value: function initButtons() {
          var _this = this;

          var container = this.container;
          var game = this.game;
          var highestLevel = game.data.worldLevel;

          var offset = trainingButton.offset;
          var coords = trainingButton.first.slice();
          var width = trainingButton.width;

          this.buttons = getValues(levels).forEach(function (level) {
            var _button$container$position;

            var button = new Button(level.title, width);
            (_button$container$position = button.container.position).set.apply(_button$container$position, _toConsumableArray(coords));

            button.container.on("button:clicked", function () {
              var params = { levelId: level.id, subLevel: 0 };
              _this.game.goTo(SCREENS.TRAINING_LEVEL, params);
            });

            level.unlock > highestLevel && button.disable();

            container.addChild(button.container);

            coords[1] += offset;

            return button;
          });
        }
      }
    });

    return TrainingMenuScreen;
  })();

  module.exports = TrainingMenuScreen;
});