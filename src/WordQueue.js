var WordQueue = (() => {
  var wordObjs = [
    {
      english: 'eighty-eight',
      chinese: '八八',
      parts: [
        {english: 'eight', chinese: '八'},
        {english: 'eight', chinese: '八'}
      ]
    },
    {
      english: 'twenty-two',
      chinese: '二二',
      parts: [
        {english: 'two', chinese: '二'},
        {english: 'two', chinese: '二'}
      ]
    }
  ];

  return class WordQueue {
    constructor(level=1) {
      this.loadLevel(level);
    }

    loadLevel(level) {
      this.level = level;
      this.index = -1;
    }

    new() {
      var word = getRandom(wordObjs);
      return [new Enemy(word, this.level), new WordpartSet(word, 6)];
    }
  };
})();

export default WordQueue;
