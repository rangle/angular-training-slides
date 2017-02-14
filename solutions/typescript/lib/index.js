"use strict";
var hedgehogs = require("./hedgehogs");
var es6_promise_1 = require("es6-promise");
(function main() {
    // TS compile errors - uncomment to see compile failure
    // const hedgehog: hedgehogs.Hedgehog = new hedgehogs.Hedgehog(false, "five pounds");
    // const sonic: hedgehogs.Sonic = new hedgehogs.Sonic("blue", "10", "100");
    // TS successful compile
    var hedgehog = new hedgehogs.Hedgehog('brown', 5);
    var sonic = new hedgehogs.Sonic('blue', 10, 100);
    es6_promise_1.Promise.race([hedgehog.run(), sonic.run()])
        .then(function (value) { return console.log(value); })
        .then(function () { return console.log("race over!"); });
    ;
})();
