import { Injectable } from '@angular/core';
import { Metas } from '../../models/metas.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MetasService {

 private apiUrl = 'http://localhost:8000/metas'; // Reemplaza con tu URL de API
 
   constructor(private http: HttpClient) { }
 
   // Obtener todas las metas
   getMetasList(): Observable<Metas[]> {
     return this.http.get<Metas[]>(this.apiUrl);
   }
 
   //Obtener por Id
   getMetasListById(id: number): Observable<Metas[]> {
     let url = this.apiUrl + "/${" + id + "}";
     return this.http.get<Metas[]>(url);
   }
 
   // Post crear
   createMeta(meta: Metas, idPos: number): Observable<Metas> {
    const requestBody = {
      descripcion: meta.descripcion,
      ods: idPos
    };    

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<Metas>(this.apiUrl, requestBody, { headers }).pipe(
      tap(data => console.log('Meta creada:', data)),
      catchError(error => {
        console.error('Error en POST:', error);
        return throwError(error);
      })
    );
  }
  //Put
  actualizarMeta(meta: Metas, idPos: number): Observable<Metas> {
    const url = `${this.apiUrl}/${meta.id}`;
    const requestBody = {
      descripcion: meta.descripcion,
      ods: idPos
    };

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.put<Metas>(url, requestBody, { headers }).pipe(
      tap(data => console.log('Meta actualizada:', data)),
      catchError(error => {
        console.error('Error en PUT:', error);
        return throwError(error);
      })
    );
  }

  //Delete
  deleteMeta(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => console.log(`Meta con id ${id} eliminada`)),
      catchError(error => {
        console.error('Error en DELETE:', error);
        return throwError(error);
      })
    );
  }
 }