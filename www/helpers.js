"use strict";

var _slicedToArray = function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; for (var _iterator = arr[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) { _arr.push(_step.value); if (i && _arr.length === i) break; } return _arr; } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } };

function center(sprite) {
  sprite.anchor.x = 0.5;
  sprite.anchor.y = 0.5;
}

function shuffle(array) {
  for (var i = 0, len = array.length; i < len; i++) {
    var rnd = Math.floor(Math.random() * (len - 1));
    var _ref = [array[i], array[rnd]];

    var _ref2 = _slicedToArray(_ref, 2);

    array[rnd] = _ref2[0];
    array[i] = _ref2[1];
  }
  return array;
}

function getRandom(array) {
  return array[Math.floor(Math.random() * array.length)];
}

var Game = { data: {} };