import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import Users from '../services/users.service';

@Component({
  selector: 'users-users-container',
  template: `
    <user-list [users]="users"></user-list>`
})
export default class UsersList {
  public users: any;
  private subscription: any;

  constructor(private usersService: Users, private route: ActivatedRoute) {}

  ngOnInit() {
    this.subscription = this.route.params.subscribe(params => {
      this.users = this.usersService.getUsersByCompany(params['companyName']);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
