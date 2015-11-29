/**
 * Loading resources ahead of time will allow us to know
 * the dimensions of the resources for manipulation
 *
 * Later, add a loader for each new screen
 * if initial loading takes too long
 */
PIXI.loader
  .add('chain', 'img/laser.png')
  .add('skull', 'img/skull.png')
  .add('arrow', 'img/arrow.png')
  .add('flee', 'img/flee.png')
  .add('level-button', 'img/button.png')
  .add('level-button-disabled', 'img/button-disabled.png')
  .add('training-button', 'img/training-button.png')
  .add('world-button', 'img/world-button.png')
  .add('wordpart-active', 'img/orb-active.png')
  .add('wordpart-inactive', 'img/orb-inactive.png')
  .add('img/dummy.png')
  .add('img/shadow-bat.png')
  .add('img/jiangshi.png')
  .add('img/haunted-jelly.png')
  .add('img/background_01.png')
  .add('img/background_training.png')
  .add('img/bottom-ui.png')
  ;

var resources = PIXI.loader.resources;

export function getTexture(key) {
  return resources[key].texture;
};
