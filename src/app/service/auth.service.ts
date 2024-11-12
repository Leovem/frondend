import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AuthResponse {
  message: string; // Mensaje de respuesta
  role: string | null; // Rol del usuario
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth'; // Cambia esto a tu URL de API

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<AuthResponse> {
    const body = { email, password }; // Cuerpo de la solicitud
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, body, { headers });
  }

  // Método para registrar un usuario nuevo
  register(username: string, email: string, password: string, role: string): Observable<any> {
    const body = { username, email, password, role }; // Asegúrate de que los nombres de las claves coincidan
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<string>(`${this.apiUrl}/register`, body, { headers });
  }

//Actualizar usuario
  updateUser(id: number, userDetails: any): Observable<{ message: string }> {
    return this.http.put<{ message: string }>(`${this.apiUrl}/users/${id}`, userDetails);
  }
}
