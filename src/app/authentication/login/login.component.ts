import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] 
})
export class LoginComponent {
  message: string | null = null; 
  isSuccess: boolean = true;

  constructor(private authService: AuthService, private router: Router) {}

  login(event: Event) {
    event.preventDefault(); 

    const email = (document.getElementById('email') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;

    //console.log('Datos a enviar al backend:', { email, password });

    this.authService.login(email, password).subscribe({
      next: (response) => {
        console.log('Login successful', response);
        this.message = response.message;
        this.isSuccess = true; 
        if (response.role === 'admin') {
          setTimeout(() => {
          this.router.navigate(['dashboard']);
          }, 2000);
        }  
      },
      error: (error) => {
        console.error('Login failed', error);
        this.message = 'Credenciales incorrectas'; 
        this.isSuccess = false; 
      }
    });
  }
}
