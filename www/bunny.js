"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var Bunny = (function () {
  function Bunny() {
    _classCallCheck(this, Bunny);

    this.texture = PIXI.Texture.fromImage("img/bunny.png");
    var sprite = this.sprite = new PIXI.Sprite(this.texture);

    sprite.anchor.x = 0.5;
    sprite.anchor.y = 0.5;

    sprite.position.x = 200;
    sprite.position.y = 150;
  }

  _createClass(Bunny, {
    getSprite: {
      value: function getSprite() {
        return this.sprite;
      }
    }
  });

  return Bunny;
})();