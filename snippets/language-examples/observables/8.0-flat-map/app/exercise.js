'use strict';
'format es6'; // force SystemJS to transpile exercise

import { Observable } from 'rxjs/Rx';

const exampleDiv = document.getElementById('example');

const inputObserver = Observable.create((obs) => {
  const input = document.getElementById('inputText')

  const listener = () => obs.next(input.value);

  input.addEventListener('keyup', listener);

  return () => {
    input.removeEventListener('keyup', listener);
  }
});

function createDelayObserver(text) {
  return Observable.create((obs) => {
    const timeout = setTimeout(() => obs.next(text), 2000);

    () => {
      clearTimeout(timeout);
    }
  });
}

inputObserver
  .flatMap(createDelayObserver)
  .subscribe((data) => {
    exampleDiv.innerHTML += '<br />' + data;
  });

exampleDiv.innerHTML = 'Waiting for Observations';
