define(["exports", "module", "./util", "./data/index"], function (exports, module, _util, _dataIndex) {
  "use strict";

  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

  var _slice = Array.prototype.slice;

  var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

  var util = _interopRequire(_util);

  var data = _interopRequire(_dataIndex);

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
      update: {
        value: function update() {
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
          delete this.callbacks[id];
        }
      },
      removeAllListeners: {
        value: function removeAllListeners() {
          this.callbacks = {};
        }
      }
    });

    return Ticker;
  })();

  function patchInteractionManager(renderer) {
    var me = renderer.plugins.interaction;

    function extendMethod(method, extFn) {
      var old = me[method];
      me[method] = function () {
        extFn.call.apply(extFn, [me].concat(_slice.call(arguments)));
        old.call.apply(old, [me].concat(_slice.call(arguments)));
      };
    }

    // patch addEvents
    function extendAddEvents() {
      this.interactionDOMElement.addEventListener("touchout", this.onTouchOut, true);
    };
    extendMethod("addEvents", extendAddEvents);

    // patch removeEvents
    extendMethod("removeEvents", function () {
      this.interactionDOMElement.removeEventListener("touch");
    });

    // patch destroy
    extendMethod("destroy", function () {
      this.onTouchOut = null;
    });

    // patch update
    extendMethod("update", function () {
      this.processInteractive(this.eventData.data.global, this.renderer._lastObjectRendered, this.processTouchOverOut, true);
    });

    // patch processTouchMove
    extendMethod("processTouchMove", function (displayObject, hit) {
      this.processTouchOverOut(displayObject, hit);
    });

    // create onTouchOut
    me.onTouchOut = function () {
      this.eventData.data.originalEvent = event;
      this.eventData.stopped = false;

      // Update internal reference
      this.mapPositionToPoint(this.eventData.data.global, event.clientX, event.clientY);

      this.interactionDOMElement.style.cursor = "inherit";

      this.mapPositionToPoint(this.eventData.data.global, event.clientX, event.clientY);

      this.processInteractive(this.eventData.data.global, this.renderer._lastObjectRendered, this.processTouchOverOut, false);
    };

    // create processTouchOverOut
    me.processTouchOverOut = function (displayObject, hit) {
      if (hit) {
        if (!displayObject._over) {
          displayObject._over = true;
          this.dispatchEvent(displayObject, "touchover", this.eventData);
        }

        if (displayObject.buttonMode) {
          this.cursor = displayObject.defaultCursor;
        }
      } else {
        if (displayObject._over) {
          displayObject._over = false;
          this.dispatchEvent(displayObject, "touchout", this.eventData);
        }
      }
    };

    // patch constructor
    me.onTouchOut = me.onTouchOut.bind(me);
    me.processTouchOverOut = me.processTouchOverOut.bind(me);
    extendAddEvents.call(me);
  };

  module.exports = {
    util: util,
    data: data,
    patchInteractionManager: patchInteractionManager,
    ticker: new Ticker()
  };
});