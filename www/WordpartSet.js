"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var WordpartSet = (function () {
  var dataWordparts = Game.data.wordparts;

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

    return getRandom(dataWordparts[type]);
  }

  /**
   * Fills `parts` array with random parts
   * until it reaches `numPoints` elements
   * @param existingParts 
   */
  function generateMissingParts(wparts, numPoints) {
    var parts = wparts.slice(0);
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
      var _this = this;

      var numPoints = arguments[1] === undefined ? 6 : arguments[1];

      _classCallCheck(this, WordpartSet);

      var container = this.container = new PIXI.Container();
      Vector.move(container, center);

      container.interactive = true;
      container.interactiveChildren = true;

      container.click = function () {
        debugger;
      };

      this.word = new Word(wordObj);
      container.word = this.word;
      this.numPoints = numPoints;
      this.set = this.buildWordparts();

      this.wordparts.forEach(function (wordpart) {
        container.addChild(wordpart.container);
      });

      container.on("wordpart:selected", function () {
        var wordIsSelected = _this.word.buildsFrom(_this.getSelected());
        wordIsSelected && container.emit("word:completed");
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
          wordpart.select();
        }
      },
      clear: {
        value: function clear() {
          this.wordparts.forEach(function (wordpart) {
            return wordpart.deselected();
          });
        }
      }
    });

    return WordpartSet;
  })();
})();