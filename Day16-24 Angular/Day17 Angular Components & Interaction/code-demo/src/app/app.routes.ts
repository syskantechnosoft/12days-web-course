import { Routes } from '@angular/router';
import { UserList } from './components/user-list/user-list';
import { UserDetail } from './components/user-detail/user-detail';
import { TemplateForm } from './components/template-form/template-form';
import { ReactiveForm } from './components/reactive-form/reactive-form';
import { Protec } from './components/protec/protec';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {path:'users',component:UserList},
    {path:'user-detail', component:UserDetail},
    {path:'template-form', component:TemplateForm},
    {path:'reactive-form', component:ReactiveForm},
    {path:'protec', component:Protec, canActivate : [authGuard]},
];
