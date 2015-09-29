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
      // sprite.click = this.toggleSelect.bind(this);
      // sprite.click = () => {
        
      // }

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
      this.container.parent.emit('wordpart:selected', this, this.selected);
    }

    deselect() {
      this.selected = false;
      this.baseSprite.texture = this.inactiveTexture;
      this.container.parent.emit('wordpart:selected', this, this.selected);
    }
  };
})();

export default Wordpart;
