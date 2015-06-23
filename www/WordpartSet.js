"use strict";

var _slicedToArray = function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; for (var _iterator = arr[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) { _arr.push(_step.value); if (i && _arr.length === i) break; } return _arr; } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } };

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var WordpartSet = (function () {
  "use strict";
  var wordpartList = wordparts;

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

  function getPoints(numPoints) {
    var angle = 2 * Math.PI / numPoints;
    var points = [];
    for (var i = 0; i < numPoints; i++) {
      points.push([Math.cos(i * angle), Math.sin(i * angle)]);
    }
    return points;
  }

  /**
   * @param type Either 'radical' or 'word'; Default radical
   */
  function getRandomPart() {
    var type = arguments[0] === undefined ? "radical" : arguments[0];

    var list = wordpartList[type];
    var rnd = Math.floor(Math.random() * (list.length - 1));
    return list[rnd].simplified;
  }

  /**
   * Fills `parts` array with random parts
   * until it reaches `numPoints` elements
   * @param existingParts 
   */
  function generateMissingParts(parts, numPoints) {
    for (var i = 0, len = numPoints - parts.length; i < len; i++) {
      parts.push(getRandomPart());
    }

    return shuffle(parts);
  }

  var _config = config.wordpartSet;
  var center = new Vector(_config.center);
  var radius = _config.radius;
  var r = new Vector(radius, radius);

  return (function () {
    function WordpartSet(wordObj) {
      var numPoints = arguments[1] === undefined ? 6 : arguments[1];

      _classCallCheck(this, WordpartSet);

      var container = this.container = new PIXI.Container();
      container.x = center.x;
      container.y = center.y;

      this.word = new Word(wordObj);
      this.numPoints = numPoints;
      this.set = this.buildWordparts();

      this.wordparts.forEach(function (wordpart) {
        container.addChild(wordpart.container);
      });
    }

    _createClass(WordpartSet, {
      buildWordparts: {
        value: function buildWordparts() {
          var points = getPoints(this.numPoints);
          var parts = generateMissingParts(this.word.parts, this.numPoints);
          points = points.map(function (pt) {
            return new Vector(pt).mult(r);
          });
          this.wordparts = points.map(function (pt, i) {
            return new Wordpart(parts[i], pt);
          });
        }
      },
      getSelected: {
        value: function getSelected() {
          return this.wordparts.filter(function (wordpart) {
            return wordpart.selected;
          });
        }
      },
      select: {
        value: function select(wordpart) {
          wordpart.selected = true;
        }
      },
      clear: {
        value: function clear() {
          this.wordparts.forEach(function (wordpart) {
            return wordpart.selected = false;
          });
        }
      }
    });

    return WordpartSet;
  })();
})();