define(["exports", "module", "../data/enemies", "../Vector", "../config"], function (exports, module, _dataEnemies, _Vector, _config) {
  "use strict";

  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

  var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

  var dataEnemies = _interopRequire(_dataEnemies);

  var V = _interopRequire(_Vector);

  var config = _interopRequire(_config);

  var Enemy = (function () {
    function Enemy(wordVariant, data) {
      _classCallCheck(this, Enemy);

      this.container = new PIXI.Container();
      this.data = Object.assign({}, data);

      this.initSprite();

      this.text = new PIXI.Container(); // placeholder
      this.nextWordVariant(wordVariant);

      V.move(this.container, V(config.enemy.center));
    }

    _createClass(Enemy, {
      initSprite: {
        value: function initSprite() {
          var texture = PIXI.Texture.fromImage(this.data.img);
          var sprite = new PIXI.Sprite(texture);
          V.center(sprite);
          this.container.addChild(sprite);
        }
      },
      nextWordVariant: {
        value: function nextWordVariant(wordVariant) {
          this.container.removeChild(this.text);

          var text = this.text = new PIXI.Text(wordVariant);
          var offset = V(config.enemy.textOffset);
          V.center(text);
          V.move(text, offset);
          this.container.addChild(text);
        }
      },
      miss: {
        value: function miss() {
          this.data.fleeAfter--;

          if (this.fled()) {
            this.container.emit("enemy:fled", this);
            // animate fled
          }
        }
      },
      attack: {
        value: function attack(damage) {
          this.data.health = Math.max(this.data.health - damage, 0);

          if (this.died()) {
            this.container.emit("enemy:died", this);
            // animate death
          } else {
            this.container.emit("enemy:hurt", this);
            // animate hurt
          }
        }
      },
      died: {
        value: function died() {
          return this.data.health <= 0;
        }
      },
      fled: {
        value: function fled() {
          return this.data.fleeAfter < 1;
        }
      },
      centerText: {
        value: function centerText() {}
      }
    });

    return Enemy;
  })();

  module.exports = Enemy;
});