import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Redes_Sociales } from '../models/redes_sociales';

@Injectable({
  providedIn: 'root'
})
export class RedesSocialesService {
  private apiUrl = 'http://localhost:8000/redes_sociales';

  constructor(private http: HttpClient) { }

  // Obtener todas las Redes Sociales
  getRedesSocialesList(): Observable<Redes_Sociales[]> {
    return this.http.get<Redes_Sociales[]>(this.apiUrl);
  }

  // Enviar una nueva Red Social a la BBDD
  CreateRedesSocialesList(redSocial: Redes_Sociales): Observable<Redes_Sociales> {  // 🔹 Agregado Observable
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    const requestBody = {
      nombre: redSocial.nombre,
      enlace: redSocial.enlace
    };

    return this.http.post<Redes_Sociales>(this.apiUrl, requestBody, { headers });  // 🔹 Devuelve la petición
  }

  // Actualizar una Red Social en la BBDD
  UpdateRedesSocialesList(redSocial: Redes_Sociales): Observable<Redes_Sociales> { // 🔹 Agregado Observable
    const url = `${this.apiUrl}/${redSocial.id}`;  // 🔹 Formato correcto de la URL

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    const requestBody = {
      nombre: redSocial.nombre,
      enlace: redSocial.enlace
    };

    return this.http.put<Redes_Sociales>(url, requestBody, { headers });  // 🔹 Devuelve la petición
  }
}
