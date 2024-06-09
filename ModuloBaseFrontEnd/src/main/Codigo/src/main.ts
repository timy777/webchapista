/// <reference types="@angular/localize" />

import 'hammerjs';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { HttpHeaders } from '@angular/common/http';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

  const headers = new HttpHeaders({
    'Cache-Control': 'no-store',
    'Pragma': 'no-cache'
});

for (const key in headers) {
  if (headers.hasOwnProperty(key)) {
      const headerValue = headers[key];
      XMLHttpRequest.prototype[key] = headerValue;
  }
}
