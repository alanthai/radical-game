function center(sprite) {
  sprite.anchor.x = 0.5;
  sprite.anchor.y = 0.5;
}

// Do not use this on objects with circular reference!
function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function shuffle(array) {
  for (let i = 0, len = array.length; i < len; i++) {
    let rnd = Math.floor(Math.random() * (len - 1));
    [array[rnd], array[i]] = [array[i], array[rnd]];
  }
  return array;
}

function getValues(object) {
  return Object.keys(object).map(key => object[key]);
}

function getRandom(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function extend(dest, src) {
  return Object.keys(src).reduce((obj, key) => {
    obj[key] = src[key];
    return obj;
  }, dest);
}

var Game = {data: {}};
