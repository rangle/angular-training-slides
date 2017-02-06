import {Component} from '@angular/core';
import UsersService from '../services/users.service';

@Component({
  selector: 'rio-app',
  styles: [ require('./app.css') ],
  template: `
  <ul>
    <li>
      <a>Home</a>
    </li>
    <li>
      <a>Users</a>
    </li>
  </ul>
  <div style="border: 1px solid black; padding: 10px;">
    <p> 
      Add the router-outlet directive to specify where
      your components should load.
    </p>
  </div>
  `
})
export class AppComponent {
  public userNames: any;

  constructor(private users: UsersService) {}

  ngOnInit() {
    this.userNames = this.users.getUserNames();
  }
}
