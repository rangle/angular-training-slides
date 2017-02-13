"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Bird = exports.Bird = function () {
  function Bird(weight, height) {
    _classCallCheck(this, Bird);

    this.weight = weight;
    this.height = height;
  }

  _createClass(Bird, [{
    key: "walk",
    value: function walk() {
      return new Promise(function (resolve, reject) {
        setTimeout(function () {
          return resolve("Bird finished walking!");
        }, 2000);
      });
    }
  }]);

  return Bird;
}();

var Penguin = exports.Penguin = function (_Bird) {
  _inherits(Penguin, _Bird);

  function Penguin(weight, height, type) {
    _classCallCheck(this, Penguin);

    var _this = _possibleConstructorReturn(this, (Penguin.__proto__ || Object.getPrototypeOf(Penguin)).call(this, weight, height));

    _this.type = type;
    return _this;
  }

  _createClass(Penguin, [{
    key: "walk",
    value: function walk() {
      return new Promise(function (resolve, reject) {
        setTimeout(function () {
          return resolve("Penguing finished walking!");
        }, 5000);
      });
    }
  }, {
    key: "swim",
    value: function swim() {
      return new Promise(function (resolve, reject) {
        setTimeout(function () {
          return resolve("Penguing finished swimming!");
        }, 2000);
      });
    }
  }]);

  return Penguin;
}(Bird);