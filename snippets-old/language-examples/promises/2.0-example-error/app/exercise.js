'use strict';
'format es6'; // force SystemJS to transpile exercise

const exampleDiv = document.getElementById('example');

exampleDiv.innerHTML = 'Waiting for promise to resolve';

new Promise((resolve, reject) => {
  setTimeout(() => reject(new Error('Fail case')), 5000);
}).then(outputText)
  .catch(outputError);

function outputText(text) {
  exampleDiv.innerHTML = text;
}

function outputError(err) {
  exampleDiv.innerHTML = err.message;
}
