import V from './Vector';

class GConsole {
  constructor() {
    this.pixiText = new PIXI.Text('');
    V.move(this.pixiText, {x: 200, y: 400});
  }

  log(text) {
    this.pixiText.text += text + '\n';
  }

  clear() {
    this.pixiText.text = '';
  }
};

export default new GConsole();
