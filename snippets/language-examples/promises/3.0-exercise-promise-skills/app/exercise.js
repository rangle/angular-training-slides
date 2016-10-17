'use strict';
'format es6'; // force SystemJS to transpile exercise

const exampleDiv = document.getElementById('example');

exampleDiv.innerHTML = 'Waiting for promise to resolve';

/**
 *  Write two promises that resolve
 *
 *  - the first should resolve after 2 seconds
 *  - the second should resolve 3 seconds after the first promise
 *  - try and write one promise chain
 */

function outputText(text) {
  exampleDiv.innerHTML = text;
}

function outputError(err) {
  exampleDiv.innerHTML = err.message;
}
