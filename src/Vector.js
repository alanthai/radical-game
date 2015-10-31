'use strict';

function getXY(v) {
  if (Array.isArray(v)) {
    return v;
  }

  return [v.x, v.y];
}

module.exports = class Vector {
  constructor(x, y) {
    if (Array.isArray(x)) {
      y = x[1];
      x = x[0];
    }

    this.x = x;
    this.y = y;
  }


  _add(v) {
    var [x, y] = getXY(v);
    this.x += x;
    this.y += y;
    return this;
  }

  add(v) {
    return this.clone()._add(v);
  }

  _mult(v) {
    var [x, y] = getXY(v);
    this.x *= x;
    this.y *= y;
    return this;
  }

  mult(v) {
    return this.clone()._mult(v);
  }

  clone() {
    return new Vector(this.x, this.y);
  }

  static move(dp, point) {
    dp.x = point.x;
    dp.y = point.y;
    return dp;
  }

  static center(sprite) {
    sprite.anchor.x = 0.5;
    sprite.anchor.y = 0.5;
  }
}
