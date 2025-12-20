import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';

export const routes: Routes = [
    { path: '', redirectTo: 'signal-crud', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    {
        path: 'signal-crud',
        canActivate: [authGuard],
        children: [
            { path: '', loadComponent: () => import('./features/signal-crud/user-list/user-list.component').then(m => m.UserListSignalComponent) },
            { path: 'add', loadComponent: () => import('./features/signal-crud/user-form/user-form.component').then(m => m.UserFormSignalComponent) },
            { path: 'edit/:id', loadComponent: () => import('./features/signal-crud/user-form/user-form.component').then(m => m.UserFormSignalComponent) }
        ]
    },
    {
        path: 'legacy-crud',
        canActivate: [authGuard],
        children: [
            { path: '', loadComponent: () => import('./features/legacy-crud/user-list/user-list.component').then(m => m.UserListLegacyComponent) },
            { path: 'add', loadComponent: () => import('./features/legacy-crud/user-form/user-form.component').then(m => m.UserFormLegacyComponent) },
            { path: 'edit/:id', loadComponent: () => import('./features/legacy-crud/user-form/user-form.component').then(m => m.UserFormLegacyComponent) }
        ]
    }
];
