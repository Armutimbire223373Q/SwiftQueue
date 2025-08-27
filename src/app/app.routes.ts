import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
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
    redirectTo: '/dashboard'
  }
];
