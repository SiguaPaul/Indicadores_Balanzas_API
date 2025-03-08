import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-nav',
  standalone: false,
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent {
  currentPath: string = '';

  pages = [
    { title: 'INDICADORES', path: '/indicators' },
    { title: 'SALA EN BROTE', path: '/outbreak-room' },
    { title: 'SALA EN BROTE POR DÍA', path: '/outbreak-room-by-day'}
  ];

  constructor(
    private router: Router,
    private authSer: AuthService
  ) {
    this.router.events.subscribe(() => {
      this.currentPath = this.router.url;
    });
  }

  logOutSuccessfully() {
    // Implementación de logout
    this.authSer.logout()
    console.log('Sesión finalizada');
    this.router.navigate([('/')])
  }
}
