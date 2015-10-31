var toString = Object.prototype.toString;

function isObject(o) {
  return toString.call(o) === '[object Object]';
}

export default {
  // Do not use this on objects with circular reference!
  deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
  },

  isObject,

  deepEquals(o1, o2) {
    var keys1 = Object.keys(o1);

    if (keys1.length !== Object.keys(o2).length) return false;

    return keys1.every(key => {
      var v1 = o1[key];
      var v2 = o2[key];
      if (isObject(v1) && isObject(v2)) return deepEquals(v1, v2);
      return v1 === v2;
    });
  },

  shuffle(array) {
    for (let i = 0, len = array.length; i < len; i++) {
      let rnd = Math.floor(Math.random() * (len - 1));
      [array[rnd], array[i]] = [array[i], array[rnd]];
    }
    return array;
  },

  getValues(object) {
    return Object.keys(object).map(key => object[key]);
  },

  getRandom(array) {
    return array[Math.floor(Math.random() * array.length)];
  },

  extend(dest, src) {
    return Object.keys(src).reduce((obj, key) => {
      obj[key] = src[key];
      return obj;
    }, dest);
  }
};
