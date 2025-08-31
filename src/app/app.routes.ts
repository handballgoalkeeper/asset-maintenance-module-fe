import { Routes } from '@angular/router';
import {VendorsViewComponent as VendorsView} from './views/vendors-view/vendors-view.component';
import {LoginViewComponent as LoginView} from './views/login-view/login-view.component';
import {authGuard} from './guards/auth.guard';
import {unAuthGuard} from './guards/un-auth.guard';

export const routes: Routes = [
  {path: '', redirectTo: '/vendors', pathMatch: 'full', data: { name: 'Home' }},
  {path: 'vendors', component: VendorsView, canActivate: [authGuard], data: { title: 'Vendors' }},
  {path: 'login', component: LoginView, canActivate: [unAuthGuard], data: { title: 'Log in' }},
  { path: '**', redirectTo: '/vendors', pathMatch: 'full' }
];
