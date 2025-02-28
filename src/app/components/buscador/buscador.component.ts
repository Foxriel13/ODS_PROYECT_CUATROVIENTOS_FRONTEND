import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-buscador',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css']
})
export class BuscadorComponent {
  cursos = ['DAM', 'DAW', 'ASIR'];
  odsList = ['Fin de la pobreza', 'Educación de calidad', 'Igualdad de género'];

  curso = '';
  ods = '';
  fechaInicio: string | null = null;
  fechaFin: string | null = null;
  nombre = '';

  @Output() filtersChanged = new EventEmitter<any>();  // Emite los filtros al componente principal

  // BuscadorComponent
  buscar(): void {
    this.filtersChanged.emit({
      curso: this.curso,
      ods: this.ods,
      fechaInicio: this.fechaInicio,
      fechaFin: this.fechaFin,
      nombre: this.nombre
    });
  }
}
