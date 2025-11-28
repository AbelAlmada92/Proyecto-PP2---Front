import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

export interface DiagnosticoData {
  id?: number;
  titulo: string;
  diagnostico: string;
  nota: string;
  fecha: Date;
  nombreProfesional: string;
}

@Component({
  selector: 'app-dialog-eliminar',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatCheckboxModule,
    MatListModule,
    MatIconModule
  ],
  templateUrl: './dialog-eliminar.component.html',
  styleUrls: ['./dialog-eliminar.component.css']
})
export class DialogEliminarComponent implements OnInit {
  diagnosticosSeleccionados: Set<number> = new Set();
  diagnosticos: any[] = [];

  constructor(
    private dialogRef: MatDialogRef<DialogEliminarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { dniProfesional: string }
  ) {}

  ngOnInit(): void {
    const todosLosDiagnosticos = [
      {
        id: 1,
        titulo: 'Control de rutina',
        fecha: new Date('2024-01-15'),
        pacienteDni: '123456',
        profesionalDni: '654321',
        profesionalNombre: 'Marta Diaz'
      },
      {
        id: 2,
        titulo: 'Consulta por alergia', 
        fecha: new Date('2024-02-20'),
        pacienteDni: '123456',
        profesionalDni: '654321',
        profesionalNombre: 'Marta Diaz'
      }
    ];

    this.diagnosticos = todosLosDiagnosticos.filter(
      diagnostico => diagnostico.profesionalDni === this.data.dniProfesional
    );
  }

  toggleSeleccion(id: number): void {
    if (this.diagnosticosSeleccionados.has(id)) {
      this.diagnosticosSeleccionados.delete(id);
    } else {
      this.diagnosticosSeleccionados.add(id);
    }
  }

  estaSeleccionado(id: number): boolean {
    return this.diagnosticosSeleccionados.has(id);
  }

  eliminarSeleccionados(): void {
    if (this.diagnosticosSeleccionados.size === 0) {
      alert('Por favor, selecciona al menos un diagnóstico para eliminar');
      return;
    }

    const confirmar = confirm(`¿Estás seguro de que quieres eliminar ${this.diagnosticosSeleccionados.size} diagnóstico(s)? Esta acción no se puede deshacer.`);
    
    if (confirmar) {
      this.dialogRef.close(Array.from(this.diagnosticosSeleccionados));
    }
  }

  cancelar(): void {
    this.dialogRef.close();
  }

  seleccionarTodos(): void {
    if (this.diagnosticosSeleccionados.size === this.diagnosticos.length) {
      this.diagnosticosSeleccionados.clear();
    } else {
      this.diagnosticos.forEach(diagnostico => {
        if (diagnostico.id) {
          this.diagnosticosSeleccionados.add(diagnostico.id);
        }
      });
    }
  }

  get textoSeleccionarTodos(): string {
    return this.diagnosticosSeleccionados.size === this.diagnosticos.length 
      ? 'Deseleccionar todos' 
      : 'Seleccionar todos';
  }
}