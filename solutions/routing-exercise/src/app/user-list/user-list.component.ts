import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  public users: any;

  constructor(private UsersService: UsersService) { }

  ngOnInit() {
    this.users = this.UsersService.getUsers();
  }

}
