import Button from '../entities/button';
import {levels} from '../data/training';
import {getValues} from '../util';
import {SCREENS, trainingButton} from '../layout';

export default class TrainingMenuScreen {
  constructor(game) {
    this.game = game;

    this.container = new PIXI.Container();

    this.initButtons();
  }

  initButtons() {
    var container = this.container;
    var game = this.game;
    var highestLevel = game.data.worldLevel;

    var offset = trainingButton.offset;
    var coords = trainingButton.first.slice();
    var width = trainingButton.width;

    this.buttons = getValues(levels).forEach(level => {
      var button =  new Button(level.title, width);
      button.container.position.set(...coords);

      button.container.on('button:clicked', () => {
        var params = {levelId: level.id , subLevel: 0};
        this.game.goTo(SCREENS.TRAINING_LEVEL, params);
      });

      level.unlock > highestLevel && button.disable();

      container.addChild(button.container);

      coords[1] += offset;

      return button;
    });
  }
};
