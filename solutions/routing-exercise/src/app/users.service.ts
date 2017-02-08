import { Injectable } from '@angular/core';

const data = require('./users.json');

@Injectable()
export class UsersService {

  getUsers() {
    return data.users;
  }

  getUser(id) {
    return data.users.find(user => user.id == id);
  }
}
