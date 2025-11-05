import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { authGuard, loginAuthGuard } from './auth-guard/login.guard';

export const routes: Routes = [
    { path: 'login', component: LoginComponent, canActivate: [loginAuthGuard]},
    { path: 'register', component: LoginComponent, canActivate: [loginAuthGuard]},
    { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard]},
    { path: '', redirectTo: '/login', pathMatch: 'full'}
];
