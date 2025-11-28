import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

export interface DiagnosticoData {
  id?: number;
  titulo: string;
  diagnostico: string;
  nota: string;
  fecha: Date;
  nombreProfesional: string;
}

@Component({
  selector: 'app-dialog-editar',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule, 
    MatIconModule,
    MatListModule
  ],
  templateUrl: './dialog-editar.component.html',
  styleUrls: ['./dialog-editar.component.css']
})
export class DialogEditarComponent implements OnInit {
  editarForm: FormGroup;
  diagnosticoSeleccionado: DiagnosticoData | null = null;
  pasoActual: 'lista' | 'formulario' = 'lista';
  diagnosticos: any[] = [];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<DialogEditarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { dniProfesional: string }
  ) {
    this.editarForm = this.fb.group({
      titulo: ['', Validators.required],
      diagnostico: ['', Validators.required],
      nota: ['']
    });
  }

  ngOnInit(): void {
    const todosLosDiagnosticos = [
      {
        id: 1,
        titulo: 'Control de rutina',
        diagnostico: 'Se detectó presión arterial dentro de parámetros normales',
        nota: 'Paciente se encuentra en buen estado general',
        fecha: new Date('2024-09-15'),
        pacienteDni: '123456',
        profesionalDni: '654321',
        profesionalNombre: 'Marta Diaz'
      },
      {
        id: 2,
        titulo: 'Consulta por alergia', 
        diagnostico: 'Se identificó reacción alergica',
        nota: 'Evitar exposición a alérgenos',
        fecha: new Date('2025-09-20'),
        pacienteDni: '123456',
        profesionalDni: '654321',
        profesionalNombre: 'Marta Diaz'
      }
    ];

    this.diagnosticos = todosLosDiagnosticos.filter(
      diagnostico => diagnostico.profesionalDni === this.data.dniProfesional
    );
  }

  seleccionarDiagnostico(diagnostico: any): void {
    this.diagnosticoSeleccionado = diagnostico;
    this.pasoActual = 'formulario';
    
    this.editarForm.patchValue({
      titulo: diagnostico.titulo,
      diagnostico: diagnostico.diagnostico,
      nota: diagnostico.nota
    });
  }

  volverALista(): void {
    this.pasoActual = 'lista';
    this.diagnosticoSeleccionado = null;
    this.editarForm.reset();
  }

  guardarEdicion(): void {
    if (this.editarForm.valid && this.diagnosticoSeleccionado) {
      const datosEditados = {
        ...this.diagnosticoSeleccionado,
        ...this.editarForm.value
      };
      this.dialogRef.close(datosEditados);
    } else {
      Object.keys(this.editarForm.controls).forEach(key => {
        this.editarForm.get(key)?.markAsTouched();
      });
    }
  }

  cancelar(): void {
    if (this.pasoActual === 'formulario') {
      this.volverALista();
    } else {
      this.dialogRef.close();
    }
  }
}