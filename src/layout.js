var e = document.documentElement;
var g = document.getElementsByTagName('body')[0];

const SCREEN_HEIGHT = window.innerHeight|| e.clientHeight|| g.clientHeight;
const SCREEN_WIDTH = SCREEN_HEIGHT * 640 / 1024;

const SCREENS = {
  WORLD_LEVEL: Symbol('World Level Screen'),
  TRAINING_LEVEL: Symbol('Training Level Screen'),
  TRAINING_MENU: Symbol('World Menu Screen'),
};

export default {
  screen: [SCREEN_WIDTH, SCREEN_HEIGHT],
  backgroundColor: 0x888888,

  wordpartSet: {
    radius: 150, // pixel
    boundaryColor: 0xFFFF00,
    position: [SCREEN_WIDTH / 2, SCREEN_HEIGHT * 8 / 10],
    dimensions: [SCREEN_WIDTH, SCREEN_HEIGHT * 4 / 10]
  },

  enemyInfo: {
    healthbar: {
      containerWidth: 3,
      containerBackground: 0xAAAAAA,
      background: 0xFF0000,
      position: [0, 0],
      dimensions: [250, 25],
    },
    fleeCounter: {
      position: [160, 60],
      inactiveColor: 0x999999,
      activeColor: 0xFF330D,
      circleParams: [0, 0, 20],
      circleYOffset: 50
    },
    description: [0, 0],
  },

  level: {
    display: {
      position: [SCREEN_WIDTH - 50, 50],
      style: {fill: 'white', stroke: 'black', strokeThickness: 2}
    }, // right justified
    enemy: [SCREEN_WIDTH / 2, SCREEN_HEIGHT / 4],
    enemyInfo: [SCREEN_WIDTH / 2, SCREEN_HEIGHT / 8],
    killCount: {
      position: [SCREEN_WIDTH / 2, 50],
      style: {fill: 'white', stroke: 'black', strokeThickness: 2}
    },
  },

  trainingButton: {
    first: [SCREEN_WIDTH / 2, 100],
    width: 300,
    offset: 100
  },

  overlay: {
    gold: {
      position: [50, 50],
      style: {fill: 0xFFD700, stroke: 0x8B4513, strokeThickness: 2}
    },
    trainingMenuButton: [100, 150],
    worldLevelButton: [100, 250],
  },

  SCREENS: SCREENS,
};
