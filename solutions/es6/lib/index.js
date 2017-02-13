'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _birds = require('./birds.js');

var birds = _interopRequireWildcard(_birds);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

(function main() {
  var birdDetails = [[3, 3], [6, 6, 'Emperor'], [5, 5, 'King'], [2, 2]];

  var birdList = birdDetails.map(function (args) {
    if (args.length > 2) {
      return new (Function.prototype.bind.apply(birds.Penguin, [null].concat(_toConsumableArray(args))))();
    } else {
      return new (Function.prototype.bind.apply(birds.Bird, [null].concat(_toConsumableArray(args))))();
    }
  });

  var _birdList = _slicedToArray(birdList, 4),
      bird = _birdList[0],
      penguin = _birdList[1],
      penguin2 = _birdList[2],
      bird2 = _birdList[3];

  var race = Promise.race([bird.walk(), penguin.walk()]).then(function (value) {
    return console.log(value);
  }).then(function () {
    return console.log("race over! relay time!");
  });
  var wait = Promise.all([bird.walk(), penguin.walk()]).then(function (value) {
    return console.log(value);
  });
})();