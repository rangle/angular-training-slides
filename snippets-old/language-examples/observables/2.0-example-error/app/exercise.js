'use strict';
'format es6'; // force SystemJS to transpile exercise

import { Observable } from 'rxjs/Rx';

const exampleDiv = document.getElementById('example');

exampleDiv.innerHTML = 'Waiting for Observations';

const observable = Observable.create((obs) => {
  setTimeout(() => {
    obs.next('Hello World');
  }, 2000);

  setTimeout(() => {
    obs.error(new Error('An error occured'));
  }, 3000);

  setTimeout(() => {
    obs.complete();
  }, 5000);
});

observable.subscribe((val) => {
  exampleDiv.innerHTML += '<br />' + val;
}, (err) => {
  exampleDiv.innerHTML += '<br />' + err.message;
}, () => {
  exampleDiv.innerHTML += '<br />' + 'Observations Complete';
});

