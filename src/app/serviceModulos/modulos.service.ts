import { Injectable } from '@angular/core';
import { Modulos } from '../models/modulos.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModulosService {

  private apiUrl = 'http://localhost:8000/modulos'; // Reemplaza con tu URL de API
   
     constructor(private http: HttpClient) { }
   
     // Obtener todos los ODS de la base de datos
     getModulosList(): Observable<Modulos[]> {
       return this.http.get<Modulos[]>(this.apiUrl);
     }
   
     //Obtener por Id
     getModulosListById(id: number): Observable<Modulos[]> {
       let url = this.apiUrl + "/${" + id + "}";
       return this.http.get<Modulos[]>(url);
     }
   }