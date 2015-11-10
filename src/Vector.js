function getXY(v) {
  if (Array.isArray(v)) {
    return v;
  }

  return [v.x, v.y];
}

class VectorClass {
  constructor(x, y) {
    if (Array.isArray(x)) {
      [x, y] = x;
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
};

var Vector = (x, y) => new VectorClass(x, y);

Vector.move = function(dp, point) {
  dp.x = point.x;
  dp.y = point.y;
  return dp;
}

Vector.center = function(sprite) {
  sprite.anchor.x = 0.5;
  sprite.anchor.y = 0.5;
}

export default Vector;
