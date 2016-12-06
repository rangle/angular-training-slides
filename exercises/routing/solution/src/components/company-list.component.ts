import {Component, Input} from '@angular/core';

@Component({
  selector: 'company-list',
  template: `
  <ul>
    <li *ngFor="let company of companies">
      <a [routerLink]="[company]">
        {{company}}
      </a>
    </li>
  </ul>
  `
})
export default class CompanyList {
  @Input() companies:any;

  constructor() {}
}
