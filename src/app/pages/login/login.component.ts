import { Component } from '@angular/core';

// Importamos las rutas que necesitamos para el login
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  form: FormGroup;
  error = '';

  constructor(private fb: FormBuilder, private auth: AuthService) {
    this.form = this.fb.group({
      username: [''],
      password: [''],
    });
  }
    onSubmit() {
    const { username, password } = this.form.value;
    if (!this.auth.login(username, password)) {
      this.error = 'Usuario o contraseña incorrectos';
    }
  }
}
