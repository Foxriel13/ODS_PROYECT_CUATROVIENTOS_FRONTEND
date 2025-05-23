import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Curso } from '../../models/curso.model';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Modulos } from '../../models/modulos.model';

@Injectable({
  providedIn: 'root'
})
export class ServiceCursosService {

  private apiUrl = 'http://localhost:8000/clases';
  constructor(private http: HttpClient) { }

  getCursosList(): Observable<Curso[]> {
    return this.http.get<Curso[]>(this.apiUrl);
  }

  getCursosListById(id: number): Observable<Curso[]> {
    let url = this.apiUrl + "/${" + id + "}";
    return this.http.get<Curso[]>(url);
  }

  createCusro(curso: Curso): Observable<Curso> {
      const requestBody = {
        nombre: curso.nombre
      };    
  
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  
      return this.http.post<Curso>(this.apiUrl, requestBody, { headers }).pipe(
        tap(data => console.log('Curso creada:', data)),
        catchError(error => {
          console.error('Error en POST:', error);
          return throwError(error);
        })
      );
    }

  actualizarCurso(id: number, nombre: string): Observable<Curso> {
    return this.http.put<Curso>(`${this.apiUrl}/${id}`, { nombre });

  }
  deleteCurso(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
