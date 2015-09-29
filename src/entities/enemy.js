var Enemy = (() => {
  var dataEnemies = Game.data.enemies;
  var levelEnemies = Game.data.enemies.reduce((hash, enemy) => {
    (hash[enemy.level] = hash[enemy.level]  || []).push(enemy);
    return hash;
  }, {});

  return class Enemy {
    constructor(word, level) {
      this.word = word;

      this.container = new PIXI.Container();
      this.data = getRandom(levelEnemies[level]);

      this.initSprite();
      this.initText();

      var position = new Vector(config.enemy.center);
      Vector.move(this.container, position);
    }

    initSprite() {
      var texture = PIXI.Texture.fromImage(this.data.img);
      var sprite = new PIXI.Sprite(texture);
      this.container.addChild(sprite);
    }

    initText() {
      var text = new PIXI.Text(this.word.english);
      var offset = new Vector(config.enemy.textOffset);
      Vector.move(text, offset);
      this.container.addChild(text);
    }

    centerText() {}
  };
})();