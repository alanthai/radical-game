var config = require('../config');
var Vector = require('../Vector');
var {ticker} = require('../globals.js');

var imgs = config.wordpart;

module.exports = class Wordpart {
  constructor(part, point) {
    this.container = new PIXI.Container();

    this.part = part;

    this.initBase();
    this.initText();

    this.move(point);

    this.selected = false;
  }

  initBase() {
    this.inactiveTexture = PIXI.Texture.fromImage(imgs.inactive);
    this.activeTexture = PIXI.Texture.fromImage(imgs.active);

    var sprite = this.baseSprite = new PIXI.Sprite(this.inactiveTexture);

    sprite.interactive = true;
    sprite.forceHitTest = true;

    var emitEvent = eventName => {
      return (event => {
        this.container.parent.emit(eventName, event, this);
      });
    };

    sprite.mousedown = emitEvent('wordpart:mousedown');
    sprite.mouseover = emitEvent('wordpart:mouseover');
    sprite.mouseout = emitEvent('wordpart:mouseout');

    Vector.center(sprite);

    this.container.addChild(sprite);
  }

  initText() {
    var text = new PIXI.Text(this.part, {font: '30px MySimHei'});
    Vector.center(text);

    this.container.addChild(text);
  }

  highlight() {
    var container = this.container;

    var radius = 0;
    var hiSprite = this.hiSprite = new PIXI.Graphics();
    hiSprite.lineStyle(2, 0x000000, 1);
    hiSprite.drawCircle(container.x, container.y, radius);
    container.addChild(hiSprite);

    var theta = 0;
    var tf = 1500; // total time (in ms) to complete one turn
    var TAU = 2 * Math.PI; // full circle 

    this.ticker = ticker.onTick((tick, diff) => {
      console.log('hello?');
      // var baseRadius = this.baseSprite.height;
      // theta += TAU * diff / 1500;
      // radius = baseRadius + 30 * Math.sin(theta);
    });
    // animate wordpart for hint
  }

  unhighlight() {
    this.container.removeChild(this.hiSprite);
    ticker.removeListener(this.ticker);
    this.hiSprite.destroy();
    this.hiSprite = null;
    this.ticker = 0;
  }

  move(point) {
    Vector.move(this.container, point);
  }

  toggleSelect() {
    this.selected
      ? this.deselect()
      : this.select();
  }

  select() {
    this.selected = true;
    this.baseSprite.texture = this.activeTexture;
  }

  deselect() {
    this.selected = false;
    this.baseSprite.texture = this.inactiveTexture;
  }
};
