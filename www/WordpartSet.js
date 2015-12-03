define(["exports", "module", "./entities/wordpart", "./Word", "./entities/chain", "./layout", "./Vector", "./assetLoader", "./data/index", "./util"], function (exports, module, _entitiesWordpart, _Word, _entitiesChain, _layout, _Vector, _assetLoader, _dataIndex, _util) {
  "use strict";

  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

  var _toConsumableArray = function (arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } };

  var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

  var Wordpart = _interopRequire(_entitiesWordpart);

  var Word = _interopRequire(_Word);

  var Chain = _interopRequire(_entitiesChain);

  var layoutWordpartSet = _layout.wordpartSet;

  var V = _interopRequire(_Vector);

  var getTexture = _assetLoader.getTexture;

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

  var radius = layoutWordpartSet.radius;
  var r = V(radius, radius);

  var WordpartSet = (function () {
    function WordpartSet(word, parts) {
      var _container$position;

      var giveHints = arguments[2] === undefined ? false : arguments[2];

      _classCallCheck(this, WordpartSet);

      this.word = word;
      this.parts = parts;

      var container = this.container = new PIXI.Container();
      (_container$position = container.position).set.apply(_container$position, _toConsumableArray(layoutWordpartSet.position));

      container.interactive = true;
      container.interactiveChildren = true;

      container.word = this.word;

      this.selected = [];

      // Order matters! Boundary must come first before wordparts

      var boundaries = new PIXI.Sprite(getTexture("img/bottom-ui.png"));
      boundaries.anchor.set(0.5);
      // var boundaries = new PIXI.Graphics();
      // boundaries.beginFill(layoutWordpartSet.boundaryColor);
      // boundaries.alpha = 0.1;
      // var [boundWidth, boundHeight] = layoutWordpartSet.dimensions;
      // boundaries.drawRect(-boundWidth/2, -boundHeight/2, boundWidth, boundHeight);
      // boundaries.endFill();
      container.addChild(boundaries);

      this.buildWordparts();

      this.initInteractions(giveHints);
    }

    _createClass(WordpartSet, {
      initInteractions: {
        value: function initInteractions(giveHints) {
          var _this = this;

          var container = this.container;
          var isContactingWordpart = false;
          var dragging = false;

          container.on("wordpart:mousedown", function (event, wordpart) {
            isContactingWordpart = true;
            dragging = true;

            _this.select(wordpart);
          });

          container.on("wordpart:mouseover", function (event, wordpart) {
            isContactingWordpart = true;
            if (!wordpart.selected && dragging) {
              _this.select(wordpart);
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

          container.mousemove = container.touchmove = emitEvent("wordpartSet:mousemove");
          container.mouseup = container.touchend = emitEvent("wordpartSet:mouseup");
          container.mouseupoutside = container.touchendoutside = emitEvent("wordpartSet:mouseupoutside");

          var clear = function () {
            dragging = false;
            isContactingWordpart = false;
            _this.clear();
          };

          container.on("wordpartSet:mouseup", function () {
            if (isContactingWordpart) {
              _this.word.buildsFrom(_this.selected) ? container.emit("word:completed") : container.emit("word:incorrect");
            }
            clear();
          });

          container.on("wordpartSet:mouseupoutside", clear);

          if (giveHints) {
            this.initHinter();
          }

          this.initChain();
        }
      },
      buildWordparts: {
        value: function buildWordparts() {
          var _this = this;

          var points = getPoints(this.parts.length);
          points = points.map(function (pt) {
            return V(pt).mult(r);
          });
          this.wordparts = points.map(function (pt, i) {
            return new Wordpart(_this.parts[i], pt);
          });

          this.wordparts.forEach(function (wordpart) {
            _this.container.addChild(wordpart.container);
          });
        }
      },
      select: {
        value: function select(wordpart) {
          this.selected.push(wordpart.part);
          wordpart.select();
        }
      },
      clear: {
        value: function clear() {
          this.selected = [];
          this.wordparts.forEach(function (wordpart) {
            return wordpart.deselect();
          });
        }
      },
      destroy: {
        value: function destroy() {
          this.container.removeAllListeners();
          this.container.destroy();
          this.container.mousemove = null;
          this.container.mouseup = null;
          this.container.mouseupoutside = null;
        }
      }
    });

    return WordpartSet;
  })();

  var WordpartSetHinter = {
    initHinter: function initHinter() {
      var _this = this;

      this.resetHints();

      this.container.on("wordpart:select", function (event, wordpart) {
        _this.wordparts.forEach(function (wp) {
          return wp.unhighlight();
        });
        _this.highlightIfMatch(wordpart);
      });

      this.container.on("word:incorrect", function () {
        return _this.resetHints();
      });

      this.container.on("wordpart:mouseupoutside", function () {
        return _this.resetHints();
      });
    },

    highlightIfMatch: function highlightIfMatch(wordpart) {
      this.correctBuild = this.getHint() === wordpart.part && this.correctBuild ? (this.highlightNextHint(), true) : false;
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
      this.correctBuild = true;
      this.highlightNextHint();
    }
  };

  var WordpartSetChain = {
    initChain: function initChain() {
      var container = this.container;
      var chain;

      container.on("wordpart:mousedown", function (event, wordpart) {
        chain = new Chain();
        chain.lockTo(wordpart.container);
        container.addChild(chain.container);
      });

      container.on("wordpart:select", function (event, wordpart) {
        if (!chain) return;

        chain.pointCurrentTo(wordpart.container);
        chain.lockTo(wordpart.container);
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
        if (!container.children || !chain) {
          return;
        }
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