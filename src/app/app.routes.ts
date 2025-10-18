import { Routes } from '@angular/router';

// Importamos componentes con rutas.
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';

import { RegisterComponent } from './pages/register/register.component';

import { authGuard } from './guard/auth.guard';
// Rutas de los componentes.
export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  // Se agrega el register
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent, canActivate: [authGuard]  },
  { path: '**', redirectTo: 'login' },
];
