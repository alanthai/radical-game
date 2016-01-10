// import {wordpart as imgs} from '../layout';
import layout from '../layout';
import Vector from '../Vector';
import {getTexture} from '../assetLoader';

var imgs = layout.wordpart;

export default class Wordpart {
  constructor(part, point) {
    this.container = new PIXI.Container();
    this.container._name = 'Wordpart';

    this.part = part;

    this.initBase();
    this.initText();

    this.move(point);

    this.selected = false;
  }

  initBase() {
    this.inactiveTexture = getTexture('wordpart-inactive');
    this.activeTexture = getTexture('wordpart-active');

    var sprite = this.baseSprite = new PIXI.Sprite(this.inactiveTexture);

    sprite.interactive = true;

    var emitEvent = eventName => {
      return (event => {
        // only handle single touch for now
        if (event.data.identifier > 0) return;
        this.container.parent.emit(eventName, event, this);
      });
    };

    sprite.mousedown = sprite.touchstart = emitEvent('wordpart:mousedown');
    sprite.mouseover = sprite.touchover = emitEvent('wordpart:mouseover');
    sprite.mouseout = sprite.touchout = emitEvent('wordpart:mouseout');
    sprite.mouseupoutside = sprite.touchendoutside = emitEvent('wordpart:mouseupoutside');

    sprite.anchor.set(0.5);

    this.container.addChild(sprite);
  }

  initText() {
    var text = new PIXI.Text(this.part, {font: '30px MySimHei'});
    text.anchor.set(0.5);

    this.baseSprite.addChild(text);
  }

  highlight() {
    if (this.hiSprite) return;

    var hiSprite = this.hiSprite = new PIXI.Graphics();
    hiSprite._name = 'hiSprite';
    hiSprite.lineStyle(2, 0x000000, 1);
    hiSprite.drawCircle(0, 0, this.baseSprite.height /2);

    var t = 1200; // total time (in ms) to complete one turn
    var r = this.baseSprite.height + 50; // amplitude (in px)

    setTimeout(() => {
      if (!hiSprite.scale) {return;}
      this.container.addChild(hiSprite);
      this.hiTween = new TWEEN.Tween(hiSprite)
        .to({height: r, width: r}, t / 2)
        .repeat(Infinity)
        .yoyo(true)
        .start();
    }, 1);
  }

  unhighlight() {
    if (!this.hiSprite) return;
    this.container.removeChild(this.hiSprite);
    this.hiTween.stop();
    this.hiSprite.destroy();
    if (~this.container.children.indexOf(this.hiSprite)) {debugger;}
    this.hiSprite = null;
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
    this.container.parent.emit('wordpart:select', null, this); // event === null?
  }

  deselect() {
    this.selected = false;
    this.baseSprite.texture = this.inactiveTexture;
  }
};
