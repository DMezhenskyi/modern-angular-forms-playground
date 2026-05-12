import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'basic-forms',
  },
  {
    path: 'basic-forms',
    title: 'Basic Forms | Playground',
    loadComponent: () => import('./playgrounds/basic-forms/basic-forms'),
  },
];
