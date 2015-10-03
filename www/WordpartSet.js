"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var WordpartSet = (function () {
  var dataWordparts = getValues(Game.data.radicals);

  function getPoints(numPoints) {
    var angle = 2 * Math.PI / numPoints;
    var points = [];
    for (var i = 0; i < numPoints; i++) {
      points.push([Math.cos(i * angle), Math.sin(i * angle)]);
    }
    return points;
  }

  function getRandomPart() {
    return getRandom(dataWordparts);
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

  var LaserChain = (function () {
    function LaserChain() {
      _classCallCheck(this, LaserChain);

      this.container = new PIXI.Container();
      this.lasers = [];
      this.laserImg = PIXI.Texture.fromImage(_config.laserImg);
    }

    _createClass(LaserChain, {
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
      isCurrentTargeting: {
        value: function isCurrentTargeting(point) {
          var head = this.current.points[0];
          return head.x === point.x && head.y === point.y;
        }
      },
      destroy: {
        value: function destroy() {
          this.container.destroy();
        }
      }
    });

    return LaserChain;
  })();

  return (function () {
    function WordpartSet(wordObj) {
      var numPoints = arguments[1] === undefined ? 6 : arguments[1];

      _classCallCheck(this, WordpartSet);

      var container = this.container = new PIXI.Container();
      Vector.move(container, center);

      container.interactive = true;
      container.interactiveChildren = true;

      this.initInteractions();

      this.word = new Word(wordObj);
      container.word = this.word;
      this.numPoints = numPoints;
      this.set = this.buildWordparts();

      this.wordparts.forEach(function (wordpart) {
        container.addChild(wordpart.container);
      });
    }

    _createClass(WordpartSet, {
      initInteractions: {
        value: function initInteractions() {
          var _this = this;

          var container = this.container;
          var isContactingWordpart = false;
          var dragging = false;

          var laserChain;

          var boundaries = new PIXI.Graphics();
          boundaries.beginFill(_config.boundaryColor);
          boundaries.alpha = 0.1;
          boundaries.drawRect(-200, -200, 400, 400);

          container.addChild(boundaries);

          container.on("wordpart:mousedown", function (event, wordpart) {
            isContactingWordpart = true;
            dragging = true;

            laserChain = new LaserChain();
            laserChain.addLaser(wordpart.container);
            container.addChild(laserChain.container);

            wordpart.select();
          });

          container.on("wordpart:mouseover", function (event, wordpart) {
            isContactingWordpart = true;
            if (!dragging) return;

            if (laserChain) {
              if (!wordpart.selected) {
                laserChain.pointCurrentTo(wordpart.container);
                laserChain.addLaser(wordpart.container);
                laserChain.container.alpha = 1;
              } else if (laserChain.isCurrentTargeting(wordpart.container)) {
                laserChain.container.alpha = 1;
              }
            }

            wordpart.select();
          });

          container.on("wordpart:mouseout", function () {
            isContactingWordpart = false;
            if (!laserChain) return;
            laserChain.container.alpha = 0.5;
          });

          container.mousemove = function (event) {
            if (!dragging) return;
            var pos = event.data.getLocalPosition(container);
            laserChain.pointCurrentTo(pos);
          };

          container.mouseup = function () {
            dragging = false;
            if (isContactingWordpart) {
              var wordIsSelected = _this.word.buildsFrom(_this.getSelected());
              wordIsSelected && container.emit("word:completed");
            }
            _this.clear();
            container.removeChild(laserChain.container);
            laserChain.destroy();
          };

          container.mouseupoutside = function () {
            dragging = false;
            _this.clear();
            container.removeChild(laserChain.container);
            laserChain.destroy();
          };
        }
      },
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
            return wordpart.deselect();
          });
        }
      }
    });

    return WordpartSet;
  })();
})();