import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogBuscarPacienteComponent } from '../page-profesional/dialog-buscar-paciente/dialog-buscar-paciente.component';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, MatDialogModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  tipoUsuario: string = 'paciente';
  loginForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {
    this.loginForm = this.fb.group({
      dni: ['', Validators.required],
      password: ['', Validators.required],
      matricula: ['']
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
        matriculaControl?.setValue('');
      }
      matriculaControl?.updateValueAndValidity();
    });
  }

  onSubmit() {
    if (!this.loginForm.valid) {
      alert('Por favor complete todos los campos');
      return;
    }

    const { dni, password, matricula } = this.loginForm.value;

    if (this.tipoUsuario === 'profesional') {
      if (this.authService.login(dni, password, matricula)) {
        this.router.navigate(['/page-profesional']);
      } else {
        alert('Credenciales incorrectas');
      }
      return;
    }

    if (!this.authService.login(dni, password)) {
      alert('Credenciales incorrectas');
      return;
    }

    const dialogRef = this.dialog.open(DialogBuscarPacienteComponent, {
      width: '420px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe((idPaciente: number | null) => {
      if (!idPaciente) {
        return;
      }

      this.router.navigate(['/page-paciente'], {
        queryParams: { idPaciente }
      });
    });
  }
}