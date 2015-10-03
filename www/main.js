"use strict";

var _toConsumableArray = function (arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } };

(function () {
  "use strict";

  var _PIXI;

  // New instance of a pixi stage
  var stage = new PIXI.Container();

  var dimensions = config.screen;
  var backgroundColor = config.backgroundColor;
  var renderer = (_PIXI = PIXI).autoDetectRenderer.apply(_PIXI, _toConsumableArray(dimensions).concat([{ backgroundColor: backgroundColor }]));

  document.body.appendChild(renderer.view);

  var levelMgr = new LevelManager(1);
  stage.addChild(levelMgr.container);

  stage.addChild(gconsole.pixiText);

  function animate() {
    requestAnimationFrame(animate);

    var active = levelMgr.wordpartSet;
    var selected = active.getSelected();

    gconsole.clear();
    gconsole.log("match? " + active.word.buildsFrom(selected));
    selected.forEach(function (s) {
      return gconsole.log(s.part.english);
    });

    renderer.render(stage);
  }

  requestAnimationFrame(animate);
})();
// import Wordpart from './entities/wordpart.js';