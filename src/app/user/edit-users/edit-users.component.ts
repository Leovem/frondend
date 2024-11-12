import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/user.model'; 
import { Router, ActivatedRoute } from '@angular/router'; // Importa ActivatedRoute
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-edit-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-users.component.html',
  styleUrls: ['./edit-users.component.css'] // Cambia styleUrl a styleUrls
})
export class EditUsersComponent implements OnInit {
  user!: User;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const userId = Number(this.route.snapshot.paramMap.get('id')); // Convertir a número
    this.userService.getUser(userId).subscribe({
      next: (data) => {
        this.user = data;
      },
      error: (error) => {
        console.error('Error loading user', error);
      },
    });
  }

   // Método para obtener el usuario desde el backend
   getUserDetails(id: number): void {
    this.userService.getUser(id).subscribe({
      next: (data) => {
        this.user = data; // Asignar los datos al objeto 'user'
        console.log('Datos del usuario:', this.user); 
      },
      error: (error) => {
        console.error('Error loading user', error); // Manejo de errores si falla la carga
      },
    });
  }

  updateUser(): void {
    this.userService.updateUser(this.user).subscribe({
      next: () => {
        alert('Usuario actualizado exitosamente');
        this.router.navigate(['/users']); // Navega a la lista de usuarios o donde prefieras
      },
      error: (error) => {
        console.error('Error actualizando usuario', error);
        alert('Error al actualizar el usuario');
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/dashboard']); // Navega a la lista de usuarios
  }
}
