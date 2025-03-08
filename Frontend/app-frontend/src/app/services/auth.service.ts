import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tokenKey: string = 'access_token';

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    const url = `${environment.apiUrl}/login`;
    return this.http.post(url, { username, password }).pipe(
      tap((response: any) => {
        // Se espera que la respuesta contenga: { access_token: string, token_type: "bearer" }
        localStorage.setItem(this.tokenKey, response.access_token);
      })
    );
  }

  logout(): void {
    console.warn("🔴 Cerrando sesión...");
    localStorage.removeItem(this.tokenKey);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
}
