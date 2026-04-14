import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Lines } from './pages/lines/lines';
import { LineInfo } from './pages/line-info/line-info';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { News } from './pages/news/news';
import {UserInfo} from './pages/user-info/user-info';
import {UserEdit} from './pages/user-edit/user-edit';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'lines', component: Lines },
  { path: 'line-info', component: LineInfo },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'news', component: News },
  { path: 'user-info', component: UserInfo },
  { path: 'user-edit', component: UserEdit },
];
