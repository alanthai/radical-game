define(["exports", "module", "./Vector"], function (exports, module, _Vector) {
  "use strict";

  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

  var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

  var V = _interopRequire(_Vector);

  var GConsole = (function () {
    function GConsole() {
      _classCallCheck(this, GConsole);

      this.pixiText = new PIXI.Text("");
      V.move(this.pixiText, { x: 200, y: 400 });
    }

    _createClass(GConsole, {
      log: {
        value: function log(text) {
          this.pixiText.text += text + "\n";
        }
      },
      clear: {
        value: function clear() {
          this.pixiText.text = "";
        }
      }
    });

    return GConsole;
  })();

  ;

  module.exports = new GConsole();
});