import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms'; 
import { Router } from '@angular/router';
import { SpecialtyService } from '../../service/specialty.service'; 
import { Specialty } from '../../models/specialty.model';


@Component({
  selector: 'app-specialty-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './specialty-create.component.html',
  styleUrl: './specialty-create.component.css'
})
export class SpecialtyCreateComponent {
  specialty: Specialty = {
    name: '',
    description: ''
  };

  constructor(private specialtyService: SpecialtyService, private router: Router) {}
  isFieldEmpty(field: string): boolean {
    return !field || field.trim().length === 0; // Verifica si el campo está vacío o contiene solo espacios en blanco
  }

  onRegister(): void {
    if (this.isFieldEmpty(this.specialty.name)) {
      alert('El nombre de la especialidad es obligatorio.');
      return;
    }

    this.specialtyService.createSpecialty(this.specialty).subscribe({
      next: (response) => {
        console.log('Especialidad registrada:', response);
        alert(response.message);
        this.router.navigate(['/dashboard']); // Redirige a la lista de especialidades
      },
      error: (error) => {
        console.error('Error al registrar la especialidad:', error);
        alert('Error al registrar la especialidad: ' + error.message);
      }
    });
  }

}
