var IMG_PATH = 'img';
var SCREEN_WIDTH = 640;
var SCREEN_HEIGHT = 1024;

export default {
  screen: [SCREEN_WIDTH, SCREEN_HEIGHT],
  backgroundColor: 0x888888,

  wordpartSet: {
    center: [SCREEN_WIDTH / 2, 700],
    radius: 150, // pixel
    laserImg: `${IMG_PATH}/laser.png`,
    boundaryColor: 0xFFFF00
  },

  wordpart: {
    active: `${IMG_PATH}/circle-active.png`,
    inactive: `${IMG_PATH}/circle-inactive.png`,
  },

  enemy: {
    center: [SCREEN_WIDTH / 2, SCREEN_HEIGHT / 4],
    textOffset: [0, 65],
  },

  levelManager: {
    scoreboard: [50, 50],
    levelDisplay: [SCREEN_WIDTH - 50, 50] // right justified
  }
};
