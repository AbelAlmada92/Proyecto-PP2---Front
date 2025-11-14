import { Component, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';
@Component({
  selector: 'app-page-paciente',
  standalone: true,
  imports: [RouterLink,MatExpansionModule],
  templateUrl: './page-paciente.component.html',
  styleUrl: './page-paciente.component.css'
})

export class PagePacienteComponent {
  constructor(private router:Router){}
    readonly panelOpenState = signal(false);
    logout() {
    this.router.navigate(['/']);
  }
}
