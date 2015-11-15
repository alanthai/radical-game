define(["exports", "../layout"], function (exports, _layout) {
  "use strict";

  var _slicedToArray = function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; for (var _iterator = arr[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) { _arr.push(_step.value); if (i && _arr.length === i) break; } return _arr; } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } };

  var _toConsumableArray = function (arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } };

  var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

  var enemyInfo = _layout.enemyInfo;

  var EnemyInfo = (function () {
    function EnemyInfo(enemy, _ref) {
      var _description$position;

      var hideHealthbar = _ref.hideHealthbar;
      var hideFleeCounter = _ref.hideFleeCounter;

      _classCallCheck(this, EnemyInfo);

      this.enemy = enemy;
      var layout = layout.enemyInfo;

      var container = this.container = new PIXI.Container();

      if (!hideHealthbar) {
        this.initHealthbar(layout.healthbar);
      }

      // if (!hideFleeCounter) {
      //   var fleeCounter = this.fleeCounter = new PIXI.Container();
      //   fleeCounter.position.set(...enemyInfo.fleeCounter);
      //   container.addChild();
      // }

      // init enemy description
      var description = this.description = new PIXI.Text(enemy.get("name"));
      (_description$position = description.position).set.apply(_description$position, _toConsumableArray(enemyInfo.description));
      container.addChild(description);

      this.initEventListeners();
    }

    _createClass(EnemyInfo, {
      initHealthbar: {
        value: function initHealthbar(_ref) {
          var _healthbar$position;

          var containerWidth = _ref.containerWidth;
          var containerBackground = _ref.containerBackground;
          var background = _ref.background;
          var position = _ref.position;
          var dimensions = _ref.dimensions;

          var _dimensions = _slicedToArray(dimensions, 2);

          var w = _dimensions[0];
          var h = _dimensions[1];

          var rectParams = [-w / 2, -h / 2, w, h];

          this.currentHp = enemy.get("health");
          this.maxWidth = w;

          var healthbar = this.healthbar = new PIXI.Graphics();
          healthbar.beginFill(containerBackground);
          healthbar.lineStyle(containerWidth, 0);
          (_healthbar$position = healthbar.position).set.apply(_healthbar$position, _toConsumableArray(position));
          healthbar.drawRect.apply(healthbar, rectParams);
          // healthbar.anchor.set(0.5);

          var currentHealth = this.currentHealth = new PIXI.Graphics();
          currentHealth.beginFill(background);
          currentHealth.drawRect.apply(currentHealth, rectParams);
          // currentHealth.anchor.set(0, 0.5);

          healthbar.addChild(currentHealth);
          container.addChild(healthbar);
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
          var currentHp = enemy.get("health");
          if (currentHp === this.currentHp) {
            return;
          } // animate healthbar
          var hpRatio = currentHp / enemy.get("maxHealth");
          this.currentHealth.width = this.healthbar.width * hpRatio;
          this.currentHp = currentHp;
        }
      },
      updateMisses: {
        value: function updateMisses() {}
      }
    });

    return EnemyInfo;
  })();
});