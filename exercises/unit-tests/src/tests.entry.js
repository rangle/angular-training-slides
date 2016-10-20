"use strict";
require('babel-polyfill');
require('core-js/es6');
require('core-js/es7/reflect');
require('ts-helpers');
require('reflect-metadata');
require('zone.js/dist/zone');
require('zone.js/dist/sync-test');
require('zone.js/dist/async-test');
require('zone.js/dist/fake-async-test');
require('zone.js/dist/proxy');
require('zone.js/dist/jasmine-patch');
var testContext = require
    .context('./', true, /^(.(?!tests\.entry))*\.ts$/);
testContext('./main.ts');
testContext.keys().forEach(function (key) {
    if (/\.spec\.ts$/.test(key)) {
        testContext(key);
    }
});
