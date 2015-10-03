'use strict';

var Vector = (() => {
  function getXY(v) {
    if (Array.isArray(v)) {
      return v;
    }

    return [v.x, v.y];
  }

  class Vector {
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
  }

  Vector.move = function(dp, point) {
    dp.x = point.x;
    dp.y = point.y;
    return dp;
  };

  return Vector;
})();
