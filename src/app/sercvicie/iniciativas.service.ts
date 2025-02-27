import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Iniciativas } from '../models/iniciativas.model';

@Injectable({
  providedIn: 'root',
})
export class IniciativasService {
  private apiUrl = 'http://localhost:8000/iniciativas';

  constructor(private http: HttpClient) {}

  // Obtener todas las iniciativas
  getIniciativas(): Observable<Iniciativas[]> {
    return this.http.get<Iniciativas[]>(this.apiUrl).pipe(
      catchError(error => {
        console.error('Error al obtener iniciativas', error);
        return throwError(error);
      })
    );
  }

  // Filtrar iniciativas con parámetros
  filterIniciativas(filters: any): Observable<Iniciativas[]> {
    let params = new HttpParams();
    Object.keys(filters).forEach(key => {
      if (filters[key]) {
        params = params.set(key, filters[key]);
      }
    });
  
    const fullUrl = `${this.apiUrl}?${params.toString()}`;
    console.log('URL enviada al backend:', fullUrl);  // 🔍 Verifica la URL generada
  
    return this.http.get<Iniciativas[]>(this.apiUrl, { params }).pipe(
      catchError(error => {
        console.error('Error al filtrar iniciativas', error);
        return throwError(error);
      })
    );
  }
  
}
