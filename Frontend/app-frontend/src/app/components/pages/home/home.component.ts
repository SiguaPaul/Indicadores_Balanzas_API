import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: false,  // Este componente no se exporta como módulo
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']  // Asegúrate de que el nombre del archivo de estilos sea correcto
})
export class HomeComponent {

  mostrarContrasena: boolean = false;
  usernameValue: string = '';
  passwordValue: string = '';

  constructor(
    private authService: AuthService, 
    private router: Router
  ) {}

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

    // const loginData = {
    //   username: this.usernameValue,
    //   password: this.passwordValue
    // };
  
    // console.log("📤 Enviando datos al backend:", loginData);  // 📌 Imprime los datos antes de enviarlos

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