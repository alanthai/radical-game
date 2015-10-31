
var dataEnemies = require('../data/enemies');
var Vector = require('../Vector');
var config = require('../config');

module.exports = class Enemy {
  constructor(wordVariant, data) {
    this.wordVariant = wordVariant;

    this.container = new PIXI.Container();
    this.data = data;

    this.initSprite();
    this.initText();

    var position = new Vector(config.enemy.center);
    Vector.move(this.container, position);
  }

  initSprite() {
    var texture = PIXI.Texture.fromImage(this.data.img);
    var sprite = new PIXI.Sprite(texture);
    Vector.center(sprite);
    this.container.addChild(sprite);
  }

  initText() {
    var text = new PIXI.Text(this.wordVariant);
    var offset = new Vector(config.enemy.textOffset);
    Vector.center(text);
    Vector.move(text, offset);
    this.container.addChild(text);
  }

  centerText() {}
};
