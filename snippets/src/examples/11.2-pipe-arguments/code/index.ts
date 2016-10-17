import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  template: `{{ accountBalance | currency:'CAD':true:'1.2-2' }}`,
})
export class AppComponent {
  accountBalance = 13.1234567;
}
