// import Wordpart from './entities/wordpart.js';
import WordpartSet from './WordpartSet.js';
import Vector from './Vector.js';
import gconsole from './GConsole.js';
import LevelManager from './LevelManager.js';
import config from './config.js';

(() => {
  'use strict';

  // New instance of a pixi stage
  var stage = new PIXI.Container();

  var dimensions = config.screen;
  var backgroundColor = config.backgroundColor;
  var renderer = PIXI.autoDetectRenderer(...dimensions, {backgroundColor});

  document.body.appendChild(renderer.view);

  var levelMgr = new LevelManager(1);
  stage.addChild(levelMgr.container);

  stage.addChild(gconsole.pixiText);

  function animate() {
    requestAnimationFrame(animate);

    var active = levelMgr.wordpartSet;
    var selected = active.getSelected();

    gconsole.clear();
    gconsole.log('match? ' + active.word.buildsFrom(selected));
    selected.forEach(s => gconsole.log(s.part.english));

    renderer.render(stage);
  }

  requestAnimationFrame(animate);
})();