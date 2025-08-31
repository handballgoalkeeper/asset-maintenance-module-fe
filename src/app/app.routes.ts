import { Routes } from '@angular/router';
import {VendorsViewComponent as VendorsView} from './views/vendors-view/vendors-view.component';
import {LoginViewComponent as LoginView} from './views/login-view/login-view.component';
import {authGuard} from './guards/auth.guard';
import {unAuthGuard} from './guards/un-auth.guard';

export const routes: Routes = [
  {path: '', redirectTo: '/vendors', pathMatch: 'full'},
  {path: 'vendors', component: VendorsView, canActivate: [authGuard]},
  {path: 'login', component: LoginView, canActivate: [unAuthGuard]},
  { path: '**', redirectTo: '/vendors', pathMatch: 'full' }
];
