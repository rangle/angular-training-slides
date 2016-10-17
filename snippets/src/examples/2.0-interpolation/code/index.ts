import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `{{ hello }}`,
  styles: [``]
})
export class AppComponent {
  hello = 'Hello and welcome to an interpolated world';
}
