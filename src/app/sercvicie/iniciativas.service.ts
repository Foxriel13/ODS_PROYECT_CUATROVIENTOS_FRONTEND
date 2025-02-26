import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Iniciativas } from '../models/iniciativas.model';

@Injectable({
  providedIn: 'root'  // Esto asegura que el servicio sea global
})
export class IniciativasService {

  private iniciativas: Iniciativas[] = [
    new Iniciativas(
      1,
      'Iniciativa Educativa A',
      'Gobierno Local',
      'Equipo A',
      '2025-01-01',
      '2025-06-30',
      ['Curso A1', 'Curso A2'],
      ['Módulo A1', 'Módulo A2'],
      ['Meta A1', 'Meta A2'],
      'Producto A',
      'https://cdn-imgix.headout.com/tour/7064/TOUR-IMAGE/b2c74200-8da7-439a-95b6-9cad1aa18742-4445-dubai-img-worlds-of-adventure-tickets-02.jpeg?auto=format&w=900&h=562.5&q=90&fit=crop&ar=16%3A10'  // Aquí agregas la URL de la imagen
    ),
    new Iniciativas(
      2,
      'Iniciativa Educativa B',
      'Universidad X',
      'Equipo B',
      '2025-02-01',
      '2025-07-15',
      ['Curso B1', 'Curso B2'],
      ['Módulo B1', 'Módulo B2'],
      ['Meta B1', 'Meta B2'],
      'Producto B',
      'https://via.placeholder.com/150'  // Aquí agregas la URL de la imagen
    )
  ];

  constructor() {}

  getIniciativas(): Observable<Iniciativas[]> {
    return of(this.iniciativas);
  }

  createIniciativa(data: Iniciativas): Observable<any> {
    const nuevaIniciativa = new Iniciativas(
      this.iniciativas.length + 1,
      data.titulo,
      data.contratante,
      data.equipoEducativo,
      data.fechaInicio,
      data.fechaFin,
      data.cursos,
      data.modulos,
      data.metas,
      data.producto,
      data.imagenUrl  // Incluyendo imagenUrl
    );
    this.iniciativas.push(nuevaIniciativa);
    return of({ message: 'Iniciativa creada con éxito' });
  }

  formatIniciativa(iniciativa: Iniciativas): any {
    return {
      id: iniciativa.id,
      titulo: iniciativa.titulo,
      contratante: iniciativa.contratante,
      equipoEducativo: iniciativa.equipoEducativo,
      fechaInicio: new Date(iniciativa.fechaInicio).toISOString(),
      fechaFin: new Date(iniciativa.fechaFin).toISOString(),
      cursos: iniciativa.cursos,
      modulos: iniciativa.modulos,
      metas: iniciativa.metas,
      producto: iniciativa.producto,
      imagenUrl: iniciativa.imagenUrl  // Formateando imagenUrl también
    };
  }
}
