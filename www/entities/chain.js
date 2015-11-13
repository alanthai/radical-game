define(["exports", "module", "../Vector", "../assetLoader"], function (exports, module, _Vector, _assetLoader) {
  "use strict";

  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

  var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

  var V = _interopRequire(_Vector);

  var getTexture = _assetLoader.getTexture;

  var Chain = (function () {
    function Chain() {
      _classCallCheck(this, Chain);

      this.container = new PIXI.Container();
    }

    _createClass(Chain, {
      lockTo: {
        value: function lockTo(startPos) {
          var start = V.move(new PIXI.Point(0, 0), startPos);
          var end = V.move(new PIXI.Point(0, 0), startPos);
          this.current = new PIXI.mesh.Rope(getTexture("chain"), [start, end]);

          this.container.addChild(this.current);
        }
      },
      pop: {
        value: function pop() {
          this.container.removeChild(this.current);
          this.current.destroy();
          this.current = this.container.children.slice(-1)[0];
        }
      },
      pointCurrentTo: {
        value: function pointCurrentTo(point) {
          var head = this.current.points.slice(-1)[0];
          V.move(head, point);
        }
      },
      destroy: {
        value: function destroy() {
          this.container.destroy();
        }
      }
    });

    return Chain;
  })();

  module.exports = Chain;
});