import Wordpart from './entities/wordpart';
import Word from './Word';
import Chain from './entities/chain';
import {wordpartSet as layoutWordpartSet} from './layout';
import V from './Vector';
import {getTexture} from './assetLoader';

import data from './data/index';
import {getValues} from './util';

var dataWordparts = getValues(data.radicals);

function getPoints(numPoints) {
  var angle = 2 * Math.PI / numPoints;
  var points = [];
  for (let i = 0; i < numPoints; i++) {
    points.push([Math.cos(i * angle), Math.sin(i * angle)]);
  }
  return points;
}

var radius = layoutWordpartSet.radius;
var r = V(radius, radius);

class WordpartSet {
  constructor(word, parts, giveHints=false) {
    this.word = word;
    this.parts = parts;

    var container = this.container = new PIXI.Container();
    container.position.set(...layoutWordpartSet.position);

    container.interactive = true;
    container.interactiveChildren = true;

    container.word = this.word;

    this.selected = [];

    // Order matters! Boundary must come first before wordparts

    var boundaries = new PIXI.Sprite(getTexture('img/bottom-ui.png'));
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

  initInteractions(giveHints) {
    var container = this.container;
    var isContactingWordpart = false;
    var dragging = false;

    container.on('wordpart:mousedown', (event, wordpart) => {
      isContactingWordpart = true;
      dragging = true;

      this.select(wordpart);
    });

    container.on('wordpart:mouseover', (event, wordpart) => {
      isContactingWordpart = true;
      if (!wordpart.selected && dragging) {
        this.select(wordpart);
      }
    });

    container.on('wordpart:mouseout', () => {
      isContactingWordpart = false;
    });

    var emitEvent = eventName => {
      return event => this.container.emit(eventName, event);
    };

    container.mousemove = emitEvent('wordpartSet:mousemove');
    container.mouseup = emitEvent('wordpartSet:mouseup');
    container.mouseupoutside = emitEvent('wordpartSet:mouseupoutside');

    var clear = () => {
      dragging = false;
      isContactingWordpart = false;
      this.clear();
    }

    container.on('wordpartSet:mouseup', () => {
      if (isContactingWordpart) {
        this.word.buildsFrom(this.selected)
          ? container.emit('word:completed')
          : container.emit('word:incorrect');
      }
      clear();
    });

    container.on('wordpartSet:mouseupoutside', clear);

    if (giveHints) {
      this.initHinter();
    }

    this.initChain();
  }

  buildWordparts() {
    var points = getPoints(this.parts.length);
    points = points.map(pt => V(pt).mult(r));
    this.wordparts = points.map((pt, i) => new Wordpart(this.parts[i], pt));

    this.wordparts.forEach(wordpart => {
      this.container.addChild(wordpart.container);
    });
  }

  select(wordpart) {
    this.selected.push(wordpart.part);
    wordpart.select();
  }

  clear() {
    this.selected = [];
    this.wordparts.forEach(wordpart => wordpart.deselect());
  }

  destroy() {
    this.container.removeAllListeners();
    this.container.destroy();
    this.container.mousemove = null;
    this.container.mouseup = null;
    this.container.mouseupoutside = null;
  }
}


var WordpartSetHinter = {
  initHinter() {
    this.resetHints();

    this.container.on('wordpart:mousedown', (event, wordpart) => {
      this.getHint() === wordpart.part
        && this.highlightNextHint();
    });

    this.container.on('wordpart:select', (event, wordpart) => {
      this.wordparts.forEach(wp => wp.unhighlight());
    });

    this.container.on('word:incorrect', () => this.resetHints());

    this.container.on('wordpart:mouseup', () => this.resetHints());
  },

  highlightNextHint() {
    this.hints.shift();
    this.highlightHint();
  },

  highlightHint() {
    var hint = this.getHint();
    var wordpart = this.wordparts.find(wp => hint === wp.part)

    if (wordpart) wordpart.highlight();
  },

  getHint() {
    return this.hints[0];
  },

  resetHints() {
    this.wordparts.forEach(wp => wp.unhighlight());
    this.hints = [null, ...this.word.getPieces()];
    this.highlightNextHint();
  }
};

var WordpartSetChain = {
  initChain() {
    var container = this.container;
    var chain;
    
    container.on('wordpart:mousedown', (event, wordpart) => {
      chain = new Chain();
      chain.lockTo(wordpart.container);
      container.addChild(chain.container);
    });

    container.on('wordpart:select', (event, wordpart) => {
      if (!chain) return;

      chain.pointCurrentTo(wordpart.container);
      chain.lockTo(wordpart.container);
    });

    container.on('wordpart:mouseover', () => {
      if (!chain) return;
      chain.container.alpha = 1
    });

    container.on('wordpart:mouseout', () => {
      if (!chain) return;
      chain.container.alpha = 0.5;
    });

    container.on('wordpartSet:mousemove', event => {
      if (!chain) return;
      var pos = event.data.getLocalPosition(container);
      chain.pointCurrentTo(pos);
    });

    function destroy() {
      if (!container.children || !chain) {return;}
      container.removeChild(chain.container);
      chain.destroy();
      chain = null;
    }

    container.on('wordpartSet:mouseup', destroy);
    container.on('wordpartSet:mouseupoutside', destroy);
  }
};


var mixins = Object.assign({}, WordpartSetHinter, WordpartSetChain);

Object.keys(mixins).forEach(prop => {
  mixins[prop] = {value: mixins[prop]};
})

Object.defineProperties(WordpartSet.prototype, mixins);

export default WordpartSet;
