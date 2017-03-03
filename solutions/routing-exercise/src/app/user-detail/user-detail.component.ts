import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

const data = require('../users.json');

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  public user: any;
  private subscription: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.subscription = this.route.params.subscribe(params => {
      this.user = this.getUser(params['id']);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getUser(id: string) {
    return data.users.find(user => user.id === id);
  }
}
