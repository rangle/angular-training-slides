"use strict";
var str = 'Hello!';
var strings = ['hello', 'how are you', 'good bye'];
var num = 5;
var numbers = [
    1, 2, 3, 4, 5, 6, 7, NaN, Infinity, -Infinity, -0,
];
var bool = false;
var booleans = [true, false, true];
var obj = { x: 10 };
var IceCreams;
(function (IceCreams) {
    IceCreams[IceCreams["Chocolate"] = 0] = "Chocolate";
    IceCreams[IceCreams["Vanilla"] = 1] = "Vanilla";
    IceCreams[IceCreams["Strawberry"] = 2] = "Strawberry";
})(IceCreams || (IceCreams = {}));
var flavour2 = 'chocolate';
var flavours2 = ['vanilla'];
var flavour = IceCreams.Chocolate;
var flavours = [IceCreams.Vanilla, IceCreams.Strawberry];
var Test = (function () {
    function Test() {
        this.value = 'initial value';
    }
    return Test;
}());
var test1 = new Test();
var tests = [new Test(), new Test()];
var test2 = { value: 'huzzah!' };
function noop() {
}
var testNoop = noop;
var testNoops = [noop, noop, noop];
var testNoops2 = [noop, noop];
var testNoops3 = [noop];
var test3 = { value: 'we are here' };
var test4 = test1;
var GameTile = (function () {
    function GameTile(occupier) {
        this.x = 0;
        this.y = 0;
        this.occupiedBy = occupier;
    }
    return GameTile;
}());
function identity(object) {
    return object;
}
var myNum = identity(5);
myNum = '5';
var myStr = identity('5');
myStr = 5;
