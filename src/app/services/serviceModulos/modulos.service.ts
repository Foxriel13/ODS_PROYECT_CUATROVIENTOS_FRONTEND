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

  // Obtener todos los Módulos
  getModulosList(): Observable<Modulos[]> {
    return this.http.get<Modulos[]>(this.apiUrl);
  }

  //Obtener por Id
  getModulosListById(id: number): Observable<Modulos[]> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Modulos[]>(url);
  }


  //Post
  createModulo(modulo: Modulo): Observable<Modulo> {
    console.log(modulo);

    const requestBody = {
      nombreModulo: modulo.nombre_modulo
    };

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<Modulo>(this.apiUrl, requestBody, { headers }).pipe(
      tap(data => {
        console.log('Modulo creado:', data);
        this.modulo.push(data);  // Suponiendo que 'this.iniciativas' es un array donde guardas las iniciativas
      }),
      catchError(error => {
        console.error('Error en la solicitud POST:', error);
        return throwError(error);
      })
    );
  }

  //Put
  updateModulo(id: number, modulo: Modulos): Observable<Modulos> {
    const url = `${this.apiUrl}/${id}`;
    const requestBody = {
      nombreModulo: modulo.nombre,
      modulos: modulo.clase.map(clase => clase.id),
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

  //Delete
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