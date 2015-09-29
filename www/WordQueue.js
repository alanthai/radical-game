"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var WordQueue = (function () {
  var wordObjs = [{
    english: "eighty-eight",
    chinese: "八八",
    parts: [{ english: "eight", chinese: "八" }, { english: "eight", chinese: "八" }]
  }, {
    english: "twenty-two",
    chinese: "二二",
    parts: [{ english: "two", chinese: "二" }, { english: "two", chinese: "二" }]
  }];

  return (function () {
    function WordQueue() {
      var level = arguments[0] === undefined ? 1 : arguments[0];

      _classCallCheck(this, WordQueue);

      this.loadLevel(level);
    }

    _createClass(WordQueue, {
      loadLevel: {
        value: function loadLevel(level) {
          this.level = level;
          this.index = -1;
        }
      },
      "new": {
        value: function _new() {
          var word = getRandom(wordObjs);
          return [new Enemy(word, this.level), new WordpartSet(word, 6)];
        }
      }
    });

    return WordQueue;
  })();
})();