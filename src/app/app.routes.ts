import { Routes } from '@angular/router';
import { HomeComponent } from './pages/public/home/home.component';
import { LoginComponent } from './pages/public/login/login.component';
import { SignUpComponent } from './pages/public/sign-up/sign-up.component';
import { PerfilComponent } from './pages/public/perfil/perfil.component';
import { ContatoComponent } from './pages/public/contato/contato.component';
import { SobreNosComponent } from './pages/public/sobre-nos/sobre-nos.component';
import { authGuard } from './_guards/auth.guard';
import { NotFoundComponent } from './pages/public/not-found/not-found.component';

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
    loadComponent: () =>
      import('./pages/public/perfil/perfil.component').then(
        (m) => m.PerfilComponent
      ),
    title: 'Perfil page',
    canActivate: [authGuard],
  },
  {
    path: 'contato',
    loadComponent: () =>
      import('./pages/public/contato/contato.component').then(
        (m) => m.ContatoComponent
      ),
    title: 'Contato page',
    canActivate: [authGuard],
  },
  {
    path: 'sobre-nos',
    component: SobreNosComponent,
    title: 'Hello world',
    canActivate: [authGuard],
  },
  {
    path: '**',
    component: NotFoundComponent,
    title: 'Se perdeu??',
    canActivate: [authGuard],
  },
];
