import gconsole from './GConsole';
import Game from './Game';
import layout from './layout';
import {ticker} from './globals';
import './assetLoader';
import TrainingMenuScreen from './screens/TrainingMenuScreen';

function setup() {
  var dimensions = layout.screen;
  var backgroundColor = layout.backgroundColor;
  var renderer = PIXI.autoDetectRenderer(...dimensions, {backgroundColor});

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
    //   selected.forEach(s => gconsole.log(s));
    // }

    renderer.render(game.stage);
    ticker.tick();
  }

  requestAnimationFrame(animate);
}

PIXI.loader.load(setup);
