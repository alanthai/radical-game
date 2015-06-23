"use strict";

(function () {
  "use strict";

  var _PIXI;

  // New instance of a pixi stage w/ grey background
  var stage = new PIXI.Container();

  var dimensions = [1000, 800]; // width, height
  var backgroundColor = 8947848;
  var renderer = (_PIXI = PIXI).autoDetectRenderer.apply(_PIXI, dimensions.concat([{ backgroundColor: backgroundColor }]));

  document.body.appendChild(renderer.view);

  var wordObj = {
    english: "test",
    parts: [{ english: "eight" }]
  };
  var wordpartSet = new WordpartSet(wordObj, 6);

  stage.addChild(wordpartSet.container);

  function animate() {
    requestAnimationFrame(animate);

    renderer.render(stage);
  }

  requestAnimationFrame(animate);
})();
// import Wordpart from './entities/wordpart.js';