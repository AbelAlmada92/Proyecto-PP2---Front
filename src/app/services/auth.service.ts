import { Injectable } from '@angular/core';

// Ruta que se carga para que se autentique.
import { Router } from '@angular/router';

// Interfaz de registro
interface User {
  username: string;
  password: string;
  role: 'paciente' | 'medico';
}


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private isAuthenticated = false;
  constructor(private router: Router) { }

// Ingreso a la app  
  login(username: string, password: string): boolean {
    // Validación simple, podés reemplazar con una API real
    if (username === 'admin' && password === '1234') {
      this.isAuthenticated = true;
      this.router.navigate(['/home']);
      return true;
    }
    return false;
  }


  // Salida de la app
  logout(): void {
    this.isAuthenticated = false;
    this.router.navigate(['/login']);
  }

  // Autenticador
  userAuthenticated(): boolean {
    return this.isAuthenticated;
  }

}
