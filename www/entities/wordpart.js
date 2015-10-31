define(function (require, exports, module) {
  "use strict";

  var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

  var config = require("../config");
  var Vector = require("../Vector");

  var _require = require("../globals.js");

  var ticker = _require.ticker;

  var imgs = config.wordpart;

  module.exports = (function () {
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

          Vector.center(sprite);

          this.container.addChild(sprite);
        }
      },
      initText: {
        value: function initText() {
          var text = new PIXI.Text(this.part, { font: "30px MySimHei" });
          Vector.center(text);

          this.container.addChild(text);
        }
      },
      highlight: {
        value: function highlight() {
          var container = this.container;

          var radius = 0;
          var hiSprite = this.hiSprite = new PIXI.Graphics();
          hiSprite.lineStyle(2, 0, 1);
          hiSprite.drawCircle(container.x, container.y, radius);
          container.addChild(hiSprite);

          var theta = 0;
          var tf = 1500; // total time (in ms) to complete one turn
          var TAU = 2 * Math.PI; // full circle

          this.ticker = ticker.onTick(function (tick, diff) {
            console.log("hello?");
            // var baseRadius = this.baseSprite.height;
            // theta += TAU * diff / 1500;
            // radius = baseRadius + 30 * Math.sin(theta);
          });
          // animate wordpart for hint
        }
      },
      unhighlight: {
        value: function unhighlight() {
          this.container.removeChild(this.hiSprite);
          ticker.removeListener(this.ticker);
          this.hiSprite.destroy();
          this.hiSprite = null;
          this.ticker = 0;
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
});