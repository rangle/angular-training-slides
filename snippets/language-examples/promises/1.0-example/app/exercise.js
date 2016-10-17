'use strict';
'format es6'; // force SystemJS to transpile exercise

const exampleDiv = document.getElementById('example');

exampleDiv.innerHTML = 'Waiting for promise to resolve';

new Promise((resolve) => {
  setTimeout(() => resolve('Promise has finished'), 5000);
}).then(outputText);

function outputText(text) {
  exampleDiv.innerHTML = text;
}
