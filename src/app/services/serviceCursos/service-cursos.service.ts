import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Curso } from '../../models/curso.model';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Modulos } from '../../models/modulos.model';

@Injectable({
  providedIn: 'root'
})
export class ServiceCursosService {

  private apiUrl = 'http://localhost:8000/clases'; // Reemplaza con tu URL de API
  constructor(private http: HttpClient) { }

  // Get cursos
  getCursosList(): Observable<Curso[]> {
    return this.http.get<Curso[]>(this.apiUrl);
  }

  //Obtener por Id
  getCursosListById(id: number): Observable<Curso[]> {
    let url = this.apiUrl + "/${" + id + "}";
    return this.http.get<Curso[]>(url);
  }

  // Crear curso
  createCurso(nombre: string): Observable<Curso> {
    return this.http.post<Curso>(this.apiUrl, { nombre });
  }

  //actualizar curso
  actualizarCurso(id: number, nombre: string): Observable<Curso> {
    return this.http.put<Curso>(`${this.apiUrl}/${id}`, { nombre });

  }
  //eliminar
  deleteCurso(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
