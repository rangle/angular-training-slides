import {Component} from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  template: `
  <ul>
    <li>Create two custom child components of this one</li>
    <li>Use at least one *ngIf</li>
    <li>Use at least one *ngFor</li>
    <li>Respond to a user action</li>
    <li>Ensure there is no state on the component</li>
  </ul>`
})
export class AppComponent {
  public greeting: string = "Hello, world!";
  constructor () {}
}
