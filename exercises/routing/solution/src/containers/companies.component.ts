import {Component} from '@angular/core';
import Users from '../services/users.service';

@Component({
  selector: 'companies-home',
  template: 'Select company name to display users'
})
export class CompaniesHome {}

@Component({
  selector: 'companies',
  template: `
  <div style="border: 1px solid black; padding: 10px; display: flex">
    <div style="width: 40%">
      <company-list [companies]="companies"></company-list>
    </div>
    <div style="flex: 1">
      <router-outlet></router-outlet>
    </div>

  </div>
  `
})
export class Companies {
  public companies:any;

  constructor(private users: Users) {}

  ngOnInit() {
    this.companies = this.users.getCompanyNames();
  }
}

