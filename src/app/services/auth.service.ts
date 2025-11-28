import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

interface User {
  dni?: string;
  password: string;
  role: 'paciente' | 'profesional';
  matricula?: string;
  nombre?: string;
  telefono?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;
  private currentUser: User | null = null;

  private usuarioPaciente: User = {
    dni: '123456',
    password: 'paciente123',
    role: 'paciente',
    nombre: 'Pedro Lopez',
    telefono: '1155443322'
  };

  private usuarioProfesional: User = {
    dni: '654321',
    password: 'pro123',
    role: 'profesional',
    matricula: '654321',
    nombre: 'Marta Diaz',
    telefono: '1166778899'
  };

  constructor(private router: Router) { }

   buscarPacientePorDNI(dni: string): User | null {
    if (dni === this.usuarioPaciente.dni) {
      return this.usuarioPaciente;
    }
    return null;
  }
  login(dni: string, password: string, matricula?: string): boolean {
    if (!matricula) {
      return this.loginPaciente(dni, password);
    } else {
      return this.loginProfesional(dni, password, matricula);
    }
  }

  private loginPaciente(dni: string, password: string): boolean {
    if (dni === this.usuarioPaciente.dni && password === this.usuarioPaciente.password) {
      this.currentUser = this.usuarioPaciente;
      this.isAuthenticated = true;
      return true;
    }
    return false;
  }

  private loginProfesional(dni: string, password: string, matricula: string): boolean {
    if (dni === this.usuarioProfesional.dni && 
        password === this.usuarioProfesional.password && 
        matricula === this.usuarioProfesional.matricula) {
      this.currentUser = this.usuarioProfesional;
      this.isAuthenticated = true;
      return true;
    }
    return false;
  }

  logout(): void {
    this.isAuthenticated = false;
    this.currentUser = null;
    this.router.navigate(['/seleccion-rol']);
  }

  userAuthenticated(): boolean {
    return this.isAuthenticated;
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  esProfesional(): boolean {
    return this.currentUser?.role === 'profesional';
  }

  esPaciente(): boolean {
    return this.currentUser?.role === 'paciente';
  }

  getRole(): string | null {
    return this.currentUser?.role || null;
  }

  getMatricula(): string | null {
    return this.currentUser?.matricula || null;
  }
}