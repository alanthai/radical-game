var WordpartSet = require('./WordpartSet.js');
var gconsole = require('./GConsole.js');
var LevelManager = require('./LevelManager.js');
var config = require('./config.js');

// New instance of a pixi stage
var stage = new PIXI.Container();

var dimensions = config.screen;
var backgroundColor = config.backgroundColor;
var renderer = PIXI.autoDetectRenderer(...dimensions, {backgroundColor});

document.body.appendChild(renderer.view);


var levelMgr = null;
function stepLevel(level) {
  if (levelMgr) {
    stage.removeChild(levelMgr.container);
    levelMgr.container.destroy();
  }

  levelMgr = new LevelManager(level);
  levelMgr.container.on('level:completed', lvl => {
    stepLevel(lvl + 1);
  });

  stage.addChild(levelMgr.container);    
}

stepLevel(1);

stage.addChild(gconsole.pixiText);

var {ticker} = require('./globals');

function animate() {
  requestAnimationFrame(animate);

  var active = levelMgr.wordpartSet;
  var selected = active.getSelected();

  gconsole.clear();
  gconsole.log('match? ' + active.word.buildsFrom(selected));
  selected.forEach(s => gconsole.log(s));

  renderer.render(stage);
  ticker.tick();
}

requestAnimationFrame(animate);
