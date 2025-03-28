import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Curso } from '../models/curso.model';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Modulos } from '../models/modulos.model';

@Injectable({
  providedIn: 'root'
})
export class ServiceCursosService {

  private apiUrl = 'http://localhost:8000/clases'; // Reemplaza con tu URL de API
  constructor(private http: HttpClient) { }

  // Obtener todos los ODS de la base de datos
  getCursosList(): Observable<Curso[]> {
    return this.http.get<Curso[]>(this.apiUrl);
  }

  //Obtener por Id
  getCursosListById(id: number): Observable<Curso[]> {
    let url = this.apiUrl + "/${" + id + "}";
    return this.http.get<Curso[]>(url);
  }
}
