import gconsole from './GConsole';
import Game from './Game';
import config from './config';

// New instance of a pixi stage
var stage = new PIXI.Container();

var dimensions = config.screen;
var backgroundColor = config.backgroundColor;
var renderer = PIXI.autoDetectRenderer(...dimensions, {backgroundColor});

document.body.appendChild(renderer.view);


var game = new Game();

game.stage.addChild(gconsole.pixiText);

var {ticker} = require('./globals');

function animate() {
  requestAnimationFrame(animate);

  var active = game.currentScreen.wordpartSet;
  var selected = active.selected;

  gconsole.clear();
  gconsole.log('match? ' + active.word.buildsFrom(selected));
  selected.forEach(s => gconsole.log(s));

  renderer.render(game.stage);
  ticker.tick();
}

requestAnimationFrame(animate);
