import { Component, OnInit, signal } from '@angular/core';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-page-paciente',
  standalone: true,
  imports: [MatExpansionModule, CommonModule],
  templateUrl: './page-paciente.component.html',
  styleUrl: './page-paciente.component.css'
})

export class PagePacienteComponent implements OnInit {
  usuario: any;
  dniBuscado: string = '';
  pacienteEncontrado: boolean = true;

  readonly panelOpenState = signal(false);
  constructor(private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.dniBuscado = params['dni'];

     if (this.dniBuscado) {
        this.buscarPacientePorDNI(this.dniBuscado);
      } else {
        this.pacienteEncontrado = true;
        this.usuario = this.authService.getCurrentUser();
      }
    });
  }
  buscarPacientePorDNI(dni: string): void {
    const pacienteEncontrado = this.authService.buscarPacientePorDNI(dni);

    if (pacienteEncontrado) {
      this.pacienteEncontrado = true;
      this.usuario = pacienteEncontrado;
    } else {
      this.pacienteEncontrado = false;
      this.usuario = null;
      alert(`No se encontró ningún paciente con DNI: ${dni}`);
      
      setTimeout(() => {
        if (this.authService.esProfesional()) {
          this.router.navigate(['/page-profesional']);
        }
      }, 2000);
    }
  }



  irAPerfil(): void {
    if (this.authService.esProfesional()) {
      this.router.navigate(['/page-profesional']);
    } else {
      this.router.navigate(['/historial']);
    }
  }
  irAHistorial(): void {
    if (this.authService.esProfesional()) {
      this.router.navigate(['/historial']);
    } else {
      this.router.navigate(['/historial']);
    }
  }
  logout() {
    this.authService.logout();
  }
}
