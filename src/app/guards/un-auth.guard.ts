import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {Store} from '@ngrx/store';
import {AuthState} from '../stores/auth-store/auth.reducer';
import {selectIsLoggedIn} from '../stores/auth-store/auth.selectors';
import {map, take} from 'rxjs';

export const unAuthGuard: CanActivateFn = (route, state) => {
  const store = inject(Store<AuthState>);
  const router = inject(Router);

  return store.select(selectIsLoggedIn).pipe(
    take(1),
    map((isLoggedIn) => {
      console.log(isLoggedIn)
      if (!isLoggedIn) {
        return true;
      } else {
        console.log(1);
        return router.createUrlTree(['/']);
      }
    })
  );
};
