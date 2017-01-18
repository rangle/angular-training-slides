declare const __PRODUCTION__: boolean;
declare const __TEST__: boolean;

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

if (__PRODUCTION__) {
  enableProdMode();
}

if (!__TEST__) {
  platformBrowserDynamic().bootstrapModule(AppModule);
}
