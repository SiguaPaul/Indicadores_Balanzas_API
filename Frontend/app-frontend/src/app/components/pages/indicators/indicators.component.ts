import { Component, OnInit } from '@angular/core';

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

  weeklyData = {
    labels: ['Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo', 'Lunes', 'Martes'],
    datasets: [
      {
        label: 'Balanza 1',
        data: [1200, 1500, 1100, 1800, 1400, 1700, 900], // Pesos de balanza 1
        balances: ['Bal1', 'Bal1', 'Bal1', 'Bal1', 'Bal1', 'Bal1', 'Bal1'],
        borderColor: '#FF0000',
        backgroundColor: 'rgba(255, 0, 0, 0.81)',
        pointBackgroundColor: '#EF4444'
      },
      {
        label: 'Balanza 1AB',
        data: [2000, 800, 1200, 1600, 1350, 400, 870], // Pesos de balanza 2
        balances: ['Bal2', 'Bal2', 'Bal2', 'Bal2', 'Bal2', 'Bal2', 'Bal2'],
        borderColor: '#17A34B',
        backgroundColor: 'rgba(5, 221, 62, 0.64)',
        pointBackgroundColor: '#22C55E'
      }
    ]
  };

  weeklyData1 = {
    labels: ['Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo', 'Lunes', 'Martes'],
    datasets: [
      {
        label: 'Balanza 1AB',
        data: [1200, 1500, 1100, 1800, 1400, 1700, 500], // Pesos de balanza 1
        balances: ['Bal1AB', 'Bal1AB', 'Bal1AB', 'Bal1AB', 'Bal1AB', 'Bal1AB', 'Bal1AB'],
        borderColor: '#518AE7',
        backgroundColor: 'rgba(2, 86, 221, 0.68)',
        pointBackgroundColor: '#A9C5F3'
      },
      {
        label: 'Balanza 2',
        data: [1500, 1300, 1200, 1600, 1350, 1550, 870], // Pesos de balanza 2
        balances: ['Bal2', 'Bal2', 'Bal2', 'Bal2', 'Bal2', 'Bal2', 'Bal2'],
        borderColor: '#EE7FFE',
        backgroundColor: 'rgba(235, 88, 255, 0.76)',
        pointBackgroundColor: '#F49E9E'
      }
    ]
  };

  results = [
    { date: '2025-02-10', variety: 'Rosa', weight: '500 kg' },
    { date: '2025-02-11', variety: 'Tulipán', weight: '350 kg'},
    { date: '2025-02-12', variety: 'Orquídea', weight: '200 kg' },
    { date: '2025-02-13', variety: 'Lirio', weight: '450 kg' },
    { date: '2025-02-14', variety: 'Girasol', weight: '600 kg'},
    { date: '2025-02-15', variety: 'Clavel', weight: '550 kg'},
    { date: '2025-02-16', variety: 'Margarita', weight: '300 kg'},
    { date: '2025-02-17', variety: 'Dalia', weight: '400 kg' },
    { date: '2025-02-18', variety: 'Peonía', weight: '250 kg' },
    { date: '2025-02-19', variety: 'Hortensia', weight: '350 kg' }
  ];
  

  ngOnInit(): void { }
}
