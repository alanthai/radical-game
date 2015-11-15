import {enemyInfo} from '../layout';

class EnemyInfo {
  constructor(enemy, {hideHealthbar, hideFleeCounter}) {
    this.enemy = enemy;
    var layout = layout.enemyInfo

    var container = this.container = new PIXI.Container();

    if (!hideHealthbar) {
      this.initHealthbar(layout.healthbar);
    }

    // if (!hideFleeCounter) {
    //   var fleeCounter = this.fleeCounter = new PIXI.Container();
    //   fleeCounter.position.set(...enemyInfo.fleeCounter);
    //   container.addChild();
    // }

    // init enemy description
    var description = this.description = new PIXI.Text(enemy.get('name'));
    description.position.set(...enemyInfo.description);
    container.addChild(description);

    this.initEventListeners();
  }

  initHealthbar({
    containerWidth, containerBackground,
    background,
    position, dimensions
  }) {
    var [w, h] = dimensions;
    var rectParams = [-w/2, -h/2, w, h];

    this.currentHp = enemy.get('health');
    this.maxWidth = w;

    var healthbar = this.healthbar = new PIXI.Graphics();
    healthbar.beginFill(containerBackground);
    healthbar.lineStyle(containerWidth, 0x000000);
    healthbar.position.set(...position);
    healthbar.drawRect(...rectParams);
    // healthbar.anchor.set(0.5);

    var currentHealth = this.currentHealth = new PIXI.Graphics();
    currentHealth.beginFill(background);
    currentHealth.drawRect(...rectParams);
    // currentHealth.anchor.set(0, 0.5);

    healthbar.addChild(currentHealth);
    container.addChild(healthbar);
  }

  initEventListeners() {
    this.enemy.container.on('enemy:hurt', () => this.updateHealth());
    this.enemy.container.on('enemy:died', () => this.updateHealth());
    this.enemy.container.on('enemy:missed', () => this.updateMisses());
  }

  updateHealth() {
    var currentHp = enemy.get('health');
    if (currentHp === this.currentHp) return;
    // animate healthbar
    var hpRatio = currentHp / enemy.get('maxHealth');
    this.currentHealth.width = this.healthbar.width * hpRatio;
    this.currentHp = currentHp;
  }

  updateMisses() {

  }
}
