import {createFeatureSelector, createSelector, select} from '@ngrx/store';
import {AuthState} from './auth.reducer';
import UserModel from '../../models/auth/user.model';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectIsLoggedIn = createSelector(
  selectAuthState,
  (state): boolean => state.isLoggedIn
);

export const selectIsLoading = createSelector(
  selectAuthState,
  (state): boolean => state.isLoading
);

export const selectToken = createSelector(
  selectAuthState,
  (state): string|null => state.token
);

export const selectUser = createSelector(
  selectAuthState,
  (state): UserModel | null => state.user
)
