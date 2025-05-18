import { Injectable } from '@angular/core';
import { Modulos } from '../../models/modulos.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Curso } from '../../models/curso.model';
import { Modulo } from '../../models/indicadores/ciclosYModulosConInciativas';

@Injectable({
  providedIn: 'root'
})
export class ModulosService {

  private apiUrl = 'http://localhost:8000/modulos';
  private modulo: Modulo[] = [];
  constructor(private http: HttpClient) { }

  getModulosList(): Observable<Modulos[]> {
    return this.http.get<Modulos[]>(this.apiUrl);
  }

  getModulosListById(id: number): Observable<Modulos[]> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Modulos[]>(url);
  }

  createModulo(modulo: Modulo): Observable<Modulo> {
    console.log(modulo);

    const requestBody = {
      nombreModulo: modulo.nombre_modulo
    };

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<Modulo>(this.apiUrl, requestBody, { headers }).pipe(
      tap(data => {
        console.log('Modulo creado:', data);
        this.modulo.push(data);
      }),
      catchError(error => {
        console.error('Error en la solicitud POST:', error);
        return throwError(error);
      })
    );
  }

  updateModulo(id: number, modulo: Modulos): Observable<Modulos> {
    const url = `${this.apiUrl}/${id}`;
    const requestBody = {
      nombreModulo: modulo.nombre,
      modulos: modulo.clases.map(clases => clases.id),
    };

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.put<Modulos>(url, requestBody, { headers }).pipe(
      tap(data => {
        console.log('Módulo actualizado:', data);
      }),
      catchError(error => {
        console.error('Error en la solicitud PUT:', error);
        return throwError(error);
      })
    );
  }

  deleteModulo(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url).pipe(
      tap(() => console.log(`Módulo con id ${id} eliminado`)),
      catchError(error => {
        console.error('Error en la solicitud DELETE:', error);
        return throwError(error);
      })
    );
  }

}