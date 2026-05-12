import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register.page').then((m) => m.RegisterPage),
  },
  {
    path: 'lines',
    loadComponent: () => import('./pages/lines/lines.page').then((m) => m.LinesPage),
  },
  {
    path: 'line-info',
    loadComponent: () => import('./pages/line-info/line-info.page').then((m) => m.LineInfoPage),
  },
    {
    path: 'favorites',
    loadComponent: () => import('./pages/favorites/favorites.page').then((m) => m.FavoritesPage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
