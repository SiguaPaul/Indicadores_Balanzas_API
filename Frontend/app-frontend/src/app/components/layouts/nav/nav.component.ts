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
  isLoggingOut = false; // Nueva variable para manejar la animación

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

  logOut() {
    this.isLoggingOut = true;

    setTimeout(() => {
      // Aplica la clase fade-out antes de eliminar el mensaje
      this.isLoggingOut = false; // Activa el fade-out
      setTimeout(() => {
        this.authSer.logout();
        console.log('Sesión finalizada');
        this.router.navigate(['/']);
      }, 1000); // Espera 1 segundo para permitir que la animación de fade-out termine
    }, 5000); // Tiempo suficiente para que el mensaje de sesión caduque se muestre
  }

}
