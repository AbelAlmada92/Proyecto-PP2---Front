import { Component, OnInit, signal } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { FormsModule } from '@angular/forms';

import { AuthService } from '../../services/auth.service';
import { PacienteService, Paciente } from '../../services/paciente.service';
import { ObservacionesService, Observacion } from '../../services/observaciones.service';

@Component({
  selector: 'app-page-paciente',
  standalone: true,
  imports: [
    MatExpansionModule,
    CommonModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './page-paciente.component.html',
  styleUrl: './page-paciente.component.css'
})
export class PagePacienteComponent implements OnInit {
  usuario: Paciente | any;
  pacienteEncontrado: boolean = true;
  canEdit = false;

  observaciones: Observacion[] = [];
  observacionesLoading = false;

  editingObservacionId: number | null = null;
  editTexto = '';
  savingEdit = false;

  readonly panelOpenState = signal(false);

  constructor(
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute,
    private pacienteService: PacienteService,
    private observacionesService: ObservacionesService
  ) {}

  ngOnInit(): void {
    this.canEdit = this.authService.esProfesional();
    this.route.queryParams.subscribe(params => {
      const idPacienteParam = params['idPaciente'];

      if (idPacienteParam) {
        const idPaciente = Number(idPacienteParam);
        if (!Number.isNaN(idPaciente) && idPaciente > 0) {
          this.buscarPacientePorId(idPaciente);
          return;
        }
      }

      // fallback: usuario actual
      this.pacienteEncontrado = true;
      this.usuario = this.authService.getCurrentUser();

      if (this.usuario?.idPaciente) {
        this.cargarObservaciones(this.usuario.idPaciente);
      }
    });
  }

  private buscarPacientePorId(idPaciente: number): void {
    this.pacienteService.getById(idPaciente).subscribe({
      next: (paciente) => {
        this.pacienteEncontrado = true;
        this.usuario = paciente;
        this.cargarObservaciones(paciente.idPaciente);
      },
      error: () => {
        this.pacienteEncontrado = false;
        this.usuario = null;
        alert(`No se encontró ningún paciente con ID: ${idPaciente}`);

        setTimeout(() => {
          if (this.authService.esProfesional()) {
            this.router.navigate(['/page-profesional']);
          }
        }, 2000);
      }
    });
  }

  private cargarObservaciones(idPaciente: number): void {
    this.observacionesLoading = true;

    this.observacionesService.getByPacienteId(idPaciente).subscribe({
      next: (list) => {
        this.observaciones = list ?? [];
        this.observacionesLoading = false;
      },
      error: (err) => {
        console.error('Error cargando observaciones:', err);
        this.observaciones = [];
        this.observacionesLoading = false;
      }
    });
  }

  startEdit(o: Observacion): void {
    if (!this.canEdit) return;
    this.editingObservacionId = o.idObservacion;
    this.editTexto = o.textoObservacion ?? '';
  }

  cancelEdit(): void {
    this.editingObservacionId = null;
    this.editTexto = '';
    this.savingEdit = false;
  }

  saveEdit(o: Observacion): void {
    const nuevoTexto = (this.editTexto ?? '').trim();
    if (!nuevoTexto) return;

    this.savingEdit = true;

    this.observacionesService.updateTexto(o.idObservacion, {
      textoObservacion: nuevoTexto,
      idPaciente: o.idPaciente,
      idMedico: o.idMedico,
      fechaObservacion: o.fechaObservacion
    }).subscribe({
      next: () => {
        o.textoObservacion = nuevoTexto;
        this.cancelEdit();
      },
      error: (err) => {
        console.error('Error actualizando observación:', err);
        this.savingEdit = false;
        alert('No se pudo actualizar la observación.');
      }
    });
  }

  irAPerfil(): void {
    if (this.authService.esProfesional()) this.router.navigate(['/page-profesional']);
    else this.router.navigate(['/historial']);
  }

  irAHistorial(): void {
    this.router.navigate(['/historial']);
  }

  logout() {
    this.authService.logout();
  }
}