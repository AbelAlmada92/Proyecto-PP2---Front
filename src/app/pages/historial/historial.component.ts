
import { Router } from '@angular/router';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
@Component({
  selector: 'app-historial',
  standalone: true,
  imports: [],
  templateUrl: './historial.component.html',
  styleUrl: './historial.component.css'
})
export class HistorialComponent {
  readonly panelOpenState = signal(false);
  router: any;
  logout() {
    this.router.navigate(['/']);
  }
}
