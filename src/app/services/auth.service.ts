import { Injectable } from '@angular/core';

// Ruta que se carga para que se autentique.
import { Router } from '@angular/router';

// Interfaz de registro
interface User {
  username: string;
  password: string;
  role: 'paciente' | 'profesional';
  matricula?: string;
}


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private isAuthenticated = false;
  constructor(private router: Router) { }
  private currentUser: User | null = null;
  // Ingreso a la app  
  login(dni: string, password: string, matricula?: string): boolean {
    if (!matricula) {
      // Para pacientes
      if (this.loginPaciente(dni, password)) {
        this.isAuthenticated = true;
        //this.router.navigate(['/patient/dashboard']);
        return true;
      }
    } else {
      // Para profesionales
      if (this.loginProfesional(dni, password, matricula)) {
        this.isAuthenticated = true;
        //this.router.navigate(['/professional/dashboard']);
        return true;
      }
    }
    // Retornar false si falla cualquier login
    return false;
  }
  private loginPaciente(dni: string, password: string): boolean {
    // Validación simple - reemplaza con tu lógica real
    if (dni === '12345678' && password === '1234') {
      this.currentUser = {
        username: dni,
        password: password,
        role: 'paciente'
      };
      return true;
    }
    return false;
  }

  private loginProfesional(dni: string, password: string, matricula: string): boolean {
    // Validación simple - reemplaza con tu lógica real
    if (dni === '87654321' && password === '1234' && matricula === 'MP12345') {
      this.currentUser = {
        username: dni,
        password: password,
        role: 'profesional',
        matricula: matricula
      };
      return true;
    }
    return false;
  }

  // Salida de la app
  logout(): void {
    this.isAuthenticated = false;
    this.currentUser=null;
    this.router.navigate(['/seleccion-rol']);
  }

  // Autenticador
  userAuthenticated(): boolean {
    return this.isAuthenticated;
  }

}
