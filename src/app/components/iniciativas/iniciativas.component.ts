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
    this.filters = updatedFilters;
    this.buscar(); // Llamamos al método de búsqueda para aplicar los filtros
  }

  // Buscar iniciativas con filtros
  buscar(): void {
    this.iniciativasService.filterIniciativas(this.filters).subscribe(
      (filteredData: Iniciativas[]) => {
        this.iniciativasFiltradas = filteredData; // Actualizamos la lista filtrada
      },
      (error) => {
        console.error('Error al aplicar los filtros', error);
      }
    );
  }

  // Método para filtrar las iniciativas en el front-end
  // Método para filtrar las iniciativas en el front-end
  filtrarIniciativas(): void {
  
    this.iniciativasFiltradas = this.iniciativas.filter(iniciativa => {  
      return (
        (!this.filters.ods || this.filterOds(iniciativa.metas, this.filters.ods)) &&
        (!this.filters.curso || this.filterCursos(iniciativa.modulos, this.filters.curso)) &&
        (!this.filters.fechaInicio || new Date(iniciativa.fecha_inicio) >= new Date(this.filters.fechaInicio)) &&
        (!this.filters.fechaFin || new Date(iniciativa.fecha_fin) <= new Date(this.filters.fechaFin)) &&
        (!this.filters.nombre || iniciativa.nombre.toLowerCase().includes(this.filters.nombre.toLowerCase()))
      );
    });
  
    console.log('📌 Iniciativas filtradas:', this.iniciativasFiltradas);
  }
  


  // Función para filtrar por 'ods' dentro de las 'metas'
  filterOds(metas: any[], odsFilter: string): boolean {
    for (let meta of metas) {
      // Asegurarse de que meta.ods sea un array antes de llamar .some()
      if (Array.isArray(meta.ods)) {
        // Usamos .some() solo si meta.ods es un array
        if (meta.ods.some((ods: any) => ods.nombre && ods.nombre.toLowerCase().includes(odsFilter.toLowerCase()))) {
          return true;
        }
      } else {
        // Si meta.ods no es un array, comprobar si es un objeto (en caso de que esté mal estructurado)
        if (meta.ods && meta.ods.nombre && meta.ods.nombre.toLowerCase().includes(odsFilter.toLowerCase())) {
          return true;
        }
      }
    }
    return false;
  }





  filterCursos(modulos: any[], cursosFilter: string): boolean {
    for (let modulo of modulos) {
      // Asegurarse de que meta.ods sea un array antes de llamar .some()
      if (Array.isArray(modulo.curso)) {
        // Usamos .some() solo si meta.ods es un array
        if (modulo.curso.some((curso: any) => curso.nombre && curso.nombre.toLowerCase().includes(cursosFilter.toLowerCase()))) {
          return true;
        }
      } else {
        // Si meta.ods no es un array, comprobar si es un objeto (en caso de que esté mal estructurado)
        if (modulo.curso && modulo.curso.nombre && modulo.curso.nombre.toLowerCase().includes(cursosFilter.toLowerCase())) {
          return true;
        }
      }
    }
    return false;
  }

}
