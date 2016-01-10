define(["exports", "module", "../layout", "../Vector", "../assetLoader"], function (exports, module, _layout, _Vector, _assetLoader) {
  "use strict";

  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

  var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

  // import {wordpart as imgs} from '../layout';

  var layout = _interopRequire(_layout);

  var Vector = _interopRequire(_Vector);

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
              // only handle single touch for now
              if (event.data.identifier > 0) return;
              _this.container.parent.emit(eventName, event, _this);
            };
          };

          sprite.mousedown = sprite.touchstart = emitEvent("wordpart:mousedown");
          sprite.mouseover = sprite.touchover = emitEvent("wordpart:mouseover");
          sprite.mouseout = sprite.touchout = emitEvent("wordpart:mouseout");
          sprite.mouseupoutside = sprite.touchendoutside = emitEvent("wordpart:mouseupoutside");

          sprite.anchor.set(0.5);

          this.container.addChild(sprite);
        }
      },
      initText: {
        value: function initText() {
          var text = new PIXI.Text(this.part, { font: "30px MySimHei" });
          text.anchor.set(0.5);

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
          hiSprite.drawCircle(0, 0, this.baseSprite.height / 2);

          var t = 1200; // total time (in ms) to complete one turn
          var r = this.baseSprite.height + 50; // amplitude (in px)

          setTimeout(function () {
            if (!hiSprite.scale) {
              return;
            }
            _this.container.addChild(hiSprite);
            _this.hiTween = new TWEEN.Tween(hiSprite).to({ height: r, width: r }, t / 2).repeat(Infinity).yoyo(true).start();
          }, 1);
        }
      },
      unhighlight: {
        value: function unhighlight() {
          if (!this.hiSprite) {
            return;
          }this.container.removeChild(this.hiSprite);
          this.hiTween.stop();
          this.hiSprite.destroy();
          if (~this.container.children.indexOf(this.hiSprite)) {
            debugger;
          }
          this.hiSprite = null;
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