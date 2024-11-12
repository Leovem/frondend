// doctor.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Doctor } from '../models/doctor.model';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  private apiUrl = 'http://localhost:8080/api/doctor'; // Cambia esto según tu URL de backend

  constructor(private http: HttpClient) {}

  // Método para obtener la lista de médicos
  getDoctors(): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(`${this.apiUrl}/all`);
    
  }

  // Método para crear un nuevo médico
  createDoctor(doctor: Doctor): Observable<Doctor> {
    return this.http.post<Doctor>(`${this.apiUrl}/create`, doctor);
  }

  // Método para eliminar un médico por ID
  deleteDoctor(doctorId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${doctorId}`);
  }

  // Método para actualizar un médico
  updateDoctor(doctorId: number, doctor: Doctor): Observable<Doctor> {
    return this.http.put<Doctor>(`${this.apiUrl}/${doctorId}`, doctor);
  }

  // Obtener lista de usuarios para selección
  getUsers(): Observable<any> {
    return this.http.get('http://localhost:8080/api/users/all');
  }

  // Obtener lista de especialidades para selección
  getSpecialties(): Observable<any> {
    return this.http.get('http://localhost:8080/api/specialties/all');
  }
}
