'use strict';
'format es6'; // force SystemJS to transpile exercise

import { Observable } from 'rxjs/Rx';

const exampleDiv = document.getElementById('example');

exampleDiv.innerHTML = 'Waiting for Observations';

const observable = Observable.create((obs) => {
  setTimeout(() => {
    obs.next({ data: 'First!' });
  }, 2000);

  setTimeout(() => {
    obs.next({ data: 'Second' });
  }, 3000);

  setTimeout(() => {
    obs.next({ data: 'Third' });
  }, 4000);

  setTimeout(() => {
    obs.complete();
  }, 5000);
});

observable
  .map((val) => val.data)
  .subscribe((val) => exampleDiv.innerHTML += '<br />' + val,
    () => null,
    () => exampleDiv.innerHTML += '<br />Observations Complete'
  );

