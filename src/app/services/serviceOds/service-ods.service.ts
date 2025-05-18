import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Ods } from '../../models/ods.model';
import { toDimension } from 'chart.js/helpers';

@Injectable({
  providedIn: 'root'
})
export class ServiceOdsService {

  private apiUrl = 'http://localhost:8000/ods';

  constructor(private http: HttpClient) {}

  getOdsList(): Observable<Ods[]> {
    return this.http.get<Ods[]>(this.apiUrl);
  }

  getOdsListById(id: number): Observable<Ods[]> {
    let url = `${this.apiUrl}/${id}`;
    return this.http.get<Ods[]>(url);
  }

  createOds(ods: Ods): Observable<Ods> {
    const requestBody = {
      nombre: ods.nombre,
      dimension: ods.dimension
    };    

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<Ods>(this.apiUrl, requestBody, { headers }).pipe(
      tap(data => console.log('Ods creada:', data)),
      catchError(error => {
        console.error('Error en POST:', error);
        return throwError(error);
      })
    );
  }

  actualizarOds( nombre: string, dimension: string): Observable<Ods> {
    return this.http.put<Ods>(this.apiUrl, { nombre, dimension });
  }

  eliminarOds(id: number): Observable<void> {
    let url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}