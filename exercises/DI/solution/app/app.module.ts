import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component";
import {
  CarComponent,
  CarBodyComponent,
  CarTireComponent,
  CarEngineComponent,
  CarPricingService } from "../car";

@NgModule({
  imports: [BrowserModule],
  declarations: [
    AppComponent,
    CarComponent,
    CarBodyComponent,
    CarTireComponent,
    CarEngineComponent
  ],
  providers: [ CarPricingService ],
  bootstrap: [AppComponent]
})
export class AppModule {}
