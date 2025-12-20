import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { TemplateForm } from './components/template-form/template-form';
import { ReactiveForm } from './components/reactive-form/reactive-form';
import { ApiData } from './components/api-data/api-data';
import { Protected } from './components/protected/protected';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'template-form', component: TemplateForm },
    { path: 'reactive-form', component: ReactiveForm },
    { path: 'api', component: ApiData },
    { path: 'protected', component: Protected, canActivate: [authGuard] },
    { path: '**', redirectTo: '' }
];
