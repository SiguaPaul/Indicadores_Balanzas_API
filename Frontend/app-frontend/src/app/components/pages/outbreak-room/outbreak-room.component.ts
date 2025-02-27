import { Component } from '@angular/core';
import { Preclasification } from '../../../models/outbreak_room';

@Component({
  selector: 'app-outbreak-room',
  standalone: false,
  templateUrl: './outbreak-room.component.html',
  styleUrl: './outbreak-room.component.css'
})
export class OutbreakRoomComponent {
  preclasificacion = new Preclasification();
  
}
