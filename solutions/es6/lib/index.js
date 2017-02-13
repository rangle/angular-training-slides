'use strict';

var _birds = require('./birds.js');

var birds = _interopRequireWildcard(_birds);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

(function main() {
  var birdList = ['Emperor', 'King', 'Little', ''];
  var bird = new birds.Bird(5, 5);
  var penguin = new birds.Penguin(6, 6, "Emperor");

  var race = Promise.race([bird.walk(), penguin.walk()]).then(function (value) {
    return console.log(value);
  }).then(function () {
    return console.log("race over! relay time!");
  });
  var wait = Promise.all([bird.walk(), penguin.walk()]).then(function (value) {
    return console.log(value);
  });
})();