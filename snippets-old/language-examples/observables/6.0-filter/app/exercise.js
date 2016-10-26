'use strict';
'format es6'; // force SystemJS to transpile exercise

import { Observable } from 'rxjs/Rx';

const exampleDiv = document.getElementById('example');

exampleDiv.innerHTML = 'Waiting for Observations';

const observable = Observable.create((obs) => {
  setTimeout(() => {
    obs.next('First!');
  }, 2000);

  setTimeout(() => {
    obs.next('Second');
  }, 3000);

  setTimeout(() => {
    obs.next('Third');
  }, 4000);

  setTimeout(() => {
    obs.complete();
  }, 5000);
});

observable
  .subscribe((val) => exampleDiv.innerHTML += '<br />' + val,
    () => null,
    () => exampleDiv.innerHTML += '<br />Observations Complete'
  );

