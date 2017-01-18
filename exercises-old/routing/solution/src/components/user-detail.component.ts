import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import UsersService from '../services/users.service';

@Component({
  selector: 'rio-user-detail',
  template: `
  <label>First Name: </label> {{user?.name?.first}} <br/>
  <label>Last Name: </label> {{user?.name?.last}} <br/>
  <label>Email: </label> {{user?.email}}
  `
})
export default class UserDetailComponent {
  public user: any;
  private subscription: any;

  constructor(
    private usersService: UsersService,
    private route: ActivatedRoute) {}

  ngOnInit() {
    this.subscription = this.route.params.subscribe(params => {
      this.user = this.usersService.getUserById(params['id']);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
