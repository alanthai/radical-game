var Vector = require('./Vector.js');

class GConsole {
  constructor() {
    this.pixiText = new PIXI.Text('');
    Vector.move(this.pixiText, {x: 200, y: 400});
  }

  log(text) {
    this.pixiText.text += text + '\n';
  }

  clear() {
    this.pixiText.text = '';
  }
};

module.exports = new GConsole();
