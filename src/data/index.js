import levels from './levels';
import enemies from './enemies';
import radicals from './radicals';
import words from './words';

export default {
  levels,
  enemies,
  radicals,
  words: Object.assign(words, radicals)
};
