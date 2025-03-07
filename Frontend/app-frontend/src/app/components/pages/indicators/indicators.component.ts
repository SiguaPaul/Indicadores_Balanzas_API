import { Component, OnInit } from '@angular/core';
import { IndicatorsService } from '../../../services/indicators.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-indicators',
  standalone: false,
  templateUrl: './indicators.component.html',
  styleUrl: './indicators.component.css'
})
export class IndicatorsComponent implements OnInit {

  //Variables
  balance1: number = 900;
  balance1AB: number = 870;
  loss: number = 900;
  
  weeklyData1: { labels: string[]; datasets: { label: string; data: number[]; borderColor: string; backgroundColor: string; pointBackgroundColor: string; }[] } = {
    labels: ['Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo', 'Lunes', 'Martes'],
    datasets: [
      {
        label: 'Balanza 1',
        data: [], // Inicializa con un array vacío para numeros
        borderColor: '#518AE7',
        backgroundColor: 'rgba(2, 86, 221, 0.68)',
        pointBackgroundColor: '#A9C5F3'
      },
      {
        label: 'Balanza 1AB',
        data: [], // Inicializa con un array vacío de números
        borderColor: '#f34d00',
        backgroundColor: 'rgba(247, 70, 0, 0.76)',
        pointBackgroundColor: '#f34d00',
      }
    ]
  };
  
  weeklyData2 = {
    labels: ['Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo', 'Lunes', 'Martes'],
    datasets: [
      {
        label: 'Balanza 1',
        data: [1200, 1500, 1100, 1800, 1400, 1700, 900], // Pesos de balanza 1
        borderColor: '#FF0000',
        backgroundColor: 'rgba(255, 0, 0, 0.81)',
        pointBackgroundColor: '#EF4444'
      },
      {
        label: 'Balanza 1AB',
        data: [2000, 800, 1200, 1600, 1350, 400, 870], // Pesos de balanza 2
        borderColor: '#17A34B',
        backgroundColor: 'rgba(5, 221, 62, 0.64)',
        pointBackgroundColor: '#22C55E'
      }
    ]
  };

  constructor(private indicatorSer: IndicatorsService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.get_indicators_bal1_vs_Bal1AB();
  }

  get_indicators_bal1_vs_Bal1AB() {
    this.indicatorSer.get_Indicador_Bal1_vs_Bal1AB().subscribe((data: any) => {
      // Formatear los días de la semana en español
      console.log('info sin procesar: ', data)
      const labels = data.map((item: any) => {
        return new Date(item.Fecha).toLocaleDateString('es-ES', { weekday: 'long' })
          .replace(/^\w/, (c) => c.toUpperCase()); // Capitaliza la primera letra
      });

      const balanza1ABData = data.map((item: any) => item?.B1 || 0);
      const balanza1Data = data.map((item: any) => item?.B1AB || 0);

      // Actualizar weeklyData1 con los datos recibidos
      this.weeklyData1 = {
        labels: [...labels],
        datasets: [
          {
            ...this.weeklyData1.datasets[0], 
            data: [...balanza1ABData] 
          },
          {
            ...this.weeklyData1.datasets[1], 
            data: [...balanza1Data] 
          }
        ]
      };
      
      this.cdr.detectChanges(); // Forzar actualización de la vista
      

      console.log("Datos actualizados:", this.weeklyData1);
    });
  }

  datafilter() {
    // Implementar filtro de datos según los parámetros seleccionados
    console.log("datafilter")
  }
}