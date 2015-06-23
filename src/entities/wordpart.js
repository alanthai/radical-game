import config from './config.js';

var Wordpart = (() => {
  'use strict';

  var imgs = config.wordpart;

  function center(sprite) {
    sprite.anchor.x = 0.5;
    sprite.anchor.y = 0.5;
  }

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
      sprite.click = this.toggleSelect.bind(this);

      center(sprite);

      this.container.addChild(sprite);
    }

    initText() {
      // var radical = this.part.english;
      var radical = 'eight';
      var img = imgs.text(radical);
      var sprite = this.textSprite = new PIXI.Sprite.fromImage(img);
      center(sprite);

      this.container.addChild(sprite);
    }

    move(point) {
      this.container.x = point.x;
      this.container.y = point.y;
    }

    toggleSelect() {
      this.baseSprite.texture === this.activeTexture
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
