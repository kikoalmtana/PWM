import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Lines } from './pages/lines/lines';
import { LineInfo } from './pages/line-info/line-info';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { News } from './pages/news/news';
import { Stops } from './pages/stops/stops';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'lines', component: Lines },
  { path: 'line-info', component: LineInfo },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'news', component: News },
  { path: 'stops', component: Stops }
];
