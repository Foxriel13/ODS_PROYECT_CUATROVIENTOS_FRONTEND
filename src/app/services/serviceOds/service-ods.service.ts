import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ods } from '../../models/ods.model';

@Injectable({
  providedIn: 'root'
})
export class ServiceOdsService {

  private apiUrl = 'http://localhost:8000/ods'; // Reemplaza con tu URL de API

  constructor(private http: HttpClient) {}

  // Obtener todos los ODS de la base de datos
  getOdsList(): Observable<Ods[]> {
    return this.http.get<Ods[]>(this.apiUrl);
  }

  //Obtener por Id
  getOdsListById(id: number): Observable<Ods[]> {
    let url = `${this.apiUrl}/${id}`;
    return this.http.get<Ods[]>(url);
  }

  //Post

  crearOds(nombre: string, dimension: string): Observable<Ods> {
    return this.http.post<Ods>(this.apiUrl, { nombre, dimension });
  }

  //Put
  actualizarOds( nombre: string, dimension: string): Observable<Ods> {
    return this.http.put<Ods>(this.apiUrl, { nombre, dimension });
  }

  //Delete
  eliminarOds(id: number): Observable<void> {
    let url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}