import {Component, Input} from '@angular/core';
import UsersService from '../services/users.service';

@Component({
  selector: 'rio-company-list',
  template: `
  <ul>
    <li *ngFor="let company of companies">{{company}}</li>
  </ul>
  `,
})
export default class CompanyListComponent {
  @Input() companies: any;

  constructor(private usersService: UsersService) {}

  ngOnInit() {
    this.companies = this.usersService.getCompanyNames();
  }
}
