// src/app/services/iniciativas.service.ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Iniciativas } from '../models/iniciativas.model';  // Asegúrate de que la ruta sea correcta

@Injectable({
  providedIn: 'root',
})
export class IniciativasService {
  private iniciativas: Iniciativas[] = [
    new Iniciativas(
      1,
      'Mundillo',
      'Gobierno Local',
      'Equipo A',
      '2025-01-01',
      '2025-06-30',
      ['DAM', 'DAW'],
      ['Meta A1', 'Meta A2'],
      ['Fin de la pobreza'],
      'Producto A',
      'https://cdn-imgix.headout.com/tour/7064/TOUR-IMAGE/b2c74200-8da7-439a-95b6-9cad1aa18742-4445-dubai-img-worlds-of-adventure-tickets-02.jpeg?auto=format&w=900&h=562.5&q=90&fit=crop&ar=16%3A10'
    ),
    new Iniciativas(
      2,
      'Ciberseguridad',
      'Universidad X',
      'Equipo B',
      '2025-02-01',
      '2025-07-15',
      ['DAM', 'ASIR'],
      ['Meta B1', 'Meta B2'],
      ['Educación de calidad'],
      'Producto B',
      'https://imageio.forbes.com/specials-images/imageserve/650da7418bf6b2920bd5a9cc/0x0.jpg?format=jpg&crop=1848,1039,x0,y0,safe&height=900&width=1600&fit=bounds'
    )
  ];

  constructor() {}

  // Método para obtener todas las iniciativas
  getIniciativas(): Observable<Iniciativas[]> {
    return of(this.iniciativas);
  }

  // Método para filtrar las iniciativas según los parámetros
  filterIniciativas(filters: any): Observable<Iniciativas[]> {
    let filteredIniciativas = this.iniciativas;

    if (filters.curso) {
      filteredIniciativas = filteredIniciativas.filter((iniciativa) =>
        iniciativa.cursos.includes(filters.curso)
      );
    }

    if (filters.ods) {
      filteredIniciativas = filteredIniciativas.filter((iniciativa) =>
        iniciativa.metas.some((meta) => meta.includes(filters.ods))
      );
    }

    if (filters.fechaInicio) {
      filteredIniciativas = filteredIniciativas.filter(
        (iniciativa) => new Date(iniciativa.fechaInicio) >= new Date(filters.fechaInicio)
      );
    }

    if (filters.fechaFin) {
      filteredIniciativas = filteredIniciativas.filter(
        (iniciativa) => new Date(iniciativa.fechaFin) <= new Date(filters.fechaFin)
      );
    }

    if (filters.nombre) {
      filteredIniciativas = filteredIniciativas.filter((iniciativa) =>
        iniciativa.titulo.toLowerCase().includes(filters.nombre.toLowerCase())
      );
    }

    return of(filteredIniciativas);
  }
}
