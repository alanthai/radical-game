// automatically chain until finished training levels
// some levels don't have all
export const allVariants = [
  {learn: 'chinese', build: 'parts'},
  {learn: 'english', build: 'chinese'},
  {learn: 'english', build: 'pinyin'},
  {learn: 'chinese', build: 'pinyin'},
];

export const levels = {
  basics1: {id: 'basics1', enemies: ['dummy'], words: ['明', '月', '日', '有', '晚', '早', '时', '是', '草', '用'], unlock: 1, title: 'Sun and Moon', includeChineseFromParts: true, excludeReview: true},
  basics2: {id: 'basics2', enemies: ['dummy'], words: ['男', '力', '加', '口', '只', '另', '别', '边', '果', '田'], unlock: 2, title: 'Strength', includeChineseFromParts: true},
  basics4: {id: 'basics3', enemies: ['dummy'], words: ['女', '妈', '马', '吗', '骂', '驾', '要', '安', '按', '奶'], unlock: 4, title: 'Mother', includeChineseFromParts: true},
  basics3: {id: 'basics4', enemies: ['dummy'], words: ['好', '学', '子', '字', '孩', '孙', '孝', '季', '孝', '教'], unlock: 3, title: 'Children', includeChineseFromParts: true},
};
