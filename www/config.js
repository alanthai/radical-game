"use strict";

var config = (function () {
  "use strict";

  var IMG_PATH = "img";

  return {
    screen: [640, 1024],
    backgroundColor: 8947848,

    wordpartSet: {
      center: [300, 500],
      radius: 150, // pixel
      laserImg: "" + IMG_PATH + "/laser.png",
      boundaryColor: 16776960
    },

    wordpart: {
      active: "" + IMG_PATH + "/circle-active.png",
      inactive: "" + IMG_PATH + "/circle-inactive.png" },

    enemy: {
      center: [200, 0],
      textOffset: [30, 180] }
  };
})();