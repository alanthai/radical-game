define(function (require, exports, module) {
  "use strict";

  var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

  var util = require("./util");
  var getValues = util.getValues;

  var Ticker = (function () {
    function Ticker() {
      _classCallCheck(this, Ticker);

      this.counter = 0;
      this.callbacks = {};
      this.now = Date.now();
    }

    _createClass(Ticker, {
      getId: {
        value: function getId() {
          var id = parseInt(Math.random() * Math.pow(10, 9));
          return !this.callbacks[id] ? id : this.getId();
        }
      },
      onTick: {
        value: function onTick(callback, scope) {
          var id = this.getId();
          this.callbacks[id] = callback.bind(scope || this);
          return id;
        }
      },
      tick: {
        value: function tick() {
          var now = Date.now();
          var diff = now - this.now;
          var counter = ++this.counter;
          getValues(this.callbacks).forEach(function (cb) {
            return cb(counter, diff);
          });
          this.now = now;
        }
      },
      removeListener: {
        value: function removeListener(id) {
          debugger;
          this.callbacks[id] = null;
        }
      },
      removeAllListeners: {
        value: function removeAllListeners() {
          debugger;
          this.callbacks = {};
        }
      }
    });

    return Ticker;
  })();

  module.exports = {
    util: util,
    data: require("./data/index"),
    ticker: new Ticker()
  };
});