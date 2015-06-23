import Wordpart from './entities/wordpart.js';
import Word from './Word.js';
import config from './config.js';
import wordpartList from './data/wordparts.js';
import Vector from './Vector.js';

var WordpartSet = (() => {
  'use strict';
  var wordpartList = wordparts;

  function shuffle(array) {
    for (let i = 0, len = array.length; i < len; i++) {
      let rnd = Math.floor(Math.random() * (len - 1));
      [array[rnd], array[i]] = [array[i], array[rnd]];
    }
    return array;
  }

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
      container.x = center.x;
      container.y = center.y;

      this.word = new Word(wordObj);
      this.numPoints = numPoints;
      this.set = this.buildWordparts();

      this.wordparts.forEach(wordpart => {
        container.addChild(wordpart.container);
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
      wordpart.selected = true;
    }

    clear() {
      this.wordparts.forEach(wordpart => wordpart.selected = false);
    }
  };
})();

export default WordpartSet;
