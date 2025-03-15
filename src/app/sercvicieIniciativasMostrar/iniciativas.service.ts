import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Iniciativas } from '../models/iniciativas.model';
import { param } from 'jquery';

@Injectable({
  providedIn: 'root',
})
export class IniciativasService {
  private apiUrl = 'http://localhost:8000/iniciativas';
  private iniciativas: Iniciativas[] = []; // Guardamos las iniciativas aquí

  constructor(private http: HttpClient) { }

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

    if (filters.ods) {
      filteredIniciativas = filteredIniciativas.filter((iniciativa) =>
        // Filtramos por los ODS dentro de las metas
        iniciativa.metas.some(meta => {
          if (Array.isArray(meta.idOds)) {
            return meta.idOds.some((ods: any) => ods.nombre.toLowerCase().includes(filters.ods.toLowerCase()));
          } else if (meta.idOds && meta.idOds.nombre) {
            return meta.idOds.nombre.toLowerCase().includes(filters.ods.toLowerCase());
          }
          return false;
        })
      );
    }

    if (filters.curso) {
      filteredIniciativas = filteredIniciativas.filter((iniciativa) =>
        // Filtramos por los cursos dentro de los módulos
        iniciativa.modulos.some(modulo => {
          if (Array.isArray(modulo.clase)) {
            return modulo.clase.some((curso: any) =>
              curso.nombre.toLowerCase().includes(filters.curso.toLowerCase())
            );
          } else if (modulo.clase && modulo.clase.nombre) {
            return modulo.clase.nombre.toLowerCase().includes(filters.curso.toLowerCase());
          }
          return false;
        })
      );
    }

    // Filtrar por fecha_registro
    if (filters.fechaRegistro) {
      filteredIniciativas = filteredIniciativas.filter(
        (iniciativa) => {
          const fechaIniciativa = new Date(iniciativa.fecha_registro);
          const fechaFiltro = new Date(filters.fechaRegistro);

          // Normalizamos las fechas para compararlas (convertimos a formato de fecha estándar)
          const fechaIniciativaFormato = fechaIniciativa.setHours(0, 0, 0, 0); // Eliminar hora para comparación solo de día
          const fechaFiltroFormato = fechaFiltro.setHours(0, 0, 0, 0);

          // Comparamos las fechas solo considerando la parte de día, mes y año
          return fechaIniciativaFormato === fechaFiltroFormato;
        }
      );
    }



    return of(filteredIniciativas); // Devolvemos los datos como un Observable
  }

  //Post
  createIniciativa(iniciativa: Iniciativas): Observable<Iniciativas> {
    console.log(iniciativa)
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Iniciativas>(this.apiUrl, iniciativa, { headers }).pipe(
      tap(data => {
        console.log('Iniciativa creada:', data);
        this.iniciativas.push(data);
      }),
      catchError(error => {
        console.error('Error en la solicitud POST:', error);
        return throwError(error);
      })
    );
  }

  //Put
  updateIniciativa(iniciativa: Iniciativas): Observable<Iniciativas> {
    const url = `${this.apiUrl}/${iniciativa.id}`;

    console.log(iniciativa)
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<Iniciativas>(url, iniciativa, { headers }).pipe(
      tap(data => {
        console.log('Iniciativa actualizada:', data); // Verifica la respuesta de la actualización
        // Aquí, si tienes un array de iniciativas, puedes actualizar la iniciativa en el array local (opcional)
        const index = this.iniciativas.findIndex(i => i.id === iniciativa.id);
        if (index !== -1) {
          this.iniciativas[index] = data; // Actualizas la iniciativa en el array local
        }
      }),
      catchError(error => {
        console.error('Error en la solicitud PUT:', error);
        return throwError(error);
      })
    );
  }



}
