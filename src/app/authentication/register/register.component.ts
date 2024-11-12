import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthResponse, AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Importa FormsModule aquí

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  role: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onRegister(): void {
    this.authService.register(this.username, this.email, this.password, this.role).subscribe({
        next: (response) => { 
            console.log('Respuesta del servidor:', response.message); 
            alert(response.message); 
            this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          console.error('Error en el registro:', error);
          if (error.error) {
              alert(error.error);
          } else {
              alert('Hubo un error al registrar el usuario.');
          }
      }
    });
}


}
