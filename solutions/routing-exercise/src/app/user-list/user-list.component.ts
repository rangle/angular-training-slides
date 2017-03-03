import { Component, OnInit } from '@angular/core';

const data = require('../users.json');

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  public users: any;

  constructor() { }

  ngOnInit() {
    this.users = data.users;
  }
}
