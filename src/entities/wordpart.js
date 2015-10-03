import config from './config.js';

var Wordpart = (() => {
  'use strict';

  var imgs = config.wordpart;

  return class Wordpart {
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
      }

      sprite.mousedown = emitEvent('wordpart:mousedown');
      sprite.mouseover = emitEvent('wordpart:mouseover');
      sprite.mouseout = emitEvent('wordpart:mouseout');

      center(sprite);

      this.container.addChild(sprite);
    }

    initText() {
      var text = new PIXI.Text(this.part.chinese, {font: '30px MySimHei'});
      center(text);

      this.container.addChild(text);
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
})();

export default Wordpart;
