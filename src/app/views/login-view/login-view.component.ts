import {Component, inject} from '@angular/core';
import {environment} from '../../../environments/environment';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {AuthState} from '../../stores/auth-store/auth.reducer';
import {logInAction} from '../../stores/auth-store/auth.actions';

@Component({
  selector: 'app-login-view',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login-view.component.html',
  standalone: true,
  styleUrl: './login-view.component.css'
})
export class LoginViewComponent {
  private store = inject(Store<AuthState>);

  public appName = environment.mainAppName;
  public moduleName = environment.moduleName;
  public loginForm = new FormGroup({
    email: new FormControl<string|undefined>(undefined, {
      validators: [ Validators.email, Validators.required ]
    }),
    password: new FormControl<string|undefined>(undefined, {
      validators: [ Validators.required, Validators.minLength(6) ]
    })
  });

  get emailIsInvalid() {
    return (
      this.loginForm.controls.email.touched &&
      this.loginForm.controls.email.dirty &&
      this.loginForm.controls.email.invalid
    );
  }

  get passwordIsInvalid() {
    return (
      this.loginForm.controls.password.touched &&
      this.loginForm.controls.password.dirty &&
      this.loginForm.controls.password.invalid
    );
  }

  onLogIn = () => {
    if (this.loginForm.invalid) {
      return;
    }

    const enteredEmail = this.loginForm.value.email as string;
    const enteredPassword = this.loginForm.value.password as string;
    this.store.dispatch(logInAction({ email: enteredEmail, password: enteredPassword }));
  }
}
