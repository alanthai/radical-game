"use strict";

var path  = './node_modules/gulp-babel/node_modules/babel-core/lib/babel/';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var AMDFormatter = _interopRequire(require(path + "transformation/modules/_default"));

var CommonFormatter = _interopRequire(require(path + "transformation/modules/common"));

var values = function(obj) {
  return Object.keys(obj).map(function(k) {return obj[k];});
}

var t = _interopRequireWildcard(require(path + "types"));

var SimpleRequireJSFormatter = (function (_AMDFormatter) {
  function SimpleRequireJSFormatter() {
    this.init = CommonFormatter.prototype.init;

    _classCallCheck(this, SimpleRequireJSFormatter);

    if (_AMDFormatter != null) {
      _AMDFormatter.apply(this, arguments);
    }
  }

  _inherits(SimpleRequireJSFormatter, _AMDFormatter);

  /**
   * Wrap the entire body in a `define` wrapper.
   */

  SimpleRequireJSFormatter.prototype.transform = function transform(program) {
    var body = program.body;

    // build up define container

    var params = values(this.ids);
    params.unshift(t.identifier("module"));
    params.unshift(t.identifier("exports"));
    params.unshift(t.identifier("require"));

    var container = t.functionExpression(null, params, t.blockStatement(body));

    var defineArgs = [container];
    // var moduleName = this.getModuleName();
    // if (moduleName) defineArgs.unshift(t.literal(moduleName));

    var call = t.callExpression(t.identifier("define"), defineArgs);

    program.body = [t.expressionStatement(call)];
  };


  return SimpleRequireJSFormatter;
})(AMDFormatter);

module.exports = SimpleRequireJSFormatter;

// import * as bar from "foo";