import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { User } from '../models/user.model';
import { SpecialtyService } from '../service/specialty.service';  
import { Specialty } from '../models/specialty.model';
import { Doctor } from '../models/doctor.model';
import { DoctorService } from '../service/doctor.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'] 
})

export class AdminDashboardComponent implements OnInit {
  activeSection: string = 'users'; 
  users: User[] = [];
  specialties: Specialty[] = [];
  doctors: Doctor[] = [];

  constructor(
    private router: Router, 
    private userService: UserService, 
    private specialtyService: SpecialtyService,
    private doctorService: DoctorService
  ) {}

  ngOnInit(): void {
    this.loadUsers(); // Cargar a los usuarios
    this.loadSpecialties(); // Cargar a las especialidades
    this.loadDoctors();  //cargar a los medicos
  }

  // Carga de usuarios
  loadUsers(): void {
    this.userService.getUsers().subscribe({
      next: (data) => {
        //console.log(data); 
        this.users = data; // Asigna los datos obtenidos al arreglo de usuarios
      },
      error: (error) => {
        console.error('Error al cargar usuarios', error); 
      }
    });
  }

  // Carga de usuarios
  loadDoctors(): void {
    this.doctorService.getDoctors().subscribe({
      next: (data) => {
        console.log(data); 
        this.doctors = data; // Asigna los datos obtenidos al arreglo de usuarios
      },
      error: (error) => {
        console.error('Error al cargar doctores', error); 
      }
    });
  }


  // Carga de especialidades
  loadSpecialties(): void {
    this.specialtyService.getSpecialties().subscribe({
      next: (data) => {
        //console.log(data); 
        this.specialties = data; // Asigna los datos obtenidos al arreglo de especialidades
      },
      error: (error) => {
        console.error('Error al cargar especialidades', error); // Maneja el error
      }
    });
  }
  

  goToCreateUser() {
    this.router.navigate(['register']); 
  }

  editUser(user: User): void {
    this.router.navigate(['/edit', user.id]); 
  }

  deleteUser(user: User): void {
    if (confirm(`¿Estás seguro de que deseas eliminar a ${user.username} con el id ${user.id}?`)) {
      this.userService.deleteUser(user.id).subscribe({
        next: (response) => {
          console.log(response.message);
          alert('Usuario eliminado exitosamente');
          this.loadUsers(); // Recarga la lista de usuarios después de la eliminación
        },
        error: (error) => {
          console.error('Error al eliminar usuario:', error);
          alert(`Error al eliminar usuario: ${error.message}`);
        }
      });
    }
  }

  // Cambia la sección activa (users o specialties)
  showSection(section: string): void {
    this.activeSection = section;
  }

  


  viewDoctors(specialtyId: number): void {
    this.router.navigate(['/viewDoctors', specialtyId]);
  }

  // Métodos para gestionar especialidades
  addSpecialty() {
    this.router.navigate(['/createSpecialty']); 
  }

  addDoctor(): void {
    this.router.navigate(['/doctorRegister']); // Redirige a la página de creación de médicos
  }

  editDoctor(doctor: Doctor): void {
    this.router.navigate(['/editDoctor', doctor.createdAt]); // Redirige a la página de edición de médicos con el ID
  }

  deleteDoctor(doctor: Doctor): void {
    if (confirm(`¿Estás seguro de que deseas eliminar a ${doctor.doctorId}?`)) {
      this.doctorService.deleteDoctor(doctor.specialty.specialtyId).subscribe({
        next: () => {
          alert('Médico eliminado exitosamente');
          this.loadDoctors(); // Refresca la lista de médicos después de eliminar
        },
        error: (error) => {
          console.error('Error al eliminar el médico:', error);
          alert('Error al eliminar el médico');
        }
      });
    }
  }

}
