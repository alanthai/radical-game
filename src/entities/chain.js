import V from '../Vector';
import {getTexture} from '../assetLoader';

export default class Chain {
  constructor() {
    this.container = new PIXI.Container();
  }

  lockTo(startPos) {
    var start = V.move(new PIXI.Point(0, 0), startPos);
    var end = V.move(new PIXI.Point(0, 0), startPos);
    this.current = new PIXI.mesh.Rope(getTexture('chain'), [start, end]);

    this.container.addChild(this.current);
  }

  pop() {
    this.container.removeChild(this.current);
    this.current.destroy();
    this.current = this.container.children.slice(-1)[0];
  }

  pointCurrentTo(point) {
    var head = this.current.points.slice(-1)[0];
    V.move(head, point);
  }

  destroy() {
    this.container.destroy();
  }
};
