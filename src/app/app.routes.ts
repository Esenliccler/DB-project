import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () =>
      import('./content/home/home.component').then((c) => c.HomeComponent),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./auth/components/login/login.component').then((c)=> c.LoginComponent)
  },
  {
    path: 'sign-up',
    loadComponent: () =>
      import('./auth/components/sign-up/sign-up.component').then((c)=> c.SignUpComponent)
  },
  {
    path : '**',
    pathMatch : 'full',
    redirectTo : 'home'
  }
];
