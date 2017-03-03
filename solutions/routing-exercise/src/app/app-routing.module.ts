import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageListComponent } from './page-list/page-list.component';
import { HomeComponent } from './home/home.component';
import { PageDetailComponent } from './page-detail/page-detail.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'pages',
    component: PageListComponent
  },
  {
    path: 'pages/:id',
    component: PageDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
