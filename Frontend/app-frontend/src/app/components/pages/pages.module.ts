import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { IndicatorsComponent } from './indicators/indicators.component';
import { OutbreakRoomComponent } from './outbreak-room/outbreak-room.component';
import { OutbreakRoomByDayComponent } from './outbreak-room-by-day/outbreak-room-by-day.component';
import { LayoutsModule } from '../layouts/layouts.module';
import { NavComponent } from '../layouts/nav/nav.component';
import { WeeklyChartComponent } from '../charts/weekly-chart/weekly-chart.component';
import { FormsModule } from '@angular/forms';
import { AuthGuard } from '../../guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '',  // Cuando PagesModule se carga, redirige a 'home'
    pathMatch: 'full'
  },
  {
    path: '',
    component: HomeComponent
  },
  { path: 'indicators', 
    component: IndicatorsComponent, 
    canActivate: [AuthGuard] 
  },
  {
    path: 'outbreak-room',
    component: OutbreakRoomComponent, 
    canActivate: [AuthGuard]
  },
  {
    path: 'outbreak-room-by-day',
    component: OutbreakRoomByDayComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  declarations: [
    HomeComponent,
    IndicatorsComponent,
    OutbreakRoomComponent,
    OutbreakRoomByDayComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),  // Asegura que PagesModule usa forChild
    LayoutsModule,
    WeeklyChartComponent,
    FormsModule  // Para usar ngModel en los formularios
  ],
  exports: [RouterModule, NavComponent]
})
export class PagesModule { }
