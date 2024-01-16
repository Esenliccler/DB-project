import { Routes } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';
import { ContentComponent } from './content/content.component';
import { contentRoutes } from './content/content.routes';

export const routes: Routes = [
  {
    path: 'lieferspatz',
    canActivate: [AuthGuard],
    component: ContentComponent,
    children: contentRoutes,
  },

  {
    path: 'login',
    loadComponent: () =>
      import('./auth/components/login/login.component').then(
        (c) => c.LoginComponent
      ),
  },

  {
    path: 'sign-up',
    loadComponent: () =>
      import('./auth/components/sign-up/sign-up.component').then(
        (c) => c.SignUpComponent
      ),
  },

  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'lieferspatz',
  },
];
