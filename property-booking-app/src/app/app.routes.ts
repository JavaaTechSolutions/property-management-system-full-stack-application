import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { RegisterComponent } from './components/register/register.component';
import { LayoutComponent } from './components/layout/layout.component';
import { AddPropertyComponent } from './components/add-property/add-property.component';
import { ViewPropertyComponent } from './components/view-property/view-property.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    // {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
    { path: 'register', component: RegisterComponent },
    {
        path: '', component: LayoutComponent,
        children: [
            { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
            { path: 'add-property', component: AddPropertyComponent, canActivate: [AuthGuard] },
            { path: 'view-property', component: ViewPropertyComponent, canActivate: [AuthGuard] }
        ]
    }
];
