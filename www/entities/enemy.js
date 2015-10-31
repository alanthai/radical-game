define(["exports", "module", "../data/enemies", "../Vector", "../config"], function (exports, module, _dataEnemies, _Vector, _config) {
  "use strict";

  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

  var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

  var dataEnemies = _interopRequire(_dataEnemies);

  var Vector = _interopRequire(_Vector);

  var config = _interopRequire(_config);

  var Enemy = (function () {
    function Enemy(wordVariant, data) {
      _classCallCheck(this, Enemy);

      this.wordVariant = wordVariant;

      this.container = new PIXI.Container();
      this.data = data;

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
          Vector.center(sprite);
          this.container.addChild(sprite);
        }
      },
      initText: {
        value: function initText() {
          var text = new PIXI.Text(this.wordVariant);
          var offset = new Vector(config.enemy.textOffset);
          Vector.center(text);
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

  module.exports = Enemy;
});