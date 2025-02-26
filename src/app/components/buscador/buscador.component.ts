import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css'],
  imports: [CommonModule, FormsModule]
})
export class BuscadorComponent {
  cursos = ['DAM', 'DAW', 'ASIR'];
  odsList = ['Fin de la pobreza', 'Educación de calidad', 'Igualdad de género'];

  curso = '';
  ods = '';
  fechaInicio: string | null = null;
  fechaFin: string | null = null;
  nombre = '';

  buscar() {
    console.log('Buscando con los filtros:', {
      curso: this.curso,
      ods: this.ods,
      fechaInicio: this.fechaInicio,
      fechaFin: this.fechaFin,
      nombre: this.nombre
    });
  }
}
