
import dataEnemies from '../data/enemies';
import V from '../Vector';
import config from '../config';

export default class Enemy {
  constructor(wordVariant, data) {
    this.container = new PIXI.Container();
    this.data = Object.assign({}, data);

    this.initSprite();

    this.text = new PIXI.Container(); // placeholder
    this.nextWordVariant(wordVariant);

    V.move(this.container, V(config.enemy.center));
  }

  initSprite() {
    var sprite = PIXI.Sprite.fromImage(this.data.img);
    V.center(sprite);
    this.container.addChild(sprite);
  }

  nextWordVariant(wordVariant) {
    this.container.removeChild(this.text);

    var text = this.text = new PIXI.Text(wordVariant);
    var offset = V(config.enemy.textOffset);
    V.center(text);
    V.move(text, offset);
    this.container.addChild(text);
  }

  miss() {
    this.data.fleeAfter--;

    if (this.fled()) {
      this.container.emit('enemy:fled', this);
      // animate fled
    }
  }

  attack(damage) {
    this.data.health = Math.max(this.data.health - damage, 0);

    if (this.died()) {
      this.container.emit('enemy:died', this);
      // animate death
    } else {
      this.container.emit('enemy:hurt', this);
      // animate hurt
    }
  }

  died() {
    return this.data.health <= 0;
  }

  fled() {
    return this.data.fleeAfter < 1;
  }

  centerText() {}
};
