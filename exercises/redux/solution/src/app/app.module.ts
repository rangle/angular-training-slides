import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgReduxModule, NgRedux } from 'ng2-redux';
import {
  AppComponent,
  ChildComponent
} from './app.component';
import {
  IAppState,
  rootReducer
} from '../store/index';

const createLogger = require('redux-logger');

@NgModule({
  declarations: [
    AppComponent,
    ChildComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    NgReduxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(ngRedux: NgRedux<IAppState>) {
    ngRedux.configureStore(
      rootReducer,
      {},
      [ createLogger() ]
    );
  }

}
