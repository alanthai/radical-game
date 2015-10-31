import data from './data/index';
import {deepClone, deepEquals} from './util';

var dataWords = deepClone(data.words);

/**
 * `partsCount` is a dictionary that holds the parts and its count.
 * It's used when verifying whether all parts
 */
function getPiecesCount(parts) {
  return parts.reduce((map, part) => {
    map[part] = (map[part] || 0) + 1;
    return map;
  }, {});
}

function arraysMatch(a1, a2) {
  if (a1.length != a2.length) return false;

  return a1.every((e, i) => e === a2[i]);
}

export default class Word {
  constructor(data, variant) {
    this.data = data;
    this.variant = variant;
  }

  buildsFrom(pieces, variant) {
    variant = variant || this.variant;

    if (!variant) {
      return ['chinese', 'english', 'pinyin', 'parts']
        .some(varnt => this.buildFrom(parts, varnt));
    }

    // ordered match
    // return arraysMatch(this.getPieces(variant), pieces);

    var wPiecesCount = getPiecesCount(this.getPieces(variant));
    var piecesCount = getPiecesCount(pieces);

    return deepEquals(wPiecesCount, piecesCount);
  }

  getPieces(variant) {
    variant = variant || this.variant;
    return [].concat(this.data[variant] || []);
  }
};
