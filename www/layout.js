define(["exports", "module"], function (exports, module) {
  "use strict";

  var SCREEN_WIDTH = 640;
  var SCREEN_HEIGHT = 1024;

  var SCREENS = {
    WORLD_LEVEL: Symbol("World Level Screen"),
    TRAINING_LEVEL: Symbol("Training Level Screen"),
    TRAINING_MENU: Symbol("World Menu Screen") };

  module.exports = {
    screen: [SCREEN_WIDTH, SCREEN_HEIGHT],
    backgroundColor: 8947848,

    wordpartSet: {
      center: [SCREEN_WIDTH / 2, 700],
      radius: 150, // pixel
      boundaryColor: 16776960
    },

    enemy: {
      textOffset: [0, 65] },

    enemyInfo: {
      healthbar: {
        containerWidth: 3,
        containerBackground: 11184810,
        background: 16711680,
        position: [0, 0],
        dimensions: [250, 25] },
      fleeCounter: {
        position: [160, 60],
        inactiveColor: 10066329,
        activeColor: 16724749,
        circleParams: [0, 0, 20],
        circleYOffset: 50
      },
      description: [0, 0] },

    level: {
      display: [SCREEN_WIDTH - 50, 50], // right justified
      enemy: [SCREEN_WIDTH / 2, SCREEN_HEIGHT / 4],
      enemyInfo: [SCREEN_WIDTH / 2, SCREEN_HEIGHT / 8],
      killCount: [SCREEN_WIDTH / 2, 50] },

    trainingButton: {
      first: [SCREEN_WIDTH / 2, 100],
      width: 400,
      offset: 100
    },

    overlay: {
      gold: [50, 50],
      trainingMenuButton: [50, 100],
      worldLevelButton: [50, 200] },

    SCREENS: SCREENS };
});