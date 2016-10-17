import {Component} from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public greeting: string = "Hello, world!";
  constructor () {}
}
