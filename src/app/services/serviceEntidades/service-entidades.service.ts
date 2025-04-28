import { Injectable } from '@angular/core';
import { entidadesExternas } from '../../models/entidades_externas.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceEntidadesService {

  private apiUrl = 'http://localhost:8000/entidadesexternas'; // Reemplaza con tu URL de API

  constructor(private http: HttpClient) { }

  // Obtener todos los ODS de la base de datos
  getEntidadesList(): Observable<entidadesExternas[]> {
    return this.http.get<entidadesExternas[]>(this.apiUrl);
  }

  //Obtener por Id
  getEntidadesListById(id: number): Observable<entidadesExternas[]> {
    let url = this.apiUrl + "/${" + id + "}";
    return this.http.get<entidadesExternas[]>(url);
  }
  //Crear post
  createEntidad(profesor: entidadesExternas): Observable<entidadesExternas> {
    console.log(profesor);
  
    const requestBody = {
      nombre: profesor.nombre.toString()
    };
  
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  
    return this.http.post<entidadesExternas>(this.apiUrl, requestBody, { headers }).pipe(
      tap(data => {
        console.log('Profesor creada:', data);
      }),
      catchError(error => {
        console.error('Error en la solicitud POST:', error);
        return throwError(error);
      })
    );
  }

  //Actualizar 
  updateEntidad(id: number, nombre: String): Observable<entidadesExternas> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<entidadesExternas>(url, nombre);
  }

  //Delete
  deleteEntidad(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }

}