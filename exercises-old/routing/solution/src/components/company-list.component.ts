import {Component, Input} from '@angular/core';

@Component({
  selector: 'rio-company-list',
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
export default class CompanyListComponent {
  @Input() companies:any;

  constructor() {}
}
