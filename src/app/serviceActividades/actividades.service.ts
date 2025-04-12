import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Actividad } from '../models/actividades.model';

@Injectable({
  providedIn: 'root'
})
export class ActividadesService {

  private apiUrl = 'http://localhost:8000/actividades'; // Reemplaza con tu URL de API
  constructor(private http: HttpClient) { }

  // Obtener todos los ODS de la base de datos
  getActividadesList(): Observable<Actividad[]> {
    return this.http.get<Actividad[]>(this.apiUrl);
  }

  CreateActividadesList(actividades: Actividad): Observable<Actividad> {  // 🔹 Agregado Observable
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  
      const requestBody = {
        nombre: actividades.nombre,
      };
  
      return this.http.post<Actividad>(this.apiUrl, requestBody, { headers });  // 🔹 Devuelve la petición
    }
}
