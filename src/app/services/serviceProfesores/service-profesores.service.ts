import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Profesores } from '../../models/profesores.model';

@Injectable({
  providedIn: 'root'
})
export class ServiceProfesoresService {

  private apiUrl = 'http://localhost:8000/profesores'; // Reemplaza con tu URL de API

  constructor(private http: HttpClient) { }

  // Obtener todos los profesores 
  getProfesoresList(): Observable<Profesores[]> {
    return this.http.get<Profesores[]>(this.apiUrl);
  }

  //Obtener por Id
  getProfesoresListById(id: number): Observable<Profesores[]> {
    let url = this.apiUrl + "/${" + id + "}";
    return this.http.get<Profesores[]>(url);
  }

  //Post
  createProfesor(profesor: Profesores): Observable<Profesores> {
    console.log(profesor);
  
    const requestBody = {
      nombre: profesor.nombre.toString()
    };
  
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  
    return this.http.post<Profesores>(this.apiUrl, requestBody, { headers }).pipe(
      tap(data => {
        console.log('Profesor creada:', data);
      }),
      catchError(error => {
        console.error('Error en la solicitud POST:', error);
        return throwError(error);
      })
    );
  }

  //Put
  actualizarProfesor(id: number, nombre: string): Observable<Profesores> {
    let url = this.apiUrl + "/${" + id + "}";
    return this.http.put<Profesores>(url, { nombre });
  }
  //Delete
  eliminarProfesor(id: number): Observable<void> {
    let url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
