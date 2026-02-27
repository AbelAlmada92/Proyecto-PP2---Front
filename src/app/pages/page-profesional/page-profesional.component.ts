import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogBuscarPacienteComponent } from './dialog-buscar-paciente/dialog-buscar-paciente.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-page-profesional',
  standalone: true,
  imports: [],
  templateUrl: './page-profesional.component.html',
  styleUrl: './page-profesional.component.css'
})
export class PageProfesionalComponent implements OnInit {
  usuario: any;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.usuario = this.authService.getCurrentUser();
  }

  openBuscarPaciente(): void {
    const dialogRef = this.dialog.open(DialogBuscarPacienteComponent, {
      width: '600px',
      maxWidth: '90vw',
      height: 'auto',
      hasBackdrop: true,
      disableClose: false,
      data: { mode: 'default' }
    });

    dialogRef.afterClosed().subscribe((idPaciente: number | null) => {
      if (!idPaciente) return;

      this.router.navigate(['/page-paciente'], {
        queryParams: { idPaciente }
      });
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}