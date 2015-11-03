// import {wordpart as imgs} from '../config';
import config from '../config';
import Vector from '../Vector';
import {ticker} from '../globals';

var imgs = config.wordpart;

export default class Wordpart {
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
    if (this.hiSprite) return;

    var hiSprite = this.hiSprite = new PIXI.Graphics();
    hiSprite.lineStyle(2, 0x000000, 1);
    hiSprite.drawCircle(0, 0, 64);

    var theta = 0;
    var tf = 1200; // total time (in ms) to complete one turn
    var TAU = 2 * Math.PI; // full circle 
    var dr = 25;

    // On first tick, do nothing (except add the real onTick)
    // Fixes bug: On highlight and unhighlight on same frame,
    // Two highlights show at the same time.
    var firstTick = () => {
      this.container.addChild(hiSprite);
      ticker.removeListener(firstTicker);
      this.ticker = ticker.onTick(onTick);
    }

    var onTick = (tick, diff) => {
      var baseRadius = this.baseSprite.height + dr;
      theta += TAU * diff / tf;
      var radius = baseRadius + dr * Math.sin(theta);
      hiSprite.height = hiSprite.width = radius;
    }

    var firstTicker = ticker.onTick(firstTick);
  }

  unhighlight() {
    if (!this.hiSprite) return;
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
    this.container.parent.emit('wordpart:select', event, this);
  }

  deselect() {
    this.selected = false;
    this.baseSprite.texture = this.inactiveTexture;
  }
};
