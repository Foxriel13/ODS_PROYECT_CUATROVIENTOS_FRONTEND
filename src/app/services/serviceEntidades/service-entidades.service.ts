import { Injectable } from '@angular/core';
import { entidadesExternas } from '../../models/entidades_externas.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
}