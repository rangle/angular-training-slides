import {Component} from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  template: `
    <a [routerLink]="['/component-1']">Component 1</a>
    <a [routerLink]="['/component-2']">Component 2</a>
    <a [routerLink]="['/child']">Child</a>
    <router-outlet></router-outlet>
`,
})
export class AppComponent {
}
