"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var es6_promise_1 = require("es6-promise");
var Hedgehog = (function () {
    function Hedgehog(color, weight) {
        this.color = color;
        this.weight = weight;
    }
    Hedgehog.prototype.run = function () {
        return new es6_promise_1.Promise(function (resolve, reject) {
            setTimeout(function () { return resolve('Hedgehog has finished running'); }, 3000);
        });
    };
    return Hedgehog;
}());
exports.Hedgehog = Hedgehog;
var Sonic = (function (_super) {
    __extends(Sonic, _super);
    function Sonic(color, weight, numberOfRings) {
        var _this = _super.call(this, color, weight) || this;
        _this.rings = numberOfRings;
        return _this;
    }
    Sonic.prototype.run = function () {
        return new es6_promise_1.Promise(function (resolve, reject) {
            setTimeout(function () { return resolve('Sonic has finished running'); }, 500);
        });
    };
    Sonic.prototype.getRings = function () {
        return "Sonic has " + this.rings + " " + (this.rings === 1 ? 'ring' : 'rings');
    };
    return Sonic;
}(Hedgehog));
exports.Sonic = Sonic;
