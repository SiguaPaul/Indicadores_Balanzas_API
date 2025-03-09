import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-nav',
  standalone: false,
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent{
  currentPath: string = '';
  isLoggingOut = false;

  pages = [
    { title: 'INDICADORES', path: '/indicators' },
    { title: 'SALA EN BROTE', path: '/outbreak-room' },
    { title: 'SALA EN BROTE POR DÍA', path: '/outbreak-room-by-day' }
  ];

  constructor(
    private router: Router,
    private authSer: AuthService
  ) {
    this.router.events.subscribe(() => {
      this.currentPath = this.router.url;
    });
  }

  animateLogOut() {
    this.isLoggingOut = true;
  
    setTimeout(() => {
      this.logOut(); // Llamamos a la función real de cierre de sesión
    }, 1500); // Simulamos un tiempo de espera (2s)
  }

  logOut() {
    this.authSer.logout();
    console.log('Sesión finalizada');
    this.router.navigate(['/']);
  }

}
