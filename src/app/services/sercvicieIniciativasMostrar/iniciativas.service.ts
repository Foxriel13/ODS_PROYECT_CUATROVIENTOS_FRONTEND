import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Iniciativas } from '../../models/iniciativas.model';
import { param } from 'jquery';
import { Redes_Sociales } from '../../models/redes_sociales';

@Injectable({
  providedIn: 'root',
})
export class IniciativasService {
  private apiUrl = 'http://localhost:8000/iniciativas';
  private iniciativas: Iniciativas[] = [];

  constructor(private http: HttpClient) { }

  getIniciativas(): Observable<Iniciativas[]> {
    return this.http.get<Iniciativas[]>(this.apiUrl).pipe(
      tap(data => {
        console.log('Iniciativas recibidas:', data);
        this.iniciativas = data;
      }),
      catchError(error => {
        console.error('Error al obtener iniciativas', error);
        return throwError(error);
      })
    );
  }

  filterIniciativas(filters: any): Observable<Iniciativas[]> {
    let filteredIniciativas = [...this.iniciativas];

    if (filters.nombre) {
      filteredIniciativas = filteredIniciativas.filter((iniciativa) =>
        iniciativa.nombre.toLowerCase().includes(filters.nombre.toLowerCase())
      );
    }

    if (filters.ods) {
      filteredIniciativas = filteredIniciativas.filter((iniciativa) =>
        iniciativa.metas.some(meta => {
          if (Array.isArray(meta.ods)) {
            return meta.ods.some((ods: any) => ods.nombre.toLowerCase().includes(filters.ods.toLowerCase()));
          } else if (meta.ods && meta.ods.nombre) {
            return meta.ods.nombre.toLowerCase().includes(filters.ods.toLowerCase());
          }
          return false;
        })
      );
    }

    if (filters.fechaRegistro) {
      filteredIniciativas = filteredIniciativas.filter(
        (iniciativa) => {
          const fechaIniciativa = new Date(iniciativa.fecha_registro);
          const fechaFiltro = new Date(filters.fechaRegistro);

          const fechaIniciativaFormato = fechaIniciativa.setHours(0, 0, 0, 0);
          const fechaFiltroFormato = fechaFiltro.setHours(0, 0, 0, 0);

          return fechaIniciativaFormato === fechaFiltroFormato;
        }
      );
    }

    return of(filteredIniciativas); 

  }

  createIniciativa(iniciativa: Iniciativas): Observable<Iniciativas> {
    console.log(iniciativa);
  
    const requestBody = {
      tipo: iniciativa.tipo.toString(),
      horas: Number(iniciativa.horas),
      nombre: iniciativa.nombre.toString(),
      explicacion: iniciativa.explicacion.toString(),
      fecha_inicio: new Date(iniciativa.fecha_inicio).toISOString().slice(0, 19).replace('T', ' '), 
      fecha_fin: new Date(iniciativa.fecha_fin).toISOString().slice(0, 19).replace('T', ' '),
      eliminado: Boolean(iniciativa.eliminado),
      innovador: Boolean(iniciativa.innovador),
      anyo_lectivo: iniciativa.anyo_lectivo.toString(),
      imagen: iniciativa.imagen.toString(),
      mas_comentarios: iniciativa.mas_comentarios.toString(),
      metas: iniciativa.metas.map(meta => Number(meta.id)),
      profesores: iniciativa.profesores.map(profesor => Number(profesor.id)),
      entidades_externas: iniciativa.entidades_externas.map(entidad => Number(entidad.id)),
      modulos: iniciativa.modulos.map(modulo => ({
        id: Number(modulo.id),
        clasess: modulo.clases.map(clases => Number(clases.id))
      })),
      redes_sociales: iniciativa.redes_sociales.map(red => Number(red.id)),
      actividades: iniciativa.actividades.map(actividad => Number(actividad.id))
    };
    
  
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  
    return this.http.post<Iniciativas>(this.apiUrl, requestBody, { headers }).pipe(
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
  

  updateIniciativa(iniciativa: Iniciativas): Observable<Iniciativas> {
    console.log(iniciativa);
    const requestBody = {
      id: iniciativa.id,
      horas: iniciativa.horas.toString(),  
      nombre: iniciativa.nombre.toString(),
      explicacion: iniciativa.explicacion.toString(),
      fecha_inicio: iniciativa.fecha_inicio.toString(), 
      fecha_fin: iniciativa.fecha_fin.toString(),  
      eliminado: iniciativa.eliminado,  
      innovador: iniciativa.innovador,  
      anyo_lectivo: iniciativa.anyo_lectivo.toString(),
      imagen: iniciativa.imagen.toString(),
      mas_comentarios: iniciativa.mas_comentarios.toString(),
      metas: iniciativa.metas.map(meta => meta.id),  
      profesores: iniciativa.profesores.map(profesor => profesor.id),
      entidades_externas: iniciativa.entidades_externas.map(entidad => entidad.id),
      modulos: iniciativa.modulos.map(modulo => modulo.id),
      redes_sociales: iniciativa.redes_sociales.map(red => red.id),

    };
    console.log(requestBody.metas)
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    console.log(`${this.apiUrl}/${iniciativa.id}`);
    return this.http.put<Iniciativas>(`${this.apiUrl}/${iniciativa.id}`, requestBody, { headers }).pipe(
      tap(data => {
        console.log('Iniciativa actualizada:', data);
        const index = this.iniciativas.findIndex(i => i.id === iniciativa.id);
        if (index !== -1) {
          this.iniciativas[index] = data;
        }
      }),
      catchError(error => {
        console.error('Error en la solicitud PUT:', error);
        return throwError(error);
      })
    );
  }




  deleteIniciativa(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.delete<void>(url, { headers }).pipe(
      tap(() => {
        console.log(`Iniciativa con id ${id} eliminada correctamente.`);
      }),
      catchError(error => {
        console.error('Error al eliminar la iniciativa:', error);
        return throwError(error);
      })
    );
  }
}
