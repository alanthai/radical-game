define(["exports", "module", "./levels", "./enemies", "./radicals", "./words"], function (exports, module, _levels, _enemies, _radicals, _words) {
  "use strict";

  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

  var levels = _interopRequire(_levels);

  var enemies = _interopRequire(_enemies);

  var radicals = _interopRequire(_radicals);

  var words = _interopRequire(_words);

  module.exports = {
    levels: levels,
    enemies: enemies,
    radicals: radicals,
    words: Object.assign(words, radicals)
  };
});