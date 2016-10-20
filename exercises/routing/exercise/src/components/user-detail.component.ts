import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router'; // step 2
import Users from '../services/users.service';

@Component({
  selector: 'user-detail',
  template: `
  <label>First Name: </label> {{user?.name?.first}} <br/>
  <label>Last Name: </label> {{user?.name?.last}} <br/>
  <label>Email: </label> {{user.email}}
  `
})
export default class UserDetail {
  public user: any;
  private subscription: any; // step 2

  // constructor(private usersService: Users /*, load route service */) {}
  constructor(private usersService: Users, private route: ActivatedRoute ) {}

  ngOnInit() {
    // // Set correct user id from the router params
    // const userId = '56b35c39533e5e7b8765c36b';
    // this.user = this.usersService.getUserById(userId);

    // step 2
    this.subscription = this.route.params.subscribe(params => {
      this.user = this.usersService.getUserById(params['id']);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}