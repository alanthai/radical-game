define(function (require, exports, module) {
  "use strict";

  var _PIXI;

  var _toConsumableArray = function (arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } };

  var WordpartSet = require("./WordpartSet.js");
  var gconsole = require("./GConsole.js");
  var LevelManager = require("./LevelManager.js");
  var config = require("./config.js");

  // New instance of a pixi stage
  var stage = new PIXI.Container();

  var dimensions = config.screen;
  var backgroundColor = config.backgroundColor;
  var renderer = (_PIXI = PIXI).autoDetectRenderer.apply(_PIXI, _toConsumableArray(dimensions).concat([{ backgroundColor: backgroundColor }]));

  document.body.appendChild(renderer.view);

  var levelMgr = null;
  function stepLevel(level) {
    if (levelMgr) {
      stage.removeChild(levelMgr.container);
      levelMgr.container.destroy();
    }

    levelMgr = new LevelManager(level);
    levelMgr.container.on("level:completed", function (lvl) {
      stepLevel(lvl + 1);
    });

    stage.addChild(levelMgr.container);
  }

  stepLevel(1);

  stage.addChild(gconsole.pixiText);

  var _require = require("./globals");

  var ticker = _require.ticker;

  function animate() {
    requestAnimationFrame(animate);

    var active = levelMgr.wordpartSet;
    var selected = active.getSelected();

    gconsole.clear();
    gconsole.log("match? " + active.word.buildsFrom(selected));
    selected.forEach(function (s) {
      return gconsole.log(s);
    });

    renderer.render(stage);
    ticker.tick();
  }

  requestAnimationFrame(animate);
});