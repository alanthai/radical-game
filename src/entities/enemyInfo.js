import {enemyInfo as layoutEnemyInfo} from '../layout';
import {emptyArray} from '../util';
import {getTexture} from '../assetLoader';

class EnemyInfo {
  constructor(enemy, {hideHealthbar, hideFleeCounter} = {}) {
    this.enemy = enemy;

    var container = this.container = new PIXI.Container();

    this.initHealthbar(hideHealthbar);
    this.initFleeCounter(hideFleeCounter);

    // init enemy description
    var description = this.description = new PIXI.Text(enemy.get('name'));
    description.position.set(...layoutEnemyInfo.description);
    description.anchor.set(0.5)
    container.addChild(description);

    this.initEventListeners();
  }

  initHealthbar(hideHealthbar) {
    var {
      containerWidth, containerBackground,
      background, position, dimensions,
    } = layoutEnemyInfo.healthbar;

    var [w, h] = dimensions;
    var rectParams = [-w/2, -h/2, w, h];

    this.currentHp = this.enemy.get('health');

    var healthbar = this.healthbar = new PIXI.Graphics();
    healthbar.beginFill(containerBackground);
    healthbar.lineStyle(containerWidth, 0x000000);
    healthbar.position.set(...position);
    healthbar.drawRect(...rectParams);

    var currentHealth = this.currentHealth = new PIXI.Graphics();
    currentHealth.beginFill(background);
    currentHealth.drawRect(...rectParams);

    healthbar.addChild(currentHealth);

    if (!hideHealthbar) {
      this.container.addChild(healthbar);
    }
  }

  initFleeCounter(hideFleeCounter) {
    var {
      position, circleParams, circleYOffset
    } = layoutEnemyInfo.fleeCounter;

    var fleeCounter = this.fleeCounter = new PIXI.Container();
    fleeCounter.position.set(0, 0);

    var maxMisses = this.enemy.get('maxMisses');
    this.missSprites = emptyArray(maxMisses).map((_, i) => {
      var base = new PIXI.Graphics();
      var [x, y, r] = circleParams;

      var fleeIcon = base.fleeIcon = new PIXI.Sprite(getTexture('flee'));
      fleeIcon.anchor.set(0.5);
      fleeIcon.position.y = y + i * circleYOffset;
      base.addChild(fleeIcon);

      fleeCounter.position.set(...position);
      fleeCounter.addChild(base);
      return base;
    });

    if (!hideFleeCounter) {
      this.updateMisses();
      this.container.addChild(fleeCounter);
    }
  }

  initEventListeners() {
    this.enemy.container.on('enemy:hurt', () => this.updateHealth());
    this.enemy.container.on('enemy:died', () => this.updateHealth());
    this.enemy.container.on('enemy:missed', () => this.updateMisses());
  }

  updateHealth() {
    var enemy = this.enemy;
    var currentHp = enemy.get('health');
    if (currentHp === this.currentHp) return;
    // animate healthbar
    var hpRatio = currentHp / enemy.get('maxHealth');
    this.currentHealth.scale.x = hpRatio;
    this.currentHealth.x = (hpRatio - 1) * this.healthbar.width / 2;
    this.currentHp = currentHp;
  }

  updateMisses() {
    var misses = this.enemy.get('misses');
    var {
      activeColor, inactiveColor, circleParams, circleYOffset
    } = layoutEnemyInfo.fleeCounter;

    this.missSprites.forEach((sprite, i) => {
      var enable = i < misses;
      sprite.fleeIcon.alpha = ~~enable;
      sprite.clear();
      sprite.beginFill(enable ? activeColor : inactiveColor);
      var [x, y, r] = circleParams.slice();
      sprite.drawCircle(x, y + i * circleYOffset, r);
    });
  }
}

export default EnemyInfo;
