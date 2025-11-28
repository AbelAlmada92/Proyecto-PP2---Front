import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-dialog-buscar-paciente',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIcon
  ],
  templateUrl: './dialog-buscar-paciente.component.html',
  styleUrls: ['./dialog-buscar-paciente.component.css']
})
export class DialogBuscarPacienteComponent {
  buscarForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<DialogBuscarPacienteComponent>,
    private router: Router
  ) {
    this.buscarForm = this.fb.group({
      dni: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(10)]]
    });
  }

  buscarPaciente(): void {
    if (this.buscarForm.valid) {
      const dniBuscado = this.buscarForm.get('dni')?.value;
      this.dialogRef.close();
      this.router.navigate(['/page-paciente'], { 
        queryParams: { dni: dniBuscado } 
      });
    }
  }

  cancelar(): void {
    this.dialogRef.close();
  }
}