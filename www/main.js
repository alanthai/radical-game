define(["exports", "./GConsole", "./Game", "./config"], function (exports, _GConsole, _Game, _config) {
  "use strict";

  var _PIXI;

  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

  var _toConsumableArray = function (arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } };

  var gconsole = _interopRequire(_GConsole);

  var Game = _interopRequire(_Game);

  var config = _interopRequire(_config);

  // New instance of a pixi stage
  var stage = new PIXI.Container();

  var dimensions = config.screen;
  var backgroundColor = config.backgroundColor;
  var renderer = (_PIXI = PIXI).autoDetectRenderer.apply(_PIXI, _toConsumableArray(dimensions).concat([{ backgroundColor: backgroundColor }]));

  document.body.appendChild(renderer.view);

  var game = new Game();

  game.stage.addChild(gconsole.pixiText);

  var _require = require("./globals");

  var ticker = _require.ticker;

  function animate() {
    requestAnimationFrame(animate);

    var active = game.currentScreen.wordpartSet;
    var selected = active.selected;

    gconsole.clear();
    gconsole.log("match? " + active.word.buildsFrom(selected));
    selected.forEach(function (s) {
      return gconsole.log(s);
    });

    renderer.render(game.stage);
    ticker.tick();
  }

  requestAnimationFrame(animate);
});