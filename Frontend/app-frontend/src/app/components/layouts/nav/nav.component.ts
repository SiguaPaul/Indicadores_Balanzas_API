import { Component } from '@angular/core';

@Component({
  selector: 'app-nav',
  standalone: false,
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {

  pages = [
    { title: 'Inicio', path: '/' },
    { title: 'Indicadores', path: '/indicators' },
    { title: 'Sala en brote', path: '/outbreak-room' },
    { title: 'Sala en Brote por día', path: '/outbreak-room-by-day'}
  ]
}
