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
      center: [SCREEN_WIDTH / 2, SCREEN_HEIGHT / 4],
      textOffset: [0, 65] },

    enemyInfo: {
      container: [],
      healthbar: {
        containerWidth: 1,
        containerBackground: 11184810,
        background: 16711680,
        position: [],
        dimensions: [] },
      fleeCounter: [],
      description: [] },

    level: {
      display: [SCREEN_WIDTH - 50, 50] // right justified
    },

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