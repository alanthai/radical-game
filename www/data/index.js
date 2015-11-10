define(["exports", "module", "./levels", "./enemies", "./radicals", "./words", "./training", "./world"], function (exports, module, _levels, _enemies, _radicals, _words, _training, _world) {
  "use strict";

  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

  var levels = _interopRequire(_levels);

  var enemies = _interopRequire(_enemies);

  var radicals = _interopRequire(_radicals);

  var words = _interopRequire(_words);

  var training = _training;

  var world = _interopRequire(_world);

  module.exports = {
    world: world,
    training: training,
    levels: levels,
    enemies: enemies,
    radicals: radicals,
    words: Object.assign(words, radicals) };
});