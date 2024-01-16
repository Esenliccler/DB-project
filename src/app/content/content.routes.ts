/* eslint-disable @typescript-eslint/typedef */
import { Route } from '@angular/router';

export const contentRoutes: Route[] = [
  {
    path: 'home',
    loadComponent: () =>
      import('./home/home.component').then(
        (component) => component.HomeComponent
      ),
  },

  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
