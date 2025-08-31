import {Actions, createEffect, ofType} from '@ngrx/effects';
import {inject, Injectable} from '@angular/core';
import {logInAction, logInFailed, logInSuccessful} from './auth.actions';
import {catchError, exhaustMap, map, of, tap} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {AuthState} from './auth.reducer';
import {selectAuthState} from './auth.selectors';
import PermissionModel from '../../models/auth/permission.model';

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private http = inject(HttpClient);
  private router = inject(Router);
  private store = inject(Store<AuthState>);

  logInAttempt$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(logInAction),
      exhaustMap((action) => {
        return this.http
          .post<{ success: boolean; data: { token: string, id: number, name: string, email: string, permissions: PermissionModel[] } }>(
            `/auth/login`,
            { email: action.email, password: action.password }
          )
          .pipe(
            map((response) => logInSuccessful({
              token: response.data.token,
              user: {
                id: response.data.id,
                name: response.data.name,
                email: response.data.email,
                permissions: response.data.permissions
              }
            })),
            catchError(() =>
              of(logInFailed({ errors: 'Please check your credentials and try again.' }))
            )
          )
      }),
    );
  });

  loginSuccessful$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(logInSuccessful),
      exhaustMap(() =>
        this.store.select(selectAuthState).pipe(
          tap((state) => {
            try {
              localStorage.setItem('auth_state', JSON.stringify(state));
            } catch (e) {
              console.error('Failed to persist auth state', e);
            }
            this.router.navigate(['/']).then(success => {
              if (!success) console.error('Navigation failed.');
            });
          })
        )
      )
    );
  }, { dispatch: false });
}
