import {createAction, props} from '@ngrx/store';
import UserModel from '../../models/auth/user.model';

export const logInAction = createAction(
  '[Auth] Log in',
  props<{ email: string, password: string }>()
  );

export const logOutAction = createAction(
  '[Auth] Log out'
);

export const logInSuccessful = createAction(
  '[Auth] Log in successful',
  props<{ token: string, user: UserModel }>()
);

export const logInFailed = createAction(
  '[Auth] Log in failed',
  props<{ errors: string }>()
)
