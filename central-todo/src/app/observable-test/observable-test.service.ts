import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class TestService {

  counter = 1;
  subject = new Subject();
  interval;

  getObservable(): Subject<number> {
    return this.subject;
  }

  start() {
    this.interval = setInterval(() => {
      this.counter = this.counter * 2;
      this.subject.next(this.counter);
    }, 500);
  }

  stop() {
    clearInterval(this.interval);
  }
}