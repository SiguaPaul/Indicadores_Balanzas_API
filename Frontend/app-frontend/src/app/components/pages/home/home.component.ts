import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: false,  // Este componente no se exporta como módulo
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  mostrarContrasena: boolean = false;
  usernameValue: string = '';
  passwordValue: string = '';
  isLoading: boolean = false; // 🔄 Estado del loader
  message_null: boolean = false;
  message_incorrect: boolean = false;
  sessionExpired: boolean = false;

  constructor(
    private authSer: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Si ya hay un token guardado, redirige a la página protegida (por ejemplo, /indicators)
    if (this.authSer.getToken()) {
      this.router.navigate(['/indicators']);
    }

    this.authSer.sessionExpired$.subscribe((expired) => {
      if (expired) {
        this.sessionExpired = true;
      }
    });
  }

  // Método para alternar la visualización de la contraseña
  toggleMostrarContrasena(): void {
    this.mostrarContrasena = !this.mostrarContrasena;
  }

  animateLogOut() {
    this.isLoading = true;
  
    setTimeout(() => {
      this.login(); // Llamamos a la función real de inicio de sesión
    }, 1000); // Simulamos un tiempo de espera (2s)
  }

  // Método para procesar el login
  login(): void {
    if (!this.usernameValue.trim() || !this.passwordValue.trim()) {
      this.sessionExpired = false;
      this.message_incorrect = false;
      this.message_null = true;
      this.isLoading = false;
      return;
    }

    this.isLoading = true; // Mostrar loader

    // Enviar solicitud para loguearse
    this.authSer.login(this.usernameValue, this.passwordValue).subscribe({
      next: (response) => {
        this.message_null = false;
        this.sessionExpired = false;
        // Simula una carga antes de redirigir
        setTimeout(() => {
          this.isLoading = false;
          this.router.navigate(['/indicators']);
        }, 1500);
      },
      error: (error) => {
        this.message_null = false;
        this.sessionExpired = false;
        this.message_incorrect = true;
        this.isLoading = false;
        console.error("Error en login:", error);
      }
    });
  }

}
