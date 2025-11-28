import { Router, RouterLink } from '@angular/router';
import { ChangeDetectionStrategy, Component, signal, OnInit } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { DialogCrearComponent } from './dialog-crear/dialog-crear.component';
import { DialogEditarComponent } from './dialog-editar/dialog-editar.component';
import { DialogEliminarComponent } from './dialog-eliminar/dialog-eliminar.component';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-historial',
  standalone: true,
  imports: [MatExpansionModule, RouterLink, MatButtonModule, CommonModule],
  templateUrl: './historial.component.html',
  styleUrl: './historial.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HistorialComponent implements OnInit {
  esProfesional = false;

  diagnosticos: any[] = [];
  nombreProfesional: string = '';
  readonly panelOpenState = signal(false);
  dniProfesional: string = '';

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.esProfesional = this.authService.esProfesional();
    const usuario = this.authService.getCurrentUser();
    this.nombreProfesional = usuario?.nombre || 'Profesional';
    this.dniProfesional = usuario?.dni || '';
    this.cargarDiagnosticos();
  }

  cargarDiagnosticos(): void {
    const todosLosDiagnosticos = [
      {
        id: 1,
        titulo: 'Control de rutina',
        diagnostico: 'Se detectó presión arterial dentro de parámetros normales.',
        nota: 'Paciente se encuentra en buen estado general',
        fecha: new Date('2024-01-15'),
        pacienteDni: '123456',
        profesionalDni: '654321',
        profesionalNombre: 'Marta Diaz'
      },
      {
        id: 2,
        titulo: 'Consulta por alergia',
        diagnostico: 'Se identificó reacción alérgica estacional.',
        nota: 'Evitar exposición a alérgenos conocidos',
        fecha: new Date('2024-02-20'),
        pacienteDni: '123456',
        profesionalDni: '654321',
        profesionalNombre: 'Marta Diaz'
      }
    ];

    const usuario = this.authService.getCurrentUser();

    if (usuario?.role === 'paciente') {
      this.diagnosticos = todosLosDiagnosticos.filter(d => d.pacienteDni === usuario.dni);
    } else if (usuario?.role === 'profesional') {
      this.diagnosticos = todosLosDiagnosticos.filter(d => d.profesionalDni === usuario.dni);
    }
  }

  openCrearDiagnostico(): void {
    const dialogRef = this.dialog.open(DialogCrearComponent, {
      width: '600px',
      maxWidth: '90vw',
      height: 'auto',
      hasBackdrop: true,
      disableClose: false,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Diagnostico guardado:', result);
      }
    });
  }

  openEditarDiagnostico(): void {
    const dialogRef = this.dialog.open(DialogEditarComponent, {
      width: '600px',
      maxWidth: '90vw',
      height: 'auto',
      hasBackdrop: true,
      disableClose: false,
      data: {
        dniProfesional: this.dniProfesional
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Diagnostico editado:', result);
      }
    });
  }

  openEliminarDiagnostico(): void {
    const dialogRef = this.dialog.open(DialogEliminarComponent, {
      width: '600px',
      maxWidth: '90vw',
      height: 'auto',
      hasBackdrop: true,
      disableClose: false,
      data: {
        dniProfesional: this.dniProfesional
      }
    });

    dialogRef.afterClosed().subscribe((idsEliminados: number[] | undefined) => {
      if (idsEliminados && idsEliminados.length > 0) {
        console.log('Diagnosticos a eliminar:', idsEliminados);
      }
    });
  }

  irAPerfil(): void {
    if (this.authService.esProfesional()) {
      this.router.navigate(['/page-profesional']);
    } else {
      this.router.navigate(['/page-paciente']);
    }
  }

  logout() {
    this.authService.logout();
  }
}