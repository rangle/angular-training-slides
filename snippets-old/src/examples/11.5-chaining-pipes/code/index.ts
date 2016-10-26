import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  template: `{{ mockServerRequest | async | currency:'USD':true:'2.2-2' }}`,
})
export class AppComponent {
  mockServerRequest: Observable<number>;

  constructor() {
    this.mockServerRequest = Observable.create((o) => {
      setTimeout(() => o.next(13.12345), 120);
    });
  }
}
