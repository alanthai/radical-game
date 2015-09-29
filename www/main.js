"use strict";

var _slicedToArray = function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; for (var _iterator = arr[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) { _arr.push(_step.value); if (i && _arr.length === i) break; } return _arr; } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } };

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

(function () {
  "use strict";

  var _PIXI;

  // New instance of a pixi stage
  var stage = new PIXI.Container();

  var dimensions = [1000, 800]; // width, height
  var backgroundColor = 8947848;
  var renderer = (_PIXI = PIXI).autoDetectRenderer.apply(_PIXI, dimensions.concat([{ backgroundColor: backgroundColor }]));

  document.body.appendChild(renderer.view);

  var WordManager = (function () {
    function WordManager(level) {
      _classCallCheck(this, WordManager);

      this.level = level;
      this.container = new PIXI.Container();

      this.queue = new WordQueue(level);

      this.generateNewWord = this.generateNewWord.bind(this);
      this.generateNewWord();
    }

    _createClass(WordManager, {
      generateNewWord: {
        value: function generateNewWord() {
          var _this = this;

          if (this.wordpartSet) {
            this.container.removeChild(this.wordpartSet.container);
            this.container.removeChild(this.enemy.container);
            this.wordpartSet.container.destroy();
          }

          var _ref = this.queue["new"]();

          var _ref2 = _slicedToArray(_ref, 2);

          this.enemy = _ref2[0];
          this.wordpartSet = _ref2[1];

          this.container.addChild(this.wordpartSet.container);
          this.container.addChild(this.enemy.container);
          this.wordpartSet.container.on("word:completed", function () {
            _this.wordpartSet.container.removeAllListeners();
            setTimeout(_this.generateNewWord, 1000);
          });
        }
      }
    });

    return WordManager;
  })();

  var wordMgr = new WordManager(1);

  stage.addChild(wordMgr.container);

  // var wordText = new PIXI.Text('Word: ')

  stage.addChild(gconsole.pixiText);

  function animate() {
    requestAnimationFrame(animate);

    var active = wordMgr.wordpartSet;
    var selected = active.getSelected();

    gconsole.clear();
    gconsole.log("match? " + active.word.buildsFrom(selected));
    selected.forEach(function (s) {
      return gconsole.log(s.part.english);
    });

    renderer.render(stage);
  }

  requestAnimationFrame(animate);
})();
// import Wordpart from './entities/wordpart.js';