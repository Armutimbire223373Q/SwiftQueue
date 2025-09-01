import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./landing/landing').then(m => m.Landing)
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login').then(m => m.Login)
  },
  {
    path: 'register',
    loadComponent: () => import('./register/register').then(m => m.Register)
  },
  {
    path: 'patient',
    loadComponent: () => import('./patient/patient').then(m => m.Patient)
  },
  {
    path: 'staff',
    loadComponent: () => import('./staff/staff').then(m => m.Staff)
  },
  {
    path: 'about',
    loadComponent: () => import('./about/about').then(m => m.About)
  },
  {
    path: 'contact',
    loadComponent: () => import('./contact/contact').then(m => m.Contact)
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./layout/layout').then(m => m.Layout),
    children: [
      {
        path: '',
        loadComponent: () => import('./dashboard/dashboard').then(m => m.Dashboard)
      },
      {
        path: 'queue-status',
        loadComponent: () => import('./queue-status/queue-status').then(m => m.QueueStatus)
      },
      {
        path: 'appointments',
        loadComponent: () => import('./appointments/appointments').then(m => m.Appointments)
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/'
  }
];
