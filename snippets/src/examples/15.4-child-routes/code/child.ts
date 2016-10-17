import {Component} from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'child',
  template: `Child Routes: 
    <a [routerLink]="['child-component-1']">Child Component 1</a>
    <a [routerLink]="['child-component-2']">Child Component 2</a>
    <a [routerLink]="['/component-2']">(parent) Component 2</a>
    <router-outlet></router-outlet>`,
})
export class ChildComponent { }
