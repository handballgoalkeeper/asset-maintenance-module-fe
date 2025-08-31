import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import {vendorsReducer} from './stores/vendors-store/vendors.reducer';
import {authReducer} from './stores/auth-store/auth.reducer';
import { provideEffects } from '@ngrx/effects';
import {AuthEffects} from './stores/auth-store/auth.effects';
import {environment} from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([
      (req, next) => {
        if (!/^https?:\/\//.test(req.url)) {
          req = req.clone({
            url: `${environment.api_base_url}${req.url}`,
          });
        }
        return next(req);
      },
    ])),
    provideStore(
      {
        vendors: vendorsReducer,
        auth: authReducer,
      }),
    provideEffects([
      AuthEffects
    ]),
]
};
