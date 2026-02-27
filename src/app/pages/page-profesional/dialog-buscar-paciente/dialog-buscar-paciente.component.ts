import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

import { PacienteService } from '../../../services/paciente.service';

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
    MatIconModule
  ],
  templateUrl: './dialog-buscar-paciente.component.html',
  styleUrls: ['./dialog-buscar-paciente.component.css']
})
export class DialogBuscarPacienteComponent {
  buscarForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<DialogBuscarPacienteComponent>,
    private pacienteService: PacienteService
  ) {
    this.buscarForm = this.fb.group({
      legajo: ['', [Validators.required, Validators.min(1)]]
    });
  }

  buscarPaciente(): void {
    if (!this.buscarForm.valid) return;

    const legajoValue = this.buscarForm.get('legajo')?.value;
    const idPaciente = Number(legajoValue);

    if (Number.isNaN(idPaciente) || idPaciente <= 0) {
      this.buscarForm.get('legajo')?.setErrors({ invalidNumber: true });
      return;
    }

    this.pacienteService.getById(idPaciente).subscribe({
      next: (paciente) => this.dialogRef.close(paciente.idPaciente),
      error: () => this.buscarForm.setErrors({ notFound: true })
    });
  }

  cancelar(): void {
    this.dialogRef.close(null);
  }
}