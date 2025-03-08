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

  constructor(
    private authService: AuthService, 
    private router: Router
  ) {}

  ngOnInit(): void {
    // Si ya hay un token guardado, redirige a la página protegida (por ejemplo, /indicators)
    if (this.authService.getToken()) {
      this.router.navigate(['/indicators']);
    }
  }

  // Método para alternar la visualización de la contraseña
  toggleMostrarContrasena(): void {
    this.mostrarContrasena = !this.mostrarContrasena;
  }

  // Método para procesar el login
  login(): void {
    if (!this.usernameValue.trim() || !this.passwordValue.trim()) {
      alert("Por favor, ingresa usuario y contraseña");
      return;
    }

    // Enviar la solicitud de login
    this.authService.login(this.usernameValue, this.passwordValue)
      .subscribe({
        next: (response) => {
          console.log("✅ Login exitoso:", response);
          this.router.navigate(['/indicators']);
        },
        error: (error) => {
          console.error("❌ Error en login:", error);
          alert("Usuario o contraseña incorrectos");
        }
      });
  }
}
