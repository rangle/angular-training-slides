import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  public user: any;
  private subscription: any;

  constructor(
    private usersService: UsersService,
    private route: ActivatedRoute) {}

  ngOnInit() {
    this.subscription = this.route.params.subscribe(params => {
      this.user = this.usersService.getUser(params['id']);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}