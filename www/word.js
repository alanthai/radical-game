"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var Word = (function () {
  /**
   * `partsCount` is a dictionary that holds the parts and its count.
   * It's used when verifying whether all parts
   *
   * var word = {
   *   english: 'late',
   *   simplified: '晚',
   *   partials: ['日', '免']
   * };
   * getPartsCount(word.partials); // {'日': 1, '免': 1}
   */
  function getPartsCount(parts) {
    return parts.reduce(function (map, part) {
      map[part.chinese] = (map[part.chinese] || 0) + 1;
      return map;
    }, {});
  }

  return (function () {
    function Word(wordObj) {
      _classCallCheck(this, Word);

      var parts = this.parts = wordObj.parts;
      this.partsCount = getPartsCount(parts);
    }

    _createClass(Word, {
      buildsFrom: {
        value: function buildsFrom(parts) {
          parts = parts.map(function (p) {
            return p.part;
          });
          var partsCount = getPartsCount(parts);
          var wPartsCount = this.partsCount;

          if (parts.length !== this.parts.length) {
            return false;
          }return Object.keys(wPartsCount).every(function (part) {
            return partsCount[part] === wPartsCount[part];
          });
        }
      }
    });

    return Word;
  })();
})();