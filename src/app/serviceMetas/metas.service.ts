import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Metas } from '../models/metas.model';

@Injectable({
  providedIn: 'root'
})
export class MetasService {

 private apiUrl = 'http://localhost:8000/metas'; // Reemplaza con tu URL de API
 
   constructor(private http: HttpClient) { }
 
   // Obtener todos los ODS de la base de datos
   getMetasList(): Observable<Metas[]> {
     return this.http.get<Metas[]>(this.apiUrl);
   }
 
   //Obtener por Id
   getMetasListById(id: number): Observable<Metas[]> {
     let url = this.apiUrl + "/${" + id + "}";
     return this.http.get<Metas[]>(url);
   }
 }