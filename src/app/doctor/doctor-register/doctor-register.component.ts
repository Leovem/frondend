import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../../service/doctor.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-doctor-register',
  standalone: true,
  imports: [ ReactiveFormsModule, CommonModule ],
  templateUrl: './doctor-register.component.html',
  styleUrl: './doctor-register.component.css'
})
export class DoctorRegisterComponent implements OnInit {
  doctorForm: FormGroup;


  constructor(private fb: FormBuilder, private doctorService: DoctorService) {
    this.doctorForm = this.fb.group({
      userId: ['', Validators.required],
      specialtyId: ['', Validators.required],
      licenseNumber: ['', [Validators.required, Validators.maxLength(50)]]
    });
  }

  ngOnInit() {
    // Cargar listas de usuarios y especialidades
  }


  onSubmit(): void {
    if (this.doctorForm.valid) {
      const doctorData = this.doctorForm.value;
  
      this.doctorService.createDoctor(doctorData).subscribe({
        next: (response) => {
          console.log('Doctor registrado con éxito', response);
          this.doctorForm.reset();
        },
        error: (error) => {
          console.error('Error al registrar el doctor', error);
        },
        complete: () => {
          console.log('Registro de doctor completado');
        }
      });
    }
  }
  
}
