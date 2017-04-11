import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { GreeterComponent } from './greeter/greeter.component';
import { DynamicGreetInputComponent } from './greeter/dynamic-greet-input/dynamic-greet-input.component';
import { SharedModule } from './shared/shared.module';
import { HeroSplashComponent } from './hero-splash/hero-splash.component';

@NgModule({
  declarations: [
    AppComponent,
    GreeterComponent,
    DynamicGreetInputComponent,
    HeroSplashComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
