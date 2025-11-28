import { Component } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  constructor(private router: Router) { }
  pacienteRegister() {
    this.router.navigate(['/register-paciente']);
  }

  profesionalRegister() {
    this.router.navigate(['/register-profesional']);
  }
}
