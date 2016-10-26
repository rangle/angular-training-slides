'use strict';
'format es6'; // force SystemJS to transpile exercise

import { Observable } from 'rxjs/Rx';

const exampleDiv = document.getElementById('example');

exampleDiv.innerHTML = 'Waiting for Observations';

const observable = Observable.create((obs) => {
  const timeout = setTimeout(() => {
    obs.next('First!');
  }, 2000);

  return () => {
    clearTimeout(timeout);
  }
});

const observing = observable
  .subscribe((val) => exampleDiv.innerHTML += '<br />' + val,
    () => null,
    () => exampleDiv.innerHTML += '<br />Observations Complete'
  );

observing.unsubscribe();

exampleDiv.innerHTML += '<br />Unsubscribed';
