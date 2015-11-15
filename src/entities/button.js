import {getTexture} from '../assetLoader';

function emptyArray(n, value=0) {return Array(n).fill(value);}

function zip(coll1, coll2, cb) {
  var len = Math.min(coll1.length, coll2.length)

  for (let i = 0; i < len; i++) {
    cb(coll1[i], coll2[i]);
  }
}

export default class LevelButton {
  // minimum width is 96px;
  constructor(text, width) {
    var container = this.container = new PIXI.Container();
    container.interactive = true;
    container.mouseup = this.fire.bind(this);

    this.enabled = true;

    this.enabledTexture = getTexture('level-button');
    this.disabledTexture = getTexture('level-button-disabled');

    this.initButtonSprite(width);
    this.initText(text);
  }

  initText(text) {
    if (this.text) return;

    var text = this.text = new PIXI.Text(text);
    text.anchor.set(0.5);
    this.container.addChild(text);
  }

  initButtonSprite(fullWidth) {
    var enabledTexture = this.enabledTexture;

    var dw = enabledTexture.width / 3;
    var dx = fullWidth - enabledTexture.width;

    var spriteContainer = this.spriteContainer = new PIXI.Container();
    this.container.addChild(spriteContainer);

    var textures = this.getTextures().enabled;
    var sprites = this.spriteParts = emptyArray(3).map((_, i) => {
      var sprite = new PIXI.Sprite(textures[i]);

      sprite.anchor.set(0.5);
      sprite.position.x = (i - 1) * (dw + dx/2);
      spriteContainer.addChild(sprite);

      return sprite;
    });

    sprites[1].width += dx;
  }

  getTextures() {
    if (this.textures) return this.textures;

    var enabledTexture = this.enabledTexture;
    var dw = enabledTexture.width / 3;
    var dh = enabledTexture.height;

    var getTextures = state => {
      return emptyArray(3).map((_, i) => {
        var rect = new PIXI.Rectangle(i * dw, 0, dw, dh);
        return new PIXI.Texture(this[`${state}Texture`], rect);
      });
    };

    var enabled = getTextures('enabled');
    var disabled = getTextures('disabled');

    this.textures = {enabled, disabled};
    return this.textures;
  }

  fire() {
    if (!this.enabled) return;
    this.container.emit('button:clicked', this);
  }

  toggleEnable(enable=true) {
    this.enabled = enable;
    var textures = this.getTextures()[enable ? 'enabled' : 'disabled'];
    zip(this.spriteParts, textures, (part, texture) => {
      part.texture = texture;      
    });
  }

  enable() {
    this.toggleEnable(true);
  }

  disable() {
    this.toggleEnable(false);
  }
};
