import { Injectable } from '@angular/core';
import { entidades_externas } from '../models/entidades_externas.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceEntidadesService {

  private apiUrl = 'http://localhost:8000/entidadesexternas'; // Reemplaza con tu URL de API
      
        constructor(private http: HttpClient) {}
      
        // Obtener todos los ODS de la base de datos
        getEntidadesList(): Observable<entidades_externas[]> {
          return this.http.get<entidades_externas[]>(this.apiUrl);
        }
      }