import {getTexture} from '../assetLoader';

export default class LevelButton {
  constructor(text) {
    this.container = new PIXI.Container();

    this.initButtonSprite();
    this.initText(text);
  }

  initText(text) {
    if (this.text) return;

    var text = this.text = new PIXI.Text(text);
    text.anchor.set(0.5);
    this.container.addChild(text);
  }

  initButtonSprite() {
    if (this.baseTexture) return;

    var base = this.baseTexture = getTexture('level-button');

    var dw = 92 / 3;
    var dh = 92;
    var txleft = new PIXI.Texture(base, new PIXI.Rectangle(0, 0, dw, dh));
    var txmid = new PIXI.Texture(base, new PIXI.Rectangle(dw, 0, dw, dh));
    var txright = new PIXI.Texture(base, new PIXI.Rectangle(2*dw, 0, dw, dh));

    var left = this.left = new PIXI.Sprite(txleft);
    var mid = this.mid = new PIXI.Sprite(txmid);
    var right = this.right = new PIXI.Sprite(txright);
    mid.x = dw;
    mid.width += 200;
    right.x = 2 * dw + 200;

    var container = this.container;
    container.addChild(this.left);
    container.addChild(this.mid);
    container.addChild(this.right);
  }
};
