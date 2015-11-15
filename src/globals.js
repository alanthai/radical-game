import util from './util';
import data from './data/index';

var getValues = util.getValues;

class Ticker {
  constructor() {
    this.counter = 0
    this.callbacks = {};
    this.now = Date.now();
  }

  getId() {
    var id = parseInt(Math.random() * Math.pow(10, 9));
    return !this.callbacks[id]
      ? id
      : this.getId();
  }

  onTick(callback, scope) {
    var id = this.getId();
    this.callbacks[id] = callback.bind(scope || this);
    return id;
  }

  tick() {
    var now = Date.now();
    var diff = now - this.now;
    var counter = ++this.counter;
    getValues(this.callbacks).forEach(cb => cb(counter, diff));
    this.now = now;
  }

  removeListener(id) {
    delete this.callbacks[id];
  }

  removeAllListeners() {
    this.callbacks = {};
  }
}

export default {
  util,
  data,
  ticker: new Ticker()
};
