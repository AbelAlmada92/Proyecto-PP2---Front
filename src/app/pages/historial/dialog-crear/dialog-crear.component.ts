import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-dialog-crear',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './dialog-crear.component.html',
  styleUrls: ['./dialog-crear.component.css']
})
export class DialogCrearComponent implements OnInit {
  diagnosticoForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<DialogCrearComponent>,
    private authService: AuthService
  ) {
    this.diagnosticoForm = this.fb.group({
      titulo: ['', Validators.required],
      diagnostico: ['', Validators.required],
      nota: [''],
      nombreProfesional: ['']
    });
  }

  ngOnInit() {
    const usuario = this.authService.getCurrentUser();
    if (usuario?.nombre) {
      this.diagnosticoForm.patchValue({
        nombreProfesional: usuario.nombre
      });
    }
  }

  guardarDiagnostico(): void {
    if (this.diagnosticoForm.valid) {
      this.dialogRef.close(this.diagnosticoForm.value);
    } else {
      Object.keys(this.diagnosticoForm.controls).forEach(key => {
        this.diagnosticoForm.get(key)?.markAsTouched();
      });
    }
  }

  cancelar(): void {
    this.dialogRef.close();
  }
}