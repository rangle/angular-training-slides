import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  template: `{{ mockServerRequest | async }}`,
})
export class AppComponent {
  mockServerRequest: Observable<string>;

  constructor() {
    this.mockServerRequest = Observable.create((o) => {
      setTimeout(() => o.next('Request eventually resolves'), 2000);
    });
  }
}
