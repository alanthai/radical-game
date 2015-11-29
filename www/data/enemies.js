define(["exports", "module"], function (exports, module) {
  "use strict";

  module.exports = {
    dummy: {
      name: "Dummy",
      gold: 0,
      health: 1,
      maxMisses: Infinity,
      textOffset: [0, 105],
      position: [0, 115],
      img: "img/dummy.png"
    },
    shadowbat: {
      name: "Shadow Bat",
      gold: 10,
      health: 1,
      // health: 2,
      maxMisses: 3,
      textOffset: [0, 65],
      position: [0, 0],
      img: "img/shadow-bat.png"
    },
    jiangshi: {
      name: "Jiangshi",
      gold: 15,
      health: 1,
      // health: 3,
      maxMisses: 3,
      textOffset: [0, -65],
      position: [0, 90],
      img: "img/jiangshi.png"
    },
    hauntedjelly: {
      name: "Haunted Jelly",
      gold: 15,
      health: 2,
      maxMisses: 2,
      textOffset: [0, -30],
      position: [0, 125],
      img: "img/haunted-jelly.png"
    }
  };
});