var Word = (() => {
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
    parts.reduce((map, part) => {
      map[part] = (map[part] || 0) + 1;
      return map;
    }, {});
  }

  return class Word {
    constructor(wordObj) {
      var parts = this.parts = wordObj.parts;
      this.partsCount = getPartsCount(parts);
    }

    buildsFrom(parts) {
      var partsCount = getPartsCount(parts);
      var wPartsCount = this.partsCount

      if (parts.length !== this.parts.length) return false;

      return Object.keys(wPartsCount).every(part => {
        return partsCount[part] === wPartsCount[part];
      });
    }
  }
});

export default Word;
