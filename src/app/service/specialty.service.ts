// user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Specialty } from '../models/specialty.model'; 

@Injectable({
  providedIn: 'root',
})
export class SpecialtyService {
  private apiUrl = 'http://localhost:8080/api/specialty'; // URL base

  constructor(private http: HttpClient) {}

  // Obtener todas las especialidades
  getSpecialties(): Observable<Specialty[]> {
    return this.http.get<Specialty[]>(`${this.apiUrl}/all`);
  }

  // Crear una nueva especialidad
  createSpecialty(specialty: Specialty): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, specialty);
  }

   // Método para obtener médicos por especialidad
   getDoctorsBySpecialty(specialtyId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/doctors/${specialtyId}`);
  }
}
