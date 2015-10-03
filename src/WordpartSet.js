import Wordpart from './entities/wordpart.js';
import Word from './Word.js';
import config from './config.js';
import Vector from './Vector.js';

var WordpartSet = (() => {
  var dataWordparts = getValues(Game.data.radicals);

  function getPoints(numPoints) {
    var angle = 2 * Math.PI / numPoints;
    var points = [];
    for (let i = 0; i < numPoints; i++) {
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
    for (let i = 0, len = numPoints - parts.length; i < len; i++) {
      parts.push(getRandomPart());
    }

    return shuffle(parts);
  }

  var _config = config.wordpartSet;
  var center = new Vector(_config.center);
  var radius = _config.radius;
  var r = new Vector(radius, radius);

  class LaserChain {
    constructor() {
      this.container = new PIXI.Container();
      this.lasers = [];
      this.laserImg = PIXI.Texture.fromImage(_config.laserImg);
    }

    addLaser(startPos) {
      var start = Vector.move(new PIXI.Point(0, 0), startPos);
      var end = Vector.move(new PIXI.Point(0, 0), startPos);
      this.current = new PIXI.mesh.Rope(this.laserImg, [start, end]);

      this.container.addChild(this.current);
    }

    pop() {
      this.container.removeChild(this.current);
      this.current.destroy();
      this.current = this.container.children.slice(-1)[0];
    }

    pointCurrentTo(point) {
      var head = this.current.points.slice(-1)[0];
      Vector.move(head, point);
    }

    isCurrentTargeting(point) {
      var head = this.current.points[0];
      return head.x === point.x && head.y === point.y;
    }

    destroy() {
      this.container.destroy();
    }
  }

  return class WordpartSet {
    constructor(wordObj, numPoints=6) {
      var container = this.container = new PIXI.Container();
      Vector.move(container, center);

      container.interactive = true;
      container.interactiveChildren = true;

      this.initInteractions();

      this.word = new Word(wordObj);
      container.word = this.word;
      this.numPoints = numPoints;
      this.set = this.buildWordparts();

      this.wordparts.forEach(wordpart => {
        container.addChild(wordpart.container);
      });

    }

    initInteractions() {
      var container = this.container;
      var isContactingWordpart = false;
      var dragging = false;

      var laserChain;

      var boundaries = new PIXI.Graphics();
      boundaries.beginFill(_config.boundaryColor);
      boundaries.alpha = 0.1;
      boundaries.drawRect(-200, -200, 400, 400);

      container.addChild(boundaries);

      container.on('wordpart:mousedown', (event, wordpart) => {
        isContactingWordpart = true;
        dragging = true;

        laserChain = new LaserChain();
        laserChain.addLaser(wordpart.container);
        container.addChild(laserChain.container);

        wordpart.select();
      });

      container.on('wordpart:mouseover', (event, wordpart) => {
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

      container.on('wordpart:mouseout', () => {
        isContactingWordpart = false;
        if (!laserChain) return;
        laserChain.container.alpha = 0.5;
      });

      container.mousemove = event => {
        if (!dragging) return;
        var pos = event.data.getLocalPosition(container);
        laserChain.pointCurrentTo(pos);
      }

      container.mouseup = () => {
        dragging = false;
        if (isContactingWordpart) {
          var wordIsSelected = this.word.buildsFrom(this.getSelected());
          wordIsSelected && container.emit('word:completed');
        }
        this.clear();
        container.removeChild(laserChain.container);
        laserChain.destroy();
      };

      container.mouseupoutside = () => {
        dragging = false;
        this.clear();
        container.removeChild(laserChain.container);
        laserChain.destroy();
      }
    }

    buildWordparts() {
      var points = getPoints(this.numPoints);
      var parts = generateMissingParts(this.word.parts, this.numPoints);
      points = points.map(pt => new Vector(pt).mult(r));
      this.wordparts = points.map((pt, i) => new Wordpart(parts[i], pt));
    }

    getSelected() {
      return this.wordparts.filter(wordpart => wordpart.selected);
    }

    select(wordpart) {
      wordpart.select();
    }

    clear() {
      this.wordparts.forEach(wordpart => wordpart.deselect());
    }
  };
})();

export default WordpartSet;
