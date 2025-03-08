import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../environments/environment.development';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tokenKey: string = 'access_token';
  private tokenCheckInterval: any;

  // Comportamiento de la sesión caducada
  private sessionExpiredSubject = new BehaviorSubject<boolean>(false);
  sessionExpired$ = this.sessionExpiredSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  login(username: string, password: string): Observable<any> {
    const url = `${environment.apiUrl}/login`;
    return this.http.post(url, { username, password }).pipe(
      tap((response: any) => {
        // Se espera que la respuesta contenga: { access_token: string, token_type: "bearer" }
        localStorage.setItem(this.tokenKey, response.access_token);
        this.startTokenExpirationCheck();
      })
    );
  }

  logout(): void {
    console.warn("🔴 Cerrando sesión...");
    localStorage.removeItem(this.tokenKey);
    clearInterval(this.tokenCheckInterval); // Detener verificación periódica
    this.router.navigate(['/']); // Redirigir al login
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  startTokenExpirationCheck(): void {
    clearInterval(this.tokenCheckInterval); // Limpiar cualquier verificación previa

    const token = this.getToken();
    if (!token) return;

    const tokenPayload = JSON.parse(atob(token.split('.')[1]));
    const expTimestamp = tokenPayload.exp * 1000; // Convertir a milisegundos
    const currentTimestamp = Date.now();
    let timeUntilExpiration = expTimestamp - currentTimestamp;

    if (timeUntilExpiration <= 0) {
      console.warn("⚠️ Token ya expirado, cerrando sesión...");
      this.sessionExpiredSubject.next(true); // Notificar que la sesión ha expirado
      this.logout();
      return;
    }

    console.log(`⏳ Token válido por: ${timeUntilExpiration / 1000} segundos`);

    // Comprobación cada 5 segundos para mayor precisión
    this.tokenCheckInterval = setInterval(() => {
      const now = Date.now();
      if (now >= expTimestamp) {
        console.warn("⚠️ Token expirado durante la sesión, cerrando sesión...");
        this.sessionExpiredSubject.next(true); // Notificar que la sesión ha expirado
        this.logout();
      }
    }, 5000);
  }
}