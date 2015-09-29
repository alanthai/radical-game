"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var Enemy = (function () {
  var dataEnemies = Game.data.enemies;
  var levelEnemies = Game.data.enemies.reduce(function (hash, enemy) {
    (hash[enemy.level] = hash[enemy.level] || []).push(enemy);
    return hash;
  }, {});

  return (function () {
    function Enemy(word, level) {
      _classCallCheck(this, Enemy);

      this.word = word;

      this.container = new PIXI.Container();
      this.data = getRandom(levelEnemies[level]);

      this.initSprite();
      this.initText();

      var position = new Vector(config.enemy.center);
      Vector.move(this.container, position);
    }

    _createClass(Enemy, {
      initSprite: {
        value: function initSprite() {
          var texture = PIXI.Texture.fromImage(this.data.img);
          var sprite = new PIXI.Sprite(texture);
          this.container.addChild(sprite);
        }
      },
      initText: {
        value: function initText() {
          var text = new PIXI.Text(this.word.english);
          var offset = new Vector(config.enemy.textOffset);
          Vector.move(text, offset);
          this.container.addChild(text);
        }
      },
      centerText: {
        value: function centerText() {}
      }
    });

    return Enemy;
  })();
})();