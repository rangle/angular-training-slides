import {Component} from '@angular/core';
import Users from '../services/users.service';

@Component({
  selector: 'company-list',
  template: `
  <ul>
    <li *ngFor="let company of companies">{{company}}</li>
  </ul>
  `,
})
export default class CompanyList {
  public companies: any;

  constructor(private usersService: Users) {}

  ngOnInit() {
    this.companies = this.usersService.getCompanyNames();
  }
}
