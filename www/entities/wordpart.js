"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var Wordpart = (function () {
  "use strict";

  var imgs = config.wordpart;

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
          var _this = this;

          this.inactiveTexture = PIXI.Texture.fromImage(imgs.inactive);
          this.activeTexture = PIXI.Texture.fromImage(imgs.active);

          var sprite = this.baseSprite = new PIXI.Sprite(this.inactiveTexture);

          sprite.interactive = true;
          sprite.forceHitTest = true;

          var emitEvent = function (eventName) {
            return function (event) {
              _this.container.parent.emit(eventName, event, _this);
            };
          };

          sprite.mousedown = emitEvent("wordpart:mousedown");
          sprite.mouseover = emitEvent("wordpart:mouseover");
          sprite.mouseout = emitEvent("wordpart:mouseout");

          center(sprite);

          this.container.addChild(sprite);
        }
      },
      initText: {
        value: function initText() {
          var text = new PIXI.Text(this.part.chinese, { font: "30px MySimHei" });
          center(text);

          this.container.addChild(text);
        }
      },
      move: {
        value: function move(point) {
          Vector.move(this.container, point);
        }
      },
      toggleSelect: {
        value: function toggleSelect() {
          this.selected ? this.deselect() : this.select();
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