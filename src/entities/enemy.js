
import V from '../Vector';
import {enemy as layoutEnemy} from '../layout';

export default class Enemy {
  constructor(wordVariant, data) {
    this.container = new PIXI.Container();
    this.properties = Object.assign({}, data);
    this.properties.maxHealth = data.health;
    this.properties.misses = 0;

    this.initSprite();

    this.text = new PIXI.Container(); // placeholder
    this.nextWordVariant(wordVariant);
  }

  initSprite() {
    var sprite = PIXI.Sprite.fromImage(this.properties.img);
    V.center(sprite);
    this.container.addChild(sprite);
  }

  get(key) {
    return this.properties[key];
  }

  nextWordVariant(wordVariant) {
    this.container.removeChild(this.text);

    var text = this.text = new PIXI.Text(wordVariant);
    var offset = V(layoutEnemy.textOffset);
    V.center(text);
    V.move(text, offset);
    this.container.addChild(text);
  }

  miss() {
    this.properties.misses++;

    this.container.emit('enemy:missed');

    if (this.fled()) {
      this.container.emit('enemy:fled', this);
      // animate fled
    }
  }

  attack(damage) {
    this.properties.health = Math.max(this.properties.health - damage, 0);

    if (this.died()) {
      this.container.emit('enemy:died', this);
      // animate death
    } else {
      this.container.emit('enemy:hurt', this);
      // animate hurt
    }
  }

  died() {
    return this.get('health') <= 0;
  }

  fled() {
    if (!this.get('maxMisses')) {return false;}
    return this.get('misses') >= this.get('maxMisses');
  }

  centerText() {}
};
