// import Wordpart from './entities/wordpart.js';
import WordpartSet from './WordpartSet.js';
import Vector from './Vector.js';

(() => {
  'use strict';

  // New instance of a pixi stage w/ grey background
  var stage = new PIXI.Container();

  var dimensions = [1000, 800]; // width, height
  var backgroundColor = 0x888888;
  var renderer = PIXI.autoDetectRenderer(...dimensions, {backgroundColor});

  document.body.appendChild(renderer.view);

  var wordObj = {
    english: 'test',
    parts: [{english: 'eight'}]
  };
  var wordpartSet = new WordpartSet(wordObj, 6);

  stage.addChild(wordpartSet.container);

  function animate() {
    requestAnimationFrame(animate);

    renderer.render(stage);
  }

  requestAnimationFrame(animate);
})();