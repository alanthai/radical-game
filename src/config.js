var config = (() => {
  'use strict';

  var IMG_PATH = 'img';

  return {
    screen: [640, 1024],
    backgroundColor: 0x888888,

    wordpartSet: {
      center: [300, 500],
      radius: 150, // pixel
      laserImg: `${IMG_PATH}/laser.png`,
      boundaryColor: 0xFFFF00
    },
  
    wordpart: {
      active: `${IMG_PATH}/circle-active.png`,
      inactive: `${IMG_PATH}/circle-inactive.png`,
    },

    enemy: {
      center: [200, 0],
      textOffset: [30, 180],
    }
  };
})();

export default config;
