function center(sprite) {
  sprite.anchor.x = 0.5;
  sprite.anchor.y = 0.5;
}

function shuffle(array) {
  for (let i = 0, len = array.length; i < len; i++) {
    let rnd = Math.floor(Math.random() * (len - 1));
    [array[rnd], array[i]] = [array[i], array[rnd]];
  }
  return array;
}

function getRandom(array) {
  return array[Math.floor(Math.random() * array.length)];
}

var Game = {data: {}};
