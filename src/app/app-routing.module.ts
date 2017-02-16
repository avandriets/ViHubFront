import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CanActivateViaOAuthGuard} from "./classes/can-activate-via-oauth-guard";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {LoginComponent} from "./components/users/login/login.component";
import {ElementDetailComponent} from "./components/element-detail/element-detail.component";
import {RegisterUserComponent} from "./components/users/register-user/register-user.component";

const routes: Routes = [
  {
    path: 'element/:id',
    component: ElementDetailComponent,
    canActivate: [CanActivateViaOAuthGuard]
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [CanActivateViaOAuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterUserComponent
  },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
];

// Export routes
export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
