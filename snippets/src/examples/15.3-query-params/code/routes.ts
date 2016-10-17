import { Routes } from '@angular/router';
import { Component1 } from './component-1';
import { Component2 } from './component-2';
import { UsersComponent } from './users';

export const routes: Routes = [
  { path: '', redirectTo: 'component-1', pathMatch: 'full' },
  { path: 'component-1', component: Component1 },
  { path: 'component-2', component: Component2 },
  { path: 'users/:id', component: UsersComponent },
  { path: '**', component: Component1 },
];
