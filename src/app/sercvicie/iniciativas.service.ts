// iniciativas.service.ts
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
      tap(data => {
        console.log('Iniciativas recibidas:', data);  // Verifica los datos que estás recibiendo
        this.iniciativas = data;
      }),
      catchError(error => {
        console.error('Error al obtener iniciativas', error);
        return throwError(error);
      })
    );
  }
  

  // Filtrar iniciativas en el frontend sin hacer peticiones a Symfony
  filterIniciativas(filters: any): Observable<Iniciativas[]> {
    let filteredIniciativas = [...this.iniciativas]; // Copiamos el array para no modificar el original

    if (filters.nombre) {
      filteredIniciativas = filteredIniciativas.filter((iniciativa) =>
        iniciativa.nombre.toLowerCase().includes(filters.nombre.toLowerCase())
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

    if (filters.ods) {
      filteredIniciativas = filteredIniciativas.filter((iniciativa) =>
        // Filtramos por los ODS dentro de las metas
        iniciativa.metas.some(meta => {
          // Verificación de que meta.ods sea un array de Ods o un solo objeto Ods
          if (Array.isArray(meta.ods)) {
            // Si meta.ods es un array, lo filtramos
            return meta.ods.some((ods: any) => ods.nombre.toLowerCase().includes(filters.ods.toLowerCase()));
          } else if (meta.ods && meta.ods.nombre) {
            // Si meta.ods es un solo objeto, lo tratamos como tal
            return meta.ods.nombre.toLowerCase().includes(filters.ods.toLowerCase());
          }
          return false; // Si no tiene el formato esperado, lo ignoramos
        })
      );
    }

    if (filters.curso) {
      filteredIniciativas = filteredIniciativas.filter((iniciativa) =>
        // Filtramos por los cursos dentro de los módulos
        iniciativa.modulos.some(modulo => {
          // Verificación de que modulo.curso sea un objeto de curso o un array de cursos
          if (Array.isArray(modulo.curso)) {
            // Si modulo.curso es un array, lo filtramos
            return modulo.curso.some((curso: any) =>
              curso.nombre.toLowerCase().includes(filters.curso.toLowerCase())
            );
          } else if (modulo.curso && modulo.curso.nombre) {
            // Si modulo.curso es un solo objeto de curso, lo tratamos como tal
            return modulo.curso.nombre.toLowerCase().includes(filters.curso.toLowerCase());
          }
          return false; // Si no tiene el formato esperado, lo ignoramos
        })
      );
    }
    
    

    return of(filteredIniciativas); // Devolvemos los datos como un Observable
  }
}
