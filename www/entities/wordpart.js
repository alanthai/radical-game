define(["exports", "module", "../layout", "../Vector", "../globals", "../assetLoader"], function (exports, module, _layout, _Vector, _globals, _assetLoader) {
  "use strict";

  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

  var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

  // import {wordpart as imgs} from '../layout';

  var layout = _interopRequire(_layout);

  var Vector = _interopRequire(_Vector);

  var ticker = _globals.ticker;
  var getTexture = _assetLoader.getTexture;

  var imgs = layout.wordpart;

  var Wordpart = (function () {
    function Wordpart(part, point) {
      _classCallCheck(this, Wordpart);

      this.container = new PIXI.Container();
      this.container._name = "Wordpart";

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

          this.inactiveTexture = getTexture("wordpart-inactive");
          this.activeTexture = getTexture("wordpart-active");

          var sprite = this.baseSprite = new PIXI.Sprite(this.inactiveTexture);

          sprite.interactive = true;

          var emitEvent = function (eventName) {
            return function (event) {
              _this.container.parent.emit(eventName, event, _this);
            };
          };

          sprite.mousedown = emitEvent("wordpart:mousedown");
          sprite.mouseover = emitEvent("wordpart:mouseover");
          sprite.mouseout = emitEvent("wordpart:mouseout");
          sprite.mouseupoutside = emitEvent("wordpart:mouseupoutside");

          Vector.center(sprite);

          this.container.addChild(sprite);
        }
      },
      initText: {
        value: function initText() {
          var text = new PIXI.Text(this.part, { font: "30px MySimHei" });
          Vector.center(text);

          this.baseSprite.addChild(text);
        }
      },
      highlight: {
        value: function highlight() {
          var _this = this;

          if (this.hiSprite) {
            return;
          }var hiSprite = this.hiSprite = new PIXI.Graphics();
          hiSprite._name = "hiSprite";
          hiSprite.lineStyle(2, 0, 1);
          hiSprite.drawCircle(0, 0, this.baseSprite.height);

          var theta = 0;
          var tf = 1200; // total time (in ms) to complete one turn
          var TAU = 2 * Math.PI; // full circle
          var dr = 25; // amplitude (in px)

          // On first tick, do nothing (except add the real onTick)
          // Fixes bug: On highlight and unhighlight on same frame,
          // Two highlights show at the same time.
          var firstTick = function () {
            // Fixes bug: this still gets called after it gets destroyed
            // Sequence: Go to highlight, then go to non-highlight
            if (!hiSprite.scale) {
              return;
            }
            _this.container.addChild(hiSprite);
            ticker.removeListener(firstTicker);
            _this.ticker = ticker.onTick(onTick);
          };

          // TODO: scale instead of height/width
          var onTick = function (tick, diff) {
            var baseRadius = _this.baseSprite.height + dr;
            theta += TAU * diff / tf;
            var radius = baseRadius + dr * Math.sin(theta);
            hiSprite.height = hiSprite.width = radius;
          };

          var firstTicker = ticker.onTick(firstTick);
        }
      },
      unhighlight: {
        value: function unhighlight() {
          if (!this.hiSprite) {
            return;
          }this.container.removeChild(this.hiSprite);
          ticker.removeListener(this.ticker);
          this.hiSprite.destroy();
          if (~this.container.children.indexOf(this.hiSprite)) {
            debugger;
          }
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
          this.container.parent.emit("wordpart:select", null, this); // event === null?
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

  module.exports = Wordpart;
});