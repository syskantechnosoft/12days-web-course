import { Routes } from '@angular/router';
import { Siva } from './siva';
import { UsersTable } from './components/users-table/users-table';
import { UserDetail } from './components/user-detail/user-detail';


export const routes: Routes = [
    {path: 'siva', loadComponent: () => import('./siva').then(m => m.Siva)} , //method2
    // {path: 'siva', component:Siva} , //method1
    {path:'users',component:UsersTable},
    {path:'user-detail',component:UserDetail},
];
