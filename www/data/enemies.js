define(["exports", "module"], function (exports, module) {
  "use strict";

  module.exports = {
    dummy: {
      name: "Dummy",
      gold: 0,
      health: 1,
      maxMisses: Infinity,
      img: "img/enemy1.png"
    },
    enemy1: {
      name: "Enemy 1",
      gold: 10,
      health: 2,
      maxMisses: 3,
      img: "img/enemy1.png"
    }
  };
});