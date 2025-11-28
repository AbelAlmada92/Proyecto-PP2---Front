import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  tipoUsuario: string = "paciente";
  loginForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    this.loginForm = this.fb.group({
      dni: ['', Validators.required],
      password: ['', Validators.required],
      matricula: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.tipoUsuario = params['tipo'] || 'paciente';

      const matriculaControl = this.loginForm.get('matricula');
      if (this.tipoUsuario === 'profesional') {
        matriculaControl?.setValidators([Validators.required]);
      } else {
        matriculaControl?.clearValidators();
      }
      matriculaControl?.updateValueAndValidity();
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { dni, password, matricula } = this.loginForm.value;

      if (this.tipoUsuario === 'paciente') {
        if (this.authService.login(dni, password)) {
          this.router.navigate(['/page-paciente']);
        } else {
          alert('Credenciales incorrectas');
        }
      } else {
        if (this.authService.login(dni, password, matricula)) {
          this.router.navigate(['/page-profesional']);
        } else {
          alert('Credenciales incorrectas');
        }
      }
    } else {
      alert('Por favor complete todos los campos');
    }
  }
}