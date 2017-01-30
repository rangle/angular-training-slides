import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <h2>My Simple Component</h2>
    <p>{{ getMessage() + ' here' }}</p>
  `
})
export class AppComponent {
  getMessage(): string {
    return 'Insert a dummy message';
  }
}
