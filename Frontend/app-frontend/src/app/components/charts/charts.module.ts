import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeeklyChartComponent } from './weekly-chart/weekly-chart.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    WeeklyChartComponent
  ],
  exports: [
    WeeklyChartComponent
  ]
})
export class ChartsModule { }
