import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Profesores } from '../../models/profesores.model';

@Injectable({
  providedIn: 'root'
})
export class ServiceProfesoresService {

  private apiUrl = 'http://localhost:8000/profesores'; // Reemplaza con tu URL de API

  constructor(private http: HttpClient) { }

  // Obtener todos los ODS de la base de datos
  getProfesoresList(): Observable<Profesores[]> {
    return this.http.get<Profesores[]>(this.apiUrl);
  }

  //Obtener por Id
  getProfesoresListById(id: number): Observable<Profesores[]> {
    let url = this.apiUrl + "/${" + id + "}";
    return this.http.get<Profesores[]>(url);
  }
}
