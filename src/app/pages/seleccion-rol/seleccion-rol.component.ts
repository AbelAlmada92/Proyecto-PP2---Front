import { Component } from '@angular/core';
import { RouterLink, Router } from "@angular/router";

@Component({
  selector: 'app-seleccion-rol',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './seleccion-rol.component.html',
  styleUrl: './seleccion-rol.component.css'
})
export class SeleccionRolComponent {

  constructor(private router: Router) { }

  selectPaciente() {
    this.router.navigate(['/login'], {
      queryParams: { tipo: 'paciente' }
    });
  }

  selectProfesional() {
    this.router.navigate(['/login'], {
      queryParams: { tipo: 'profesional' }
    });
  }
}