import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './';
import { routes } from './routes';
import { Component1 } from './component-1';
import { Component2 } from './component-2';
import { ChildComponent } from './child';
import { ChildComponent1 } from './child-component-1';
import { ChildComponent2 } from './child-component-2';

const routing = RouterModule.forRoot(routes);

@NgModule({
  bootstrap: [
    AppComponent,
  ],
  declarations: [
    AppComponent,
    ChildComponent,
    ChildComponent1,
    ChildComponent2,
    Component1,
    Component2,
  ],
  imports: [
    BrowserModule,
    routing,
  ],
})
export class AppModule {}
