import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class IndicatorsService {

  constructor(private http: HttpClient) { }

  get_Indicador_Bal1_vs_Bal1AB() {
    let url = environment.apiUrl + '/'+'indicator-daily'
    return this.http.get<any>(url)
  }

  
}
