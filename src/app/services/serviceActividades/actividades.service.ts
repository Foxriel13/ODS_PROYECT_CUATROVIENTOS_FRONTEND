import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Actividad } from '../../models/actividades.model';

@Injectable({
  providedIn: 'root'
})
export class ActividadesService {

  private apiUrl = 'http://localhost:8000/actividades';
  constructor(private http: HttpClient) { }

  getActividadesList(): Observable<Actividad[]> {
    return this.http.get<Actividad[]>(this.apiUrl);
  }

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

  actualizarActividad(actividad: Actividad): Observable<Actividad> {
    console.log(actividad);

    const requestBody = {
      nombre: actividad.nombre.toString()
    };

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

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
