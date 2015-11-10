import levels from './levels';
import enemies from './enemies';
import radicals from './radicals';
import words from './words';
import * as training from './training';
import world from './world';

export default {
  world,
  training,
  levels,
  enemies,
  radicals,
  words: Object.assign(words, radicals),
};
