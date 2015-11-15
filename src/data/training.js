// automatically chain until finished training levels
// some levels don't have all
export const allVariants = [
  {learn: 'chinese', build: 'parts'},
  {learn: 'english', build: 'chinese'},
  {learn: 'english', build: 'pinyin'},
  {learn: 'chinese', build: 'pinyin'},
];

export const levels = {
  basics1: {id: 'basics1', title: 'Basics I', enemies: ['dummy'], words: ['明', '月', '日', '有', '晚', '早', '时', '是', '女', '男'], unlock: 1, includeChineseFromParts: true, excludeReview: true},
  basics2: {id: 'basics2', title: 'Basics II', enemies: ['dummy'], words: ['明', '月', '日', '有', '晚', '早', '时', '是', '女', '男'], unlock: 2, includeChineseFromParts: true},
  basics3: {id: 'basics3', title: 'Basics III', enemies: ['dummy'], words: ['明', '月', '日', '有', '晚', '早', '时', '是', '女', '男'], unlock: 3, includeChineseFromParts: true},
};
