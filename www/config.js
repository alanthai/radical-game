define(["exports", "module"], function (exports, module) {
  "use strict";

  var IMG_PATH = "img";
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
      imgChain: "" + IMG_PATH + "/laser.png",
      boundaryColor: 16776960
    },

    wordpart: {
      active: "" + IMG_PATH + "/circle-active.png",
      inactive: "" + IMG_PATH + "/circle-inactive.png" },

    enemy: {
      center: [SCREEN_WIDTH / 2, SCREEN_HEIGHT / 4],
      textOffset: [0, 65] },

    level: {
      display: [SCREEN_WIDTH - 50, 50] // right justified
    },

    overlay: {
      gold: [50, 50] },

    SCREENS: SCREENS
  };
});