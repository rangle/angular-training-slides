import { Injectable } from '@angular/core';

@Injectable()
export class UsersService {

  users = [{
    id: "2eifj0s",
    name: 'Iva Gamble',
    company: 'FLOTONIC',
    email: 'iva@flotonic.com'
  }, {
    id: "sj0dfj",
    name: 'Johns Pearson',
    company: 'Hyplex',
    email: 'johns@hyplex.me'
  }, {
    id: "vn0ekj",
    name: 'Jane Simmons',
    company: 'Geoform',
    email: 'Jane@geoform.me'
  }, {
    id: "f02jfi",
    name: 'John Doe',
    company: 'Flotonic',
    email: 'john@flotonic.com'
  }]

  getUsers() {
    return this.users;
  }

  getUser(id) {
    return this.users.find(user => user.id == id);
  }
}
