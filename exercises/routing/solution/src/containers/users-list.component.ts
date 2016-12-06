import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import UsersService from '../services/users.service';

@Component({
  selector: 'rio-users-list',
  template: `
    <rio-user-list [users]="users"></rio-user-list>`
})
export default class UsersListComponent {
  public users: any;
  private subscription: any;

  constructor(private usersService: UsersService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.subscription = this.route.params.subscribe(params => {
      this.users = this.usersService.getUsersByCompany(params['companyName']);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
