"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var Wordpart = (function () {
  "use strict";

  var imgs = config.wordpart;

  function center(sprite) {
    sprite.anchor.x = 0.5;
    sprite.anchor.y = 0.5;
  }

  return (function () {
    function Wordpart(part, point) {
      _classCallCheck(this, Wordpart);

      this.container = new PIXI.Container();

      this.part = part;

      this.initBase();
      this.initText();

      this.move(point);

      this.selected = false;
    }

    _createClass(Wordpart, {
      initBase: {
        value: function initBase() {
          this.inactiveTexture = PIXI.Texture.fromImage(imgs.inactive);
          this.activeTexture = PIXI.Texture.fromImage(imgs.active);

          var sprite = this.baseSprite = new PIXI.Sprite(this.inactiveTexture);

          sprite.interactive = true;
          sprite.click = this.toggleSelect.bind(this);

          center(sprite);

          this.container.addChild(sprite);
        }
      },
      initText: {
        value: function initText() {
          // var radical = this.part.english;
          var radical = "eight";
          var img = imgs.text(radical);
          var sprite = this.textSprite = new PIXI.Sprite.fromImage(img);
          center(sprite);

          this.container.addChild(sprite);
        }
      },
      move: {
        value: function move(point) {
          this.container.x = point.x;
          this.container.y = point.y;
        }
      },
      toggleSelect: {
        value: function toggleSelect() {
          this.baseSprite.texture === this.activeTexture ? this.deselect() : this.select();
        }
      },
      select: {
        value: function select() {
          this.selected = true;
          this.baseSprite.texture = this.activeTexture;
        }
      },
      deselect: {
        value: function deselect() {
          this.selected = false;
          this.baseSprite.texture = this.inactiveTexture;
        }
      }
    });

    return Wordpart;
  })();
})();