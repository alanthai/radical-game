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
      radius: 150, // pixel
      boundaryColor: 16776960,
      position: [SCREEN_WIDTH / 2, SCREEN_HEIGHT * 8 / 10],
      dimensions: [SCREEN_WIDTH, SCREEN_HEIGHT * 4 / 10]
    },

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
      display: {
        position: [SCREEN_WIDTH - 50, 50],
        style: { fill: "white", stroke: "black", strokeThickness: 2 }
      }, // right justified
      enemy: [SCREEN_WIDTH / 2, SCREEN_HEIGHT / 4],
      enemyInfo: [SCREEN_WIDTH / 2, SCREEN_HEIGHT / 8],
      killCount: {
        position: [SCREEN_WIDTH / 2, 50],
        style: { fill: "white", stroke: "black", strokeThickness: 2 }
      } },

    trainingButton: {
      first: [SCREEN_WIDTH / 2, 100],
      width: 300,
      offset: 100
    },

    overlay: {
      gold: {
        position: [50, 50],
        style: { fill: 16766720, stroke: 9127187, strokeThickness: 2 }
      },
      trainingMenuButton: [100, 150],
      worldLevelButton: [100, 250] },

    SCREENS: SCREENS };
});