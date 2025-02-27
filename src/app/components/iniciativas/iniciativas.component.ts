import { Component, OnInit } from '@angular/core';
import { IniciativasService } from '../../sercvicie/iniciativas.service';
import { Iniciativas } from '../../models/iniciativas.model';
import { CommonModule } from '@angular/common';
import { BuscadorComponent } from '../buscador/buscador.component';

@Component({
  selector: 'app-iniciativas',
  standalone: true,
  imports: [BuscadorComponent, CommonModule],
  templateUrl: './iniciativas.component.html',
  styleUrls: ['./iniciativas.component.scss']
})
export class IniciativasComponent implements OnInit {
  iniciativas: Iniciativas[] = [];  // Lista completa de iniciativas
  iniciativasFiltradas: Iniciativas[] = [];  // Lista filtrada
  filters = {
    curso: '',
    ods: '',
    fechaInicio: '',
    fechaFin: '',
    nombre: ''
  };

  constructor(private iniciativasService: IniciativasService) { }

  ngOnInit(): void {
    this.loadIniciativas();
  }

  // Cargar todas las iniciativas
  loadIniciativas(): void {
    this.iniciativasService.getIniciativas().subscribe(
      (data: Iniciativas[]) => {
        this.iniciativas = data;
        this.iniciativasFiltradas = data; // Al inicio, mostramos todo
      },
      (error) => {
        console.error('Error al cargar las iniciativas', error);
      }
    );
  }

  // Método para recibir cambios de filtros desde el componente Buscador
  onFiltersChanged(updatedFilters: any): void {
    this.filters = { ...this.filters, ...updatedFilters };
  
    // Llamada al servicio para filtrar los datos
    this.iniciativasService.filterIniciativas(this.filters).subscribe(
      (data: Iniciativas[]) => {
        this.iniciativasFiltradas = data;
        console.log('Datos filtrados desde el backend:', this.iniciativasFiltradas);
      },
      (error) => {
        console.error('Error al obtener iniciativas filtradas', error);
      }
    );
  }
  

  // Método para filtrar las iniciativas en el front-end
  filtrarIniciativas(): void {
    let filteredIniciativas = this.iniciativas;

    // Filtrar por curso
    if (this.filters.curso) {
      filteredIniciativas = filteredIniciativas.filter((iniciativa) =>
        iniciativa.curso === this.filters.curso
      );
    }

    // Filtrar por ODS
    if (this.filters.ods) {
      filteredIniciativas = filteredIniciativas.filter((iniciativa) =>
        iniciativa.ods.toLowerCase().includes(this.filters.ods.toLowerCase())
      );
    }

    // Filtrar por fecha de inicio
    if (this.filters.fechaInicio) {
      filteredIniciativas = filteredIniciativas.filter(
        (iniciativa) => new Date(iniciativa.fecha_inicio) >= new Date(this.filters.fechaInicio)
      );
    }

    // Filtrar por fecha de fin
    if (this.filters.fechaFin) {
      filteredIniciativas = filteredIniciativas.filter(
        (iniciativa) => new Date(iniciativa.fecha_fin) <= new Date(this.filters.fechaFin)
      );
    }

    // Filtrar por nombre
    if (this.filters.nombre) {
      filteredIniciativas = filteredIniciativas.filter((iniciativa) =>
        iniciativa.nombre.toLowerCase().includes(this.filters.nombre.toLowerCase())
      );
    }

    this.iniciativasFiltradas = filteredIniciativas;

    console.log('Datos filtrados en Angular:', this.iniciativasFiltradas);
  }
}
