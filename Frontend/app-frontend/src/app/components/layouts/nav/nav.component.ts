import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone: false,
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent {
  currentPath: string = '';

  pages = [
    { title: 'INICIO', path: '/' },
    { title: 'INDICADORES', path: '/indicators' },
    { title: 'SALA EN BROTE', path: '/outbreak-room' },
    { title: 'SALA EN BROTE POR DÍA', path: '/outbreak-room-by-day'}
  ];

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      this.currentPath = this.router.url;
    });
  }
}
