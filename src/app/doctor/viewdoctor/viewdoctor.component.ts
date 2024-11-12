import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpecialtyService } from '../../service/specialty.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Doctor } from '../../models/doctor.model';
//import { SpecialtyService } from '../../service/specialty.service';

@Component({
  selector: 'app-viewdoctor',
  standalone: true,
  imports: [ ReactiveFormsModule, CommonModule ],
  templateUrl: './viewdoctor.component.html',
  styleUrl: './viewdoctor.component.css'
})
export class ViewdoctorComponent implements OnInit {
  doctors: Doctor[] = [];
  specialtyName: string = ''; // Define specialtyName aquí
  specialtyId!: number; // ID de la especialidad

  constructor(
    private route: ActivatedRoute,
    private specialtyService: SpecialtyService,
    //private specialtyService: SpecialtyService // Servicio para obtener el nombre de la especialidad
  ) {}

  ngOnInit(): void {
    // Obtener el specialtyId desde los parámetros de la ruta
    this.specialtyId = Number(this.route.snapshot.paramMap.get('specialtyId'));

    // Llamar a los servicios para cargar los médicos y el nombre de la especialidad
    this.getDoctorsBySpecialty(this.specialtyId);
  }

  getDoctorsBySpecialty(specialtyId: number): void {
    this.specialtyService.getDoctorsBySpecialty(specialtyId).subscribe({
      next: (data: Doctor[]) => {
        this.doctors = data;
        console.log('Médicos recibidos:', data); 
      },
      error: (error) => {
        console.error('Error al obtener médicos:', error);
      }
    });  
  }
  

  goBack(): void {
    window.history.back(); // O puedes usar el Router para navegar a la página anterior
  }
  
}
