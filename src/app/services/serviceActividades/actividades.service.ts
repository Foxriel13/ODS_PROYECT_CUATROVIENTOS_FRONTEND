import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Actividad } from '../../models/actividades.model';

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

  //POST
  createActividad(actividad: Actividad): Observable<Actividad> {
    console.log(actividad);
  
    const requestBody = {
      nombre: actividad.nombre.toString()
    };
  
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  
    return this.http.post<Actividad>(this.apiUrl, requestBody, { headers }).pipe(
      tap(data => {
        console.log('Actividad creada:', data);
      }),
      catchError(error => {
        console.error('Error en la solicitud POST:', error);
        return throwError(error);
      })
    );
  }
  
  //put
  actualizarActividad(actividad: Actividad): Observable<Actividad> {
    console.log(actividad);

    // El cuerpo de la solicitud contiene el nombre de la actividad
    const requestBody = {
      nombre: actividad.nombre.toString()
    };

    // Cabeceras de la solicitud
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // Usamos PUT para actualizar la actividad
    return this.http.put<Actividad>(`${this.apiUrl}/${actividad.id}`, requestBody, { headers }).pipe(
      tap(data => {
        console.log('Actividad actualizada:', data);
      }),
      catchError(error => {
        console.error('Error en la solicitud PUT:', error);
        return throwError(error);
      })
    );
}


  //delete
  deleteActividad(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => console.log(`Actividad con id ${id} eliminada`)),
      catchError(error => {
        console.error('Error en DELETE:', error);
        return throwError(error);
      })
    );
  }
}
