define(["exports", "module", "../Vector"], function (exports, module, _Vector) {
  "use strict";

  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

  var _toConsumableArray = function (arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } };

  var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

  var V = _interopRequire(_Vector);

  var Enemy = (function () {
    function Enemy(wordVariant, data) {
      _classCallCheck(this, Enemy);

      this.container = new PIXI.Container();
      this.properties = Object.assign({}, data);
      this.properties.maxHealth = data.health;
      this.properties.misses = 0;

      this.initSprite();

      this.text = new PIXI.Container(); // placeholder
      this.nextWordVariant(wordVariant);
    }

    _createClass(Enemy, {
      initSprite: {
        value: function initSprite() {
          var _sprite$position;

          var sprite = PIXI.Sprite.fromImage(this.properties.img);
          sprite.anchor.set(0.5);
          (_sprite$position = sprite.position).set.apply(_sprite$position, _toConsumableArray(this.get("position")));
          this.container.addChild(sprite);
        }
      },
      get: {
        value: function get(key) {
          return this.properties[key];
        }
      },
      nextWordVariant: {
        value: function nextWordVariant(wordVariant) {
          this.container.removeChild(this.text);

          var text = this.text = new PIXI.Text(wordVariant);
          var offset = V(this.get("textOffset"));
          text.anchor.set(0.5);
          V.move(text, offset);
          this.container.addChild(text);
        }
      },
      miss: {
        value: function miss() {
          this.properties.misses++;

          this.container.emit("enemy:missed");

          if (this.fled()) {
            this.container.emit("enemy:fled", this);
            // animate fled
          }
        }
      },
      attack: {
        value: function attack(damage) {
          this.properties.health = Math.max(this.properties.health - damage, 0);

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
          return this.get("health") <= 0;
        }
      },
      fled: {
        value: function fled() {
          if (!this.get("maxMisses")) {
            return false;
          }
          return this.get("misses") >= this.get("maxMisses");
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