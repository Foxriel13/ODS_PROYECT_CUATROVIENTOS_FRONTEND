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
}