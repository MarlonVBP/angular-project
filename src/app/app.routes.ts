import { Routes } from '@angular/router';
import { HomeComponent } from './pages/public/home/home.component';
import { LoginComponent } from './pages/public/login/login.component';
import { SignUpComponent } from './pages/public/sign-up/sign-up.component';
import { PerfilComponent } from './pages/public/perfil/perfil.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home page',
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login page',
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
    title: 'Sign-up page',
  },
  {
    path: 'perfil',
    component: PerfilComponent,
    title: 'Perfil page',
  },
  {
    path: 'contato',
    component: PerfilComponent,
    title: 'Contato page',
  },
  {
    path: 'sobre-nos',
    component: PerfilComponent,
    title: 'Perfil page',
  },
  {
    path: '**',
    component: HomeComponent,
    title: 'Home page',
  },
];
