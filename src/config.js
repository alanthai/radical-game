var config = (() => {
  'use strict';

  var IMG_PATH = 'img';

  return {
    wordpartSet: {
      center: [200, 200],
      radius: 150 // pixel
    },
  
    wordpart: {
      active: `${IMG_PATH}/circle-active.png`,
      inactive: `${IMG_PATH}/circle-inactive.png`,
      text: radical => `${IMG_PATH}/radicals/${radical}.png`
    },

    enemy: {
      center: [500, 0],
      textOffset: [30, 180],
    }
  };
})();

export default config;
