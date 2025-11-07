import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-page-paciente',
  standalone: true,
  imports: [],
  templateUrl: './page-paciente.component.html',
  styleUrl: './page-paciente.component.css'
})

export class PagePacienteComponent {
  constructor(private router:Router){}
    logout() {
    this.router.navigate(['/']);
  }
}
