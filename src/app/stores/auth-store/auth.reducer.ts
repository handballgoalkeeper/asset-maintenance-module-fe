import UserModel from '../../models/auth/user.model';
import {createReducer, on} from '@ngrx/store';
import {logInAction, logInFailed, logInSuccessful} from './auth.actions';

export interface AuthState {
  user: UserModel|null,
  token: string|null,
  isLoggedIn: boolean,
  isLoading: boolean,
  errors: string|null
}

const getInitialState = (): AuthState => {
  try {
    const authState = localStorage.getItem('auth_state');

    if (authState) {
      return JSON.parse(authState);
    }
  }
  catch (e) {
    console.error('Failed to load auth state from localStorage');
  }

  return {
    user: null,
    token: null,
    isLoggedIn: false,
    isLoading: false,
    errors: null
  };
};

export const authReducer = createReducer(
  getInitialState(),
  on(
    logInAction,
    (state) => {
      return {...state, isLoading: true}
    }
  ),
  on(
    logInSuccessful,
    (state, action) => {
      return {...state, token: action.token, isLoggedIn: true, isLoading: false, user: action.user};
    }
  ),
  on(
    logInFailed,
    (state, action) => {
      return {...getInitialState(), errors: action.errors}
    }
  )
);
