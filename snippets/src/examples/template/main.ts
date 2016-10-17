import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { environment } from '../../app';
import { AppModule } from './code/example.module';
import { enableProdMode } from '@angular/core';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);
