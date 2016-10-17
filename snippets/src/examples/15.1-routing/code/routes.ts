import { Routes } from '@angular/router';
import { Component1 } from './component-1';
import { Component2 } from './component-2';

export const routes: Routes = [
  { path: '', redirectTo: 'component-1', pathMatch: 'full' },
  { path: 'component-1', component: Component1 },
  { path: 'component-2', component: Component2 },
  { path: '**', component: Component1 },
];
