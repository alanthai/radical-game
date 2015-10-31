var levels = require('./levels');
var enemies = require('./enemies');
var radicals = require('./radicals');
var words = require('./words');

module.exports = {
  levels,
  enemies,
  radicals,
  words: Object.assign(words, radicals)
};
