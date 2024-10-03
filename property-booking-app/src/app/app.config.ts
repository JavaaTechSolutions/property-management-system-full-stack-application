import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { authKeyInterceptor } from './interceptors/auth-key.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), 
    provideHttpClient(withInterceptorsFromDi()), 
      {
        provide: HTTP_INTERCEPTORS,
        useClass: authKeyInterceptor,
        multi: true,
      }]
};
