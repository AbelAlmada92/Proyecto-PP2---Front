import { Component } from '@angular/core';

// Ruta para el home de la app
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {
   constructor(private auth: AuthService) {}

  logout() {
    this.auth.logout();
  }
}
