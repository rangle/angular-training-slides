import { Routes } from '@angular/router';
import { Component1 } from './component-1';
import { Component2 } from './component-2';
import { ChildComponent } from './child';
import { ChildComponent1 } from './child-component-1';
import { ChildComponent2 } from './child-component-2';

export const routes: Routes = [
  { path: '', redirectTo: 'component-1', pathMatch: 'full' },
  { path: 'component-1', component: Component1 },
  { path: 'component-2', component: Component2 },
  { path: 'child', component: ChildComponent, children: [
    { path: '', redirectTo: 'child-component-1', pathMatch: 'full' },
    { path: 'child-component-1', component: ChildComponent1 },
    { path: 'child-component-2', component: ChildComponent2 },
  ]},
  { path: '**', component: Component1 },
];
