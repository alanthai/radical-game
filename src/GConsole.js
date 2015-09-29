var GConsole = (() => {
  return class GConsole {
    constructor() {
      this.pixiText = new PIXI.Text('');
      Vector.move(this.pixiText, {x: 500, y: 500});
    }

    log(text) {
      this.pixiText.text += text + '\n';
    }

    clear() {
      this.pixiText.text = '';
    }
  };
})();

var gconsole = new GConsole();
export default gconsole;
