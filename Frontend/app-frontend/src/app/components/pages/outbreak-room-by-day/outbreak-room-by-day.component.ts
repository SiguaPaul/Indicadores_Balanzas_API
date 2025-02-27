import { Component } from '@angular/core';
import { Preclasification } from '../../../models/outbreak_room';

@Component({
  selector: 'app-outbreak-room-by-day',
  standalone: false,
  templateUrl: './outbreak-room-by-day.component.html',
  styleUrl: './outbreak-room-by-day.component.css'
})
export class OutbreakRoomByDayComponent {
  preclasificacion = new Preclasification();

}
