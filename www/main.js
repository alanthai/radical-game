define(["exports", "./GConsole", "./Game", "./layout", "./globals", "./assetLoader", "./screens/TrainingMenuScreen"], function (exports, _GConsole, _Game, _layout, _globals, _assetLoader, _screensTrainingMenuScreen) {
  "use strict";

  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

  var _toConsumableArray = function (arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } };

  var gconsole = _interopRequire(_GConsole);

  var Game = _interopRequire(_Game);

  var layout = _interopRequire(_layout);

  var patchInteractionManager = _globals.patchInteractionManager;

  var TrainingMenuScreen = _interopRequire(_screensTrainingMenuScreen);

  function setup() {
    var _PIXI;

    patchInteractionManager();
    var dimensions = layout.screenDimensions;
    var backgroundColor = layout.backgroundColor;
    var renderer = (_PIXI = PIXI).autoDetectRenderer.apply(_PIXI, _toConsumableArray(dimensions).concat([{ backgroundColor: backgroundColor }]));

    document.body.appendChild(renderer.view);

    var game = new Game();

    // game.stage.addChildAt(gconsole.pixiText, 2);

    function animate() {
      requestAnimationFrame(animate);

      // var active = game.currentScreen.wordpartSet;

      // gconsole.clear();
      // if (active) {
      //   var selected = active.selected;

      //   gconsole.log('match? ' + active.word.buildsFrom(selected));
      //   selected.forEach(gconsole.log.bind(gconsole));
      // }

      renderer.render(game.stage);
      TWEEN.update();
    }

    requestAnimationFrame(animate);
  }

  PIXI.loader.load(setup);
});