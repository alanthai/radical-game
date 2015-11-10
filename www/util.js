define(["exports", "module"], function (exports, module) {
  "use strict";

  var _slicedToArray = function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; for (var _iterator = arr[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) { _arr.push(_step.value); if (i && _arr.length === i) break; } return _arr; } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } };

  var toString = Object.prototype.toString;

  function isObject(o) {
    return toString.call(o) === "[object Object]";
  }

  module.exports = {
    // Do not use this on objects with circular reference!
    deepClone: function deepClone(obj) {
      return JSON.parse(JSON.stringify(obj));
    },

    isObject: isObject,

    deepEquals: (function (_deepEquals) {
      var _deepEqualsWrapper = function deepEquals(_x, _x2) {
        return _deepEquals.apply(this, arguments);
      };

      _deepEqualsWrapper.toString = function () {
        return _deepEquals.toString();
      };

      return _deepEqualsWrapper;
    })(function (o1, o2) {
      var keys1 = Object.keys(o1);

      if (keys1.length !== Object.keys(o2).length) return false;

      return keys1.every(function (key) {
        var v1 = o1[key];
        var v2 = o2[key];
        if (isObject(v1) && isObject(v2)) return deepEquals(v1, v2);
        return v1 === v2;
      });
    }),

    shuffle: function shuffle(array) {
      for (var i = 0, len = array.length; i < len; i++) {
        var rnd = Math.floor(Math.random() * (len - 1));
        var _ref = [array[i], array[rnd]];

        var _ref2 = _slicedToArray(_ref, 2);

        array[rnd] = _ref2[0];
        array[i] = _ref2[1];
      }
      return array;
    },

    getValues: function getValues(object) {
      return Object.keys(object).map(function (key) {
        return object[key];
      });
    },

    getRandom: function getRandom(array) {
      return array[Math.floor(Math.random() * array.length)];
    },

    // taken from here: http://jsperf.com/k-random-elements-from-array/2
    getNRandom: function getNRandom(array, n) {
      var result = new Array(n);
      var len = arr.length;
      var taken = new Array(len);

      if (n >= len) {
        return array.slice();
      }

      while (n--) {
        var x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len;
      }
      return result;
    },

    extend: function extend(dest, src) {
      return Object.keys(src).reduce(function (obj, key) {
        obj[key] = src[key];
        return obj;
      }, dest);
    }
  };
});