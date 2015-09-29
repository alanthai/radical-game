// import Wordpart from './entities/wordpart.js';
import WordpartSet from './WordpartSet.js';
import Vector from './Vector.js';
import gconsole from './GConsole.js';
import WordQueue from './WordQueue.js';
  
(() => {
  'use strict';

  // New instance of a pixi stage
  var stage = new PIXI.Container();

  var dimensions = [1000, 800]; // width, height
  var backgroundColor = 0x888888;
  var renderer = PIXI.autoDetectRenderer(...dimensions, {backgroundColor});

  document.body.appendChild(renderer.view);

  class WordManager {
    constructor(level) {
      this.level = level;
      this.container = new PIXI.Container();

      this.queue = new WordQueue(level);

      this.generateNewWord = this.generateNewWord.bind(this);
      this.generateNewWord();
    }

    generateNewWord() {
      if (this.wordpartSet) {
        this.container.removeChild(this.wordpartSet.container);
        this.container.removeChild(this.enemy.container);
        this.wordpartSet.container.destroy();
      }

      [this.enemy, this.wordpartSet] = this.queue.new();
      this.container.addChild(this.wordpartSet.container);
      this.container.addChild(this.enemy.container);
      this.wordpartSet.container.on('word:completed', () => {
        this.wordpartSet.container.removeAllListeners();
        setTimeout(this.generateNewWord, 1000);
      });
    }
  }

  var wordMgr = new WordManager(1);

  stage.addChild(wordMgr.container);

  // var wordText = new PIXI.Text('Word: ')

  stage.addChild(gconsole.pixiText);

  function animate() {
    requestAnimationFrame(animate);

    var active = wordMgr.wordpartSet;
    var selected = active.getSelected();

    gconsole.clear();
    gconsole.log('match? ' + active.word.buildsFrom(selected));
    selected.forEach(s => gconsole.log(s.part.english));

    renderer.render(stage);
  }

  requestAnimationFrame(animate);
})();