
import { Router, RouterLink } from '@angular/router';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
@Component({
  selector: 'app-historial',
  standalone: true,
  imports: [MatExpansionModule, RouterLink],
  templateUrl: './historial.component.html',
  styleUrl: './historial.component.css'
})
export class HistorialComponent {
  constructor(private router: Router) { }
  readonly panelOpenState = signal(false);
  logout() {
    this.router.navigate(['/']);
  }
}
