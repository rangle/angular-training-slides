import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  template: `{{ accountBalance | currency }}`,
})
export class AppComponent {
  accountBalance = 13.1234567;
}
