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
  {
    path: 'dynamic-forms',
    title: 'Dynamic Forms | Playground',
    loadComponent: () => import('./playgrounds/dynamic-forms/dynamic-forms'),
  },
];
