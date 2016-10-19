import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component";
import {
  CarComponent,
  CarBodyComponent,
  CarTireComponent,
  CarEngineComponent } from "../car";

@NgModule({
  imports: [BrowserModule],
  declarations: [
    AppComponent,
    CarComponent,
    CarBodyComponent,
    CarTireComponent,
    CarEngineComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
