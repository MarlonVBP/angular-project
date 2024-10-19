import { Routes } from '@angular/router';
import { HomeComponent } from './pages/public/home/home.component';
import { LoginComponent } from './pages/public/login/login.component';
import { SignUpComponent } from './pages/public/sign-up/sign-up.component';
import { PerfilComponent } from './pages/public/perfil/perfil.component';
import { ContatoComponent } from './pages/public/contato/contato.component';
import { SobreNosComponent } from './pages/public/sobre-nos/sobre-nos.component';
import { authGuard } from './_guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home page',
    canActivate: [authGuard],
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
    canActivate: [authGuard],
  },
  {
    path: 'contato',
    component: ContatoComponent,
    title: 'Contato page',
    canActivate: [authGuard],
  },
  {
    path: 'sobre-nos',
    component: SobreNosComponent,
    title: 'Perfil page',
    canActivate: [authGuard],
  },
  {
    path: '**',
    component: HomeComponent,
    title: 'Home page',
    canActivate: [authGuard],
  },
];
