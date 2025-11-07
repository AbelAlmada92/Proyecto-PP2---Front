import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-profesional',
  standalone: true,
  imports: [],
  templateUrl: './page-profesional.component.html',
  styleUrl: './page-profesional.component.css'
})
export class PageProfesionalComponent {
constructor(private router: Router) {}

  logout() {
    this.router.navigate(['/']);
  }
}
