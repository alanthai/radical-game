define(["exports", "module", "./entities/wordpart", "./Word", "./config", "./Vector", "./data/index", "./util"], function (exports, module, _entitiesWordpart, _Word, _config2, _Vector, _dataIndex, _util) {
  "use strict";

  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

  var _toConsumableArray = function (arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } };

  var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

  var Wordpart = _interopRequire(_entitiesWordpart);

  var Word = _interopRequire(_Word);

  var config = _interopRequire(_config2);

  var Vector = _interopRequire(_Vector);

  var data = _interopRequire(_dataIndex);

  var getValues = _util.getValues;

  var dataWordparts = getValues(data.radicals);

  function getPoints(numPoints) {
    var angle = 2 * Math.PI / numPoints;
    var points = [];
    for (var i = 0; i < numPoints; i++) {
      points.push([Math.cos(i * angle), Math.sin(i * angle)]);
    }
    return points;
  }

  var _config = config.wordpartSet;
  var center = new Vector(_config.center);
  var radius = _config.radius;
  var r = new Vector(radius, radius);

  var WordpartSet = (function () {
    function WordpartSet(word, parts) {
      var giveHints = arguments[2] === undefined ? false : arguments[2];

      _classCallCheck(this, WordpartSet);

      this.word = word;
      this.parts = parts;

      var container = this.container = new PIXI.Container();
      Vector.move(container, center);

      container.interactive = true;
      container.interactiveChildren = true;

      container.word = this.word;
      this.buildWordparts();

      this.wordparts.forEach(function (wordpart) {
        container.addChild(wordpart.container);
      });

      this.initInteractions();
    }

    _createClass(WordpartSet, {
      initInteractions: {
        value: function initInteractions() {
          var _this = this;

          var container = this.container;
          var isContactingWordpart = false;
          var dragging = false;

          var boundaries = new PIXI.Graphics();
          boundaries.beginFill(_config.boundaryColor);
          boundaries.alpha = 0.1;
          boundaries.drawRect(-200, -200, 400, 400);

          container.addChild(boundaries);

          container.on("wordpart:mousedown", function (event, wordpart) {
            isContactingWordpart = true;
            dragging = true;

            wordpart.select();
          });

          container.on("wordpart:mouseover", function (event, wordpart) {
            isContactingWordpart = true;
            if (!wordpart.selected && dragging) {
              wordpart.select();
            }
          });

          container.on("wordpart:mouseout", function () {
            isContactingWordpart = false;
          });

          var emitEvent = function (eventName) {
            return function (event) {
              return _this.container.emit(eventName, event);
            };
          };

          container.mousemove = emitEvent("wordpartSet:mousemove");
          container.mouseup = emitEvent("wordpartSet:mouseup");
          container.mouseupoutside = emitEvent("wordpartSet:mouseupoutside");

          var clear = function () {
            dragging = false;
            isContactingWordpart = false;
            _this.clear();
          };

          container.on("wordpartSet:mouseup", function () {
            if (isContactingWordpart) {
              _this.word.buildsFrom(_this.getSelected()) ? container.emit("word:completed") : container.emit("word:incorrect");
            }
            clear();
          });

          container.on("wordpartSet:mouseupoutside", clear);

          this.initHinter();
          this.initChain();
        }
      },
      buildWordparts: {
        value: function buildWordparts() {
          var _this = this;

          var points = getPoints(this.parts.length);
          points = points.map(function (pt) {
            return new Vector(pt).mult(r);
          });
          this.wordparts = points.map(function (pt, i) {
            return new Wordpart(_this.parts[i], pt);
          });
        }
      },
      getSelected: {
        value: function getSelected() {
          return this.wordparts.filter(function (wordpart) {
            return wordpart.selected;
          }).map(function (wordpart) {
            return wordpart.part;
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
            return wordpart.deselect();
          });
        }
      }
    });

    return WordpartSet;
  })();

  var WordpartSetHinter = {
    initHinter: function initHinter() {
      var _this = this;

      this.resetHints();

      this.container.on("wordpart:mousedown", function (event, wordpart) {
        _this.getHint() === wordpart.part && _this.highlightNextHint();
      });

      this.container.on("wordpart:select", function (event, wordpart) {
        wordpart.unhighlight();
      });

      this.container.on("word:incorrect", function () {
        return _this.resetHints();
      });

      this.container.on("wordpart:mouseup", function () {
        return _this.resetHints();
      });
    },

    highlightNextHint: function highlightNextHint() {
      this.hints.shift();
      this.highlightHint();
    },

    highlightHint: function highlightHint() {
      var hint = this.getHint();
      var wordpart = this.wordparts.find(function (wp) {
        return hint === wp.part;
      });

      if (wordpart) wordpart.highlight();
    },

    getHint: function getHint() {
      return this.hints[0];
    },

    resetHints: function resetHints() {
      this.wordparts.forEach(function (wp) {
        return wp.unhighlight();
      });
      this.hints = [null].concat(_toConsumableArray(this.word.getPieces()));
      this.highlightNextHint();
    }
  };

  var tol = 0.1; // pixel tolerance

  var Chain = (function () {
    function Chain() {
      _classCallCheck(this, Chain);

      this.container = new PIXI.Container();
      this.lasers = [];
      this.laserImg = PIXI.Texture.fromImage(_config.laserImg);
    }

    _createClass(Chain, {
      addLaser: {
        value: function addLaser(startPos) {
          var start = Vector.move(new PIXI.Point(0, 0), startPos);
          var end = Vector.move(new PIXI.Point(0, 0), startPos);
          this.current = new PIXI.mesh.Rope(this.laserImg, [start, end]);

          this.container.addChild(this.current);
        }
      },
      pop: {
        value: function pop() {
          this.container.removeChild(this.current);
          this.current.destroy();
          this.current = this.container.children.slice(-1)[0];
        }
      },
      pointCurrentTo: {
        value: function pointCurrentTo(point) {
          var head = this.current.points.slice(-1)[0];
          Vector.move(head, point);
        }
      },
      destroy: {
        value: function destroy() {
          this.container.destroy();
        }
      }
    });

    return Chain;
  })();

  var WordpartSetChain = {
    initChain: function initChain() {
      var container = this.container;
      var chain;

      container.on("wordpart:mousedown", function (event, wordpart) {
        chain = new Chain();
        chain.addLaser(wordpart.container);
        container.addChild(chain.container);
      });

      container.on("wordpart:select", function (event, wordpart) {
        if (!chain) return;

        chain.pointCurrentTo(wordpart.container);
        chain.addLaser(wordpart.container);
      });

      container.on("wordpart:mouseover", function () {
        if (!chain) return;
        chain.container.alpha = 1;
      });

      container.on("wordpart:mouseout", function () {
        if (!chain) return;
        chain.container.alpha = 0.5;
      });

      container.on("wordpartSet:mousemove", function (event) {
        if (!chain) return;
        var pos = event.data.getLocalPosition(container);
        chain.pointCurrentTo(pos);
      });

      function destroy() {
        container.removeChild(chain.container);
        chain.destroy();
        chain = null;
      }

      container.on("wordpartSet:mouseup", destroy);
      container.on("wordpartSet:mouseupoutside", destroy);
    }
  };

  var mixins = Object.assign({}, WordpartSetHinter, WordpartSetChain);

  Object.keys(mixins).forEach(function (prop) {
    mixins[prop] = { value: mixins[prop] };
  });

  Object.defineProperties(WordpartSet.prototype, mixins);

  module.exports = WordpartSet;
});