import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Curso } from '../models/curso.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceCursosService {

  private apiUrl = 'http://localhost:8000/cursos'; // Reemplaza con tu URL de API
    
      constructor(private http: HttpClient) {}
    
      // Obtener todos los ODS de la base de datos
      getCursosList(): Observable<Curso[]> {
        return this.http.get<Curso[]>(this.apiUrl);
      }
    }
  