define(["exports", "module"], function (exports, module) {
  "use strict";

  var _slicedToArray = function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; for (var _iterator = arr[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) { _arr.push(_step.value); if (i && _arr.length === i) break; } return _arr; } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } };

  var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

  function getXY(v) {
    if (Array.isArray(v)) {
      return v;
    }

    return [v.x, v.y];
  }

  var VectorClass = (function () {
    function VectorClass(x, y) {
      _classCallCheck(this, VectorClass);

      if (Array.isArray(x)) {
        var _ref = x;

        var _ref2 = _slicedToArray(_ref, 2);

        x = _ref2[0];
        y = _ref2[1];
      }

      this.x = x;
      this.y = y;

      // this[Symbol.iterator] = function*() {
      //   yield this.x;
      //   yield this.y;
      // }
    }

    _createClass(VectorClass, {
      _add: {
        value: function _add(v) {
          var _getXY = getXY(v);

          var _getXY2 = _slicedToArray(_getXY, 2);

          var x = _getXY2[0];
          var y = _getXY2[1];

          this.x += x;
          this.y += y;
          return this;
        }
      },
      add: {
        value: function add(v) {
          return this.clone()._add(v);
        }
      },
      _mult: {
        value: function _mult(v) {
          var _getXY = getXY(v);

          var _getXY2 = _slicedToArray(_getXY, 2);

          var x = _getXY2[0];
          var y = _getXY2[1];

          this.x *= x;
          this.y *= y;
          return this;
        }
      },
      mult: {
        value: function mult(v) {
          return this.clone()._mult(v);
        }
      },
      clone: {
        value: function clone() {
          return new Vector(this.x, this.y);
        }
      }
    });

    return VectorClass;
  })();

  ;

  var Vector = function (x, y) {
    return new VectorClass(x, y);
  };

  window.Vector = Vector;

  Vector.move = function (dp, point) {
    dp.x = point.x;
    dp.y = point.y;
    return dp;
  };

  Vector.center = function (sprite) {
    sprite.anchor.x = 0.5;
    sprite.anchor.y = 0.5;
  };

  module.exports = Vector;
});