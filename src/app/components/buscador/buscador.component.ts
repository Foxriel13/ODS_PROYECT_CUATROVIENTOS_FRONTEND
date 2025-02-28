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
  nombre = '';
  fechaRegistro = '';  // Variable para la fecha de registro

  @Output() filtersChanged = new EventEmitter<any>();

  // Método para emitir los filtros incluyendo la fecha de registro
  buscar(): void {
    this.filtersChanged.emit({
      curso: this.curso,
      ods: this.ods,
      nombre: this.nombre,
      fechaRegistro: this.fechaRegistro // Se incluye fechaRegistro en el filtro
    });
  }
}
