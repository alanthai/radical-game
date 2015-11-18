define(["exports", "module", "../layout", "../util", "../assetLoader"], function (exports, module, _layout, _util, _assetLoader) {
  "use strict";

  var _slicedToArray = function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; for (var _iterator = arr[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) { _arr.push(_step.value); if (i && _arr.length === i) break; } return _arr; } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } };

  var _toConsumableArray = function (arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } };

  var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

  var layoutEnemyInfo = _layout.enemyInfo;
  var emptyArray = _util.emptyArray;
  var getTexture = _assetLoader.getTexture;

  var EnemyInfo = (function () {
    function EnemyInfo(enemy) {
      var _description$position;

      var _ref = arguments[1] === undefined ? {} : arguments[1];

      var hideHealthbar = _ref.hideHealthbar;
      var hideFleeCounter = _ref.hideFleeCounter;

      _classCallCheck(this, EnemyInfo);

      this.enemy = enemy;

      var container = this.container = new PIXI.Container();

      this.initHealthbar(hideHealthbar);
      this.initFleeCounter(hideFleeCounter);

      // init enemy description
      var description = this.description = new PIXI.Text(enemy.get("name"));
      (_description$position = description.position).set.apply(_description$position, _toConsumableArray(layoutEnemyInfo.description));
      description.anchor.set(0.5);
      container.addChild(description);

      this.initEventListeners();
    }

    _createClass(EnemyInfo, {
      initHealthbar: {
        value: function initHealthbar(hideHealthbar) {
          var _healthbar$position;

          var _layoutEnemyInfo$healthbar = layoutEnemyInfo.healthbar;
          var containerWidth = _layoutEnemyInfo$healthbar.containerWidth;
          var containerBackground = _layoutEnemyInfo$healthbar.containerBackground;
          var background = _layoutEnemyInfo$healthbar.background;
          var position = _layoutEnemyInfo$healthbar.position;
          var dimensions = _layoutEnemyInfo$healthbar.dimensions;

          var _dimensions = _slicedToArray(dimensions, 2);

          var w = _dimensions[0];
          var h = _dimensions[1];

          var rectParams = [-w / 2, -h / 2, w, h];

          this.currentHp = this.enemy.get("health");

          var healthbar = this.healthbar = new PIXI.Graphics();
          healthbar.beginFill(containerBackground);
          healthbar.lineStyle(containerWidth, 0);
          (_healthbar$position = healthbar.position).set.apply(_healthbar$position, _toConsumableArray(position));
          healthbar.drawRect.apply(healthbar, rectParams);

          var currentHealth = this.currentHealth = new PIXI.Graphics();
          currentHealth.beginFill(background);
          currentHealth.drawRect.apply(currentHealth, rectParams);

          healthbar.addChild(currentHealth);

          if (!hideHealthbar) {
            this.container.addChild(healthbar);
          }
        }
      },
      initFleeCounter: {
        value: function initFleeCounter(hideFleeCounter) {
          var _layoutEnemyInfo$fleeCounter = layoutEnemyInfo.fleeCounter;
          var position = _layoutEnemyInfo$fleeCounter.position;
          var circleParams = _layoutEnemyInfo$fleeCounter.circleParams;
          var circleYOffset = _layoutEnemyInfo$fleeCounter.circleYOffset;

          var fleeCounter = this.fleeCounter = new PIXI.Container();
          fleeCounter.position.set(0, 0);

          var maxMisses = this.enemy.get("maxMisses");
          this.missSprites = emptyArray(maxMisses).map(function (_, i) {
            var _fleeCounter$position;

            var base = new PIXI.Graphics();

            var _circleParams = _slicedToArray(circleParams, 3);

            var x = _circleParams[0];
            var y = _circleParams[1];
            var r = _circleParams[2];

            var fleeIcon = base.fleeIcon = new PIXI.Sprite(getTexture("flee"));
            fleeIcon.anchor.set(0.5);
            fleeIcon.position.y = y + i * circleYOffset;
            base.addChild(fleeIcon);

            (_fleeCounter$position = fleeCounter.position).set.apply(_fleeCounter$position, _toConsumableArray(position));
            fleeCounter.addChild(base);
            return base;
          });

          if (!hideFleeCounter) {
            this.updateMisses();
            this.container.addChild(fleeCounter);
          }
        }
      },
      initEventListeners: {
        value: function initEventListeners() {
          var _this = this;

          this.enemy.container.on("enemy:hurt", function () {
            return _this.updateHealth();
          });
          this.enemy.container.on("enemy:died", function () {
            return _this.updateHealth();
          });
          this.enemy.container.on("enemy:missed", function () {
            return _this.updateMisses();
          });
        }
      },
      updateHealth: {
        value: function updateHealth() {
          var enemy = this.enemy;
          var currentHp = enemy.get("health");
          if (currentHp === this.currentHp) {
            return;
          } // animate healthbar
          var hpRatio = currentHp / enemy.get("maxHealth");
          this.currentHealth.scale.x = hpRatio;
          this.currentHealth.x = (hpRatio - 1) * this.healthbar.width / 2;
          this.currentHp = currentHp;
        }
      },
      updateMisses: {
        value: function updateMisses() {
          var misses = this.enemy.get("misses");
          var _layoutEnemyInfo$fleeCounter = layoutEnemyInfo.fleeCounter;
          var activeColor = _layoutEnemyInfo$fleeCounter.activeColor;
          var inactiveColor = _layoutEnemyInfo$fleeCounter.inactiveColor;
          var circleParams = _layoutEnemyInfo$fleeCounter.circleParams;
          var circleYOffset = _layoutEnemyInfo$fleeCounter.circleYOffset;

          this.missSprites.forEach(function (sprite, i) {
            var enable = i < misses;
            sprite.fleeIcon.alpha = ~ ~enable;
            sprite.clear();
            sprite.beginFill(enable ? activeColor : inactiveColor);

            var _circleParams$slice = circleParams.slice();

            var _circleParams$slice2 = _slicedToArray(_circleParams$slice, 3);

            var x = _circleParams$slice2[0];
            var y = _circleParams$slice2[1];
            var r = _circleParams$slice2[2];

            sprite.drawCircle(x, y + i * circleYOffset, r);
          });
        }
      }
    });

    return EnemyInfo;
  })();

  module.exports = EnemyInfo;
});