'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _birds = require('./birds.js');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

(function () {
  var birdDetails = [[3], [6, 'Emperor'], [4, 'King']];

  var birdList = birdDetails.map(function (args) {
    if (args.length > 1) {
      return new (Function.prototype.bind.apply(_birds.Penguin, [null].concat(_toConsumableArray(args))))();
    } else {
      return new (Function.prototype.bind.apply(_birds.Bird, [null].concat(_toConsumableArray(args))))();
    }
  });

  var _birdList = _slicedToArray(birdList, 3),
      bird = _birdList[0],
      emperorPenguin = _birdList[1],
      kingPenguin = _birdList[2];

  console.log('bird track meet starts ' + new Date().toTimeString());
  Promise.race([bird.walk(), emperorPenguin.walk()]).then(function (value) {
    console.log(value + ', race1 over! ' + new Date().toTimeString());
    return Promise.all([kingPenguin.walk(), emperorPenguin.walk()]);
  }).then(function (values) {
    return values.forEach(function (value) {
      return console.log(value + " race2 over! " + new Date().toTimeString());
    });
  });
})();