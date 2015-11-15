define(["exports", "module", "../assetLoader"], function (exports, module, _assetLoader) {
  "use strict";

  var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

  var getTexture = _assetLoader.getTexture;

  function emptyArray(n) {
    var value = arguments[1] === undefined ? 0 : arguments[1];
    return Array(n).fill(value);
  }

  function zip(coll1, coll2, cb) {
    var len = Math.min(coll1.length, coll2.length);

    for (var i = 0; i < len; i++) {
      cb(coll1[i], coll2[i]);
    }
  }

  var LevelButton = (function () {
    // minimum width is 96px;

    function LevelButton(text, width) {
      _classCallCheck(this, LevelButton);

      var container = this.container = new PIXI.Container();
      container.interactive = true;
      container.mouseup = this.fire.bind(this);

      this.enabled = true;

      this.enabledTexture = getTexture("level-button");
      this.disabledTexture = getTexture("level-button-disabled");

      this.initButtonSprite(width);
      this.initText(text);
    }

    _createClass(LevelButton, {
      initText: {
        value: function initText(text) {
          if (this.text) {
            return;
          }var text = this.text = new PIXI.Text(text);
          text.anchor.set(0.5);
          this.container.addChild(text);
        }
      },
      initButtonSprite: {
        value: function initButtonSprite(fullWidth) {
          var enabledTexture = this.enabledTexture;

          var dw = enabledTexture.width / 3;
          var dx = fullWidth - enabledTexture.width;

          var spriteContainer = this.spriteContainer = new PIXI.Container();
          this.container.addChild(spriteContainer);

          var textures = this.getTextures().enabled;
          var sprites = this.spriteParts = emptyArray(3).map(function (_, i) {
            var sprite = new PIXI.Sprite(textures[i]);

            sprite.anchor.set(0.5);
            sprite.position.x = (i - 1) * (dw + dx / 2);
            spriteContainer.addChild(sprite);

            return sprite;
          });

          sprites[1].width += dx;
        }
      },
      getTextures: {
        value: (function (_getTextures) {
          var _getTexturesWrapper = function getTextures() {
            return _getTextures.apply(this, arguments);
          };

          _getTexturesWrapper.toString = function () {
            return _getTextures.toString();
          };

          return _getTexturesWrapper;
        })(function () {
          var _this = this;

          if (this.textures) return this.textures;

          var enabledTexture = this.enabledTexture;
          var dw = enabledTexture.width / 3;
          var dh = enabledTexture.height;

          var getTextures = function (state) {
            return emptyArray(3).map(function (_, i) {
              var rect = new PIXI.Rectangle(i * dw, 0, dw, dh);
              return new PIXI.Texture(_this["" + state + "Texture"], rect);
            });
          };

          var enabled = getTextures("enabled");
          var disabled = getTextures("disabled");

          this.textures = { enabled: enabled, disabled: disabled };
          return this.textures;
        })
      },
      fire: {
        value: function fire() {
          if (!this.enabled) {
            return;
          }this.container.emit("button:clicked", this);
        }
      },
      toggleEnable: {
        value: function toggleEnable() {
          var enable = arguments[0] === undefined ? true : arguments[0];

          this.enabled = enable;
          var textures = this.getTextures()[enable ? "enabled" : "disabled"];
          zip(this.spriteParts, textures, function (part, texture) {
            part.texture = texture;
          });
        }
      },
      enable: {
        value: function enable() {
          this.toggleEnable(true);
        }
      },
      disable: {
        value: function disable() {
          this.toggleEnable(false);
        }
      }
    });

    return LevelButton;
  })();

  module.exports = LevelButton;
});