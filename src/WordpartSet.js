import Wordpart from './entities/wordpart.js';
import Word from './Word.js';
import config from './config.js';
import Vector from './Vector.js';

var WordpartSet = (() => {
  var dataWordparts = Game.data.wordparts;

  function getPoints(numPoints) {
    var angle = 2 * Math.PI / numPoints;
    var points = [];
    for (let i = 0; i < numPoints; i++) {
      points.push([Math.cos(i * angle), Math.sin(i * angle)]);
    }
    return points;
  }

  /**
   * @param type Either 'radical' or 'word'; Default radical
   */
  function getRandomPart(type='radical') {
    return getRandom(dataWordparts[type]);
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

  return class WordpartSet {
    constructor(wordObj, numPoints=6) {
      var container = this.container = new PIXI.Container();
      Vector.move(container, center);

      container.interactive = true;
      container.interactiveChildren = true;

      container.click = () => {debugger};

      this.word = new Word(wordObj);
      container.word = this.word;
      this.numPoints = numPoints;
      this.set = this.buildWordparts();

      this.wordparts.forEach(wordpart => {
        container.addChild(wordpart.container);
      });

      container.on('wordpart:selected', () => {
        var wordIsSelected = this.word.buildsFrom(this.getSelected());
        wordIsSelected && container.emit('word:completed');
      });
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
      this.wordparts.forEach(wordpart => wordpart.deselected());
    }
  };
})();

export default WordpartSet;
