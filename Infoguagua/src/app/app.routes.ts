import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Lines } from './pages/lines/lines';
import { LineInfo } from './pages/line-info/line-info';
import { Login } from './pages/login/login';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'lines', component: Lines },
  { path: 'line-info', component: LineInfo }
  { path: 'login', component: Login },
];
