import { Component, Input, AfterViewInit, ElementRef, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-weekly-chart',
  templateUrl: './weekly-chart.component.html',
  styleUrls: ['./weekly-chart.component.css']
})
export class WeeklyChartComponent implements AfterViewInit, OnChanges {
  @Input() chartData: any; // Recibe los datos del padre
  @ViewChild('chartCanvas') chartCanvas!: ElementRef; // Referencia al canvas
  chart: any; // Almacena la instancia del gráfico

  ngAfterViewInit() {
    if (this.chartData) {
      this.createChart();
    }
  }

  // Detectar cambios en chartData
  ngOnChanges(changes: SimpleChanges) {
    if (changes['chartData'] && !changes['chartData'].firstChange) {
      this.updateChart();
    }
  }

  createChart() {
    if (!this.chartData || !this.chartCanvas) {
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
            text: 'Peso registrado en balanzas durante la semana de la variedad XLENCE',
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
                const formattedWeight = weight.toFixed(2);
                return `${this.chartData.datasets[datasetIndex].label}: ${formattedWeight} kg`;
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

  updateChart() {
    if (this.chart) {
      this.chart.data.labels = this.chartData.labels;
      this.chart.data.datasets = this.chartData.datasets.map((dataset: any) => ({
        label: dataset.label,
        data: dataset.data,
        borderColor: dataset.borderColor,
        backgroundColor: dataset.backgroundColor,
        borderWidth: 2,
        pointBackgroundColor: dataset.pointBackgroundColor,
        tension: 0.3
      }));
      this.chart.update();
    } else {
      this.createChart();
    }
  }
}
