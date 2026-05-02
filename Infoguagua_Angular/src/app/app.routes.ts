import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Lines } from './pages/lines/lines';
import { LineInfo } from './pages/line-info/line-info';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { News } from './pages/news/news';
import { UserEdit } from './pages/user-edit/user-edit';
import { UserInfo } from './pages/user-info/user-info';
import { Stops } from './pages/stops/stops';
import { AboutUs } from './pages/about-us/about-us';
import { SelectPass } from './pages/select-pass/select-pass';
import { AddPass } from './pages/add-pass/add-pass';
import {AuthGuard} from '@angular/fire/auth-guard';
import { AdministratorPage } from './pages/administrator-page/administrator-page';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'lines', component: Lines },
  { path: 'line-info', component: LineInfo },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'news', component: News },
  { path: 'user-info', component: UserInfo, canActivate: [AuthGuard] },
  { path: 'user-edit', component: UserEdit },
  { path: 'stops', component: Stops },
  { path: 'about-us', component: AboutUs },
  { path: 'select-pass', component: SelectPass },
  { path: 'add-pass', component: AddPass },
  { path: 'administrator-page', component: AdministratorPage },
];
