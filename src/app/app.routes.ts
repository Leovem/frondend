import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        loadComponent: () => import('./authentication/login/login.component').then(m => m.LoginComponent)
    },
    {
        path: 'register', loadComponent: () => import('./authentication/register/register.component').then(m => m.RegisterComponent)
    },
    {
        path: 'dashboard', loadComponent: () => import('./admin-dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent)
    },
    {
        path: 'createSpecialty', loadComponent: () => import('./specialties/specialty-create/specialty-create.component').then(m => m.SpecialtyCreateComponent)
    }, 
    {
        path: 'edit/:id', loadComponent: () => import('./user/edit-users/edit-users.component').then(m => m.EditUsersComponent)
    },
    {
        path: 'doctorRegister', loadComponent: () => import('./doctor/doctor-register/doctor-register.component').then(m => m.DoctorRegisterComponent)
    },
    {
        path: 'viewDoctors/:specialtyId', loadComponent: () => import('./doctor/viewdoctor/viewdoctor.component').then(m => m.ViewdoctorComponent)
    }

];
