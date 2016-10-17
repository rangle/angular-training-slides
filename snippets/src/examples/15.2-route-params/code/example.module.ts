import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './';
import { routes } from './routes';
import { Component1 } from './component-1';
import { Component2 } from './component-2';
import { UsersComponent } from './users';

const routing = RouterModule.forRoot(routes);

@NgModule({
  bootstrap: [
    AppComponent,
  ],
  declarations: [
    AppComponent,
    Component1,
    Component2,
    UsersComponent,
  ],
  imports: [
    BrowserModule,
    routing,
  ],
})
export class AppModule {}
