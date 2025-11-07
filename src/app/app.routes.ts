import { Routes } from '@angular/router';

// Importamos componentes con rutas.
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { SeleccionRolComponent } from './pages/seleccion-rol/seleccion-rol.component';
import { authGuard } from './guard/auth.guard';
import { RegisterComponent } from './pages/register/register.component';
import { RegisterProfesionalComponent } from './pages/register/register-profesional/register-profesional.component';
import { RegisterPacienteComponent } from './pages/register/register-paciente/register-paciente.component';
import { PageProfesionalComponent } from './pages/page-profesional/page-profesional.component';
import { PagePacienteComponent } from './pages/page-paciente/page-paciente.component';
import path from 'path';
// Rutas de los componentes.
export const routes: Routes = [
  { path: '', redirectTo: '/seleccion-rol', pathMatch: 'full' },
  { path: 'seleccion-rol', component: SeleccionRolComponent },
  { path: 'login', component: LoginComponent },
  // Se agrega el register
  { path: 'register', component: RegisterComponent },
  { path: 'register-paciente', component: RegisterPacienteComponent },
  { path: 'register-profesional', component: RegisterProfesionalComponent },
  { path: 'home', component: HomeComponent, canActivate: [authGuard] },
  {path: 'page-profesional', component: PageProfesionalComponent},
  {path: 'page-paciente', component: PagePacienteComponent},
  { path: '**', redirectTo: '/seleccion-rol' },
];
