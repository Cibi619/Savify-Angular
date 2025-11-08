import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { authGuard, loginAuthGuard } from './auth-guard/login.guard';
import { ReportsComponent } from './dashboard/components/reports/reports.component';
import { HistoryComponent } from './dashboard/components/history/history.component';
import { DashboardHomeComponent } from './dashboard/components/dashboard-home/dashboard-home.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent, canActivate: [loginAuthGuard]},
    { path: 'register', component: LoginComponent, canActivate: [loginAuthGuard]},
    { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard], children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: DashboardHomeComponent },
            { path: 'report', component: ReportsComponent },
            { path: 'history', component: HistoryComponent }
        ]
    },
    { path: '', redirectTo: '/login', pathMatch: 'full'}
];
