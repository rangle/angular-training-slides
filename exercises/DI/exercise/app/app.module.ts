import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component";
import { CarComponent } from "./car.component";

@NgModule({
  imports: [BrowserModule],
  declarations: [AppComponent, CarComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
