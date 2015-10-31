define(function (require, exports, module) {
  "use strict";

  var levels = require("./levels");
  var enemies = require("./enemies");
  var radicals = require("./radicals");
  var words = require("./words");

  module.exports = {
    levels: levels,
    enemies: enemies,
    radicals: radicals,
    words: Object.assign(words, radicals)
  };
});