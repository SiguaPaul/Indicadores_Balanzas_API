import { Component, Input, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-weekly-chart',
  templateUrl: './weekly-chart.component.html',
  styleUrls: ['./weekly-chart.component.css']
})
export class WeeklyChartComponent implements AfterViewInit {
  @Input() chartData: any; // Recibe los datos del padre
  @ViewChild('chartCanvas') chartCanvas!: ElementRef; // Referencia al canvas
  chart: any; // Almacena la instancia del gráfico

  ngAfterViewInit() {
    this.createChart();
  }

  createChart() {
    if (!this.chartData) {
      console.error("No hay datos para el gráfico.");
      return;
    }

    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.chartData.labels,
        datasets: this.chartData.datasets.map((dataset: any) => ({
          label: dataset.label,
          data: dataset.data,
          borderColor: dataset.borderColor,
          backgroundColor: dataset.backgroundColor,
          borderWidth: 2,
          pointBackgroundColor: dataset.pointBackgroundColor,
          tension: 0.3
        }))
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Peso registrado en balanzas durante la semana',
            font: { size: 18 }
          },
          legend: {
            display: true,
            position: 'top'
          },
          tooltip: {
            callbacks: {
              label: (tooltipItem: any) => {
                const datasetIndex = tooltipItem.datasetIndex;
                const index = tooltipItem.dataIndex;
                const weight = this.chartData.datasets[datasetIndex].data[index];
                const balance = this.chartData.datasets[datasetIndex].balances[index];
                return `${this.chartData.datasets[datasetIndex].label}: ${weight} kg | Balanza: ${balance}`;
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Peso (kg)'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Días de la semana'
            }
          }
        }
      }
    });
  }
}
