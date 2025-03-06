import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Dimension } from '../models/dimension.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceDimensionService {

  private apiUrl = 'http://localhost:8000/dimension'; // Reemplaza con tu URL de API
  
    constructor(private http: HttpClient) {}
  
    // Obtener todos los ODS de la base de datos
    getDimensionesList(): Observable<Dimension[]> {
      return this.http.get<Dimension[]>(this.apiUrl);
    }
  }