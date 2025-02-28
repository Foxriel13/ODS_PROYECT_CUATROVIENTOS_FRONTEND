import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Iniciativas } from '../models/iniciativas.model';

@Injectable({
  providedIn: 'root',
})
export class IniciativasService {
  private apiUrl = 'http://localhost:8000/iniciativas';
  private iniciativas: Iniciativas[] = []; // Guardamos las iniciativas aquí

  constructor(private http: HttpClient) {}

  // Obtener todas las iniciativas y almacenarlas en el servicio
  getIniciativas(): Observable<Iniciativas[]> {
    return this.http.get<Iniciativas[]>(this.apiUrl).pipe(
      tap(data => this.iniciativas = data), // Guardamos los datos localmente
      catchError(error => {
        console.error('Error al obtener iniciativas', error);
        return throwError(error);
      })
    );
  }

  // Filtrar iniciativas en el frontend sin hacer peticiones a Symfony
  filterIniciativas(filters: any): Observable<Iniciativas[]> {
    let filteredIniciativas = [...this.iniciativas]; // Copiamos el array para no modificar el original

    if (filters.curso) {
      filteredIniciativas = filteredIniciativas.filter((iniciativa) =>
        iniciativa.curso.includes(filters.curso)
      );
    }

    if (filters.ods) {
      filteredIniciativas = filteredIniciativas.filter((iniciativa) =>
        iniciativa.ods.toLowerCase().includes(filters.ods.toLowerCase())
      );
    }

    if (filters.fechaInicio) {
      filteredIniciativas = filteredIniciativas.filter(
        (iniciativa) => new Date(iniciativa.fecha_inicio) >= new Date(filters.fechaInicio)
      );
    }

    if (filters.fechaFin) {
      filteredIniciativas = filteredIniciativas.filter(
        (iniciativa) => new Date(iniciativa.fecha_fin) <= new Date(filters.fechaFin)
      );
    }

    if (filters.nombre) {
      filteredIniciativas = filteredIniciativas.filter((iniciativa) =>
        iniciativa.nombre.toLowerCase().includes(filters.nombre.toLowerCase())
      );
    }

    return of(filteredIniciativas); // Devolvemos los datos como un Observable
  }
}
