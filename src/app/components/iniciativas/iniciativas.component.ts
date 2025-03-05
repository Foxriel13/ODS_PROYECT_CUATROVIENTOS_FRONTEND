import { Component, OnInit } from '@angular/core';
import { IniciativasService } from '../../sercvicieIniciativasMostrar/iniciativas.service';
import { Iniciativas } from '../../models/iniciativas.model';
import { CommonModule } from '@angular/common';
import { BuscadorComponent } from '../buscador/buscador.component';
import { CardIniciativaComponent } from './card-iniciativa/card-iniciativa.component';
import { ModalIniciativaComponent } from "./modal-iniciativa/modal-iniciativa.component";
import { ModalService } from '../../servicios/modal.service';

@Component({
  selector: 'app-iniciativas',
  standalone: true,
  imports: [BuscadorComponent, CommonModule, CardIniciativaComponent, ModalIniciativaComponent],
  templateUrl: './iniciativas.component.html',
  styleUrls: ['./iniciativas.component.scss']
})
export class IniciativasComponent implements OnInit {
  iniciativas: Iniciativas[] = [];  // Lista completa de iniciativas
  iniciativasFiltradas: Iniciativas[] = [];  // Lista filtrada
  filters = {
    curso: '',
    ods: '',
    fechaRegistro: '',
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

  // Filtrar las iniciativas en el frontend
  filtrarIniciativas(): void {
    this.iniciativasFiltradas = this.iniciativas.filter(iniciativa => {  
      return (
        (!this.filters.ods || this.filterOds(iniciativa.metas, this.filters.ods)) &&
        (!this.filters.curso || this.filterCursos(iniciativa.modulos, this.filters.curso)) &&
        (!this.filters.fechaRegistro || new Date(iniciativa.fecha_registro) >= new Date(this.filters.fechaRegistro)) &&
        (!this.filters.nombre || iniciativa.nombre.toLowerCase().includes(this.filters.nombre.toLowerCase()))
      );
    });

    console.log('📌 Iniciativas filtradas:', this.iniciativasFiltradas);
  }

  // Función para filtrar por 'ods' dentro de las 'metas'
  filterOds(metas: any[], odsFilter: string): boolean {
    for (let meta of metas) {
      if (Array.isArray(meta.ods)) {
        if (meta.ods.some((ods: any) => ods.nombre && ods.nombre.toLowerCase().includes(odsFilter.toLowerCase()))) {
          return true;
        }
      } else {
        if (meta.ods && meta.ods.nombre && meta.ods.nombre.toLowerCase().includes(odsFilter.toLowerCase())) {
          return true;
        }
      }
    }
    return false;
  }

  // Filtrar por cursos dentro de los módulos
  filterCursos(modulos: any[], cursosFilter: string): boolean {
    for (let modulo of modulos) {
      if (Array.isArray(modulo.curso)) {
        if (modulo.curso.some((curso: any) => curso.nombre && curso.nombre.toLowerCase().includes(cursosFilter.toLowerCase()))) {
          return true;
        }
      } else {
        if (modulo.curso && modulo.curso.nombre && modulo.curso.nombre.toLowerCase().includes(cursosFilter.toLowerCase())) {
          return true;
        }
      }
    }
    return false;
  }

  // Método para obtener el nombre del curso
  // getCursoNombre(iniciativa: Iniciativas): string | null {
  //   if (iniciativa.modulos && iniciativa.modulos.length > 0) {
  //     const modulo = iniciativa.modulos[0];
  //     if (Array.isArray(modulo.curso)) {
  //       return modulo.curso.length > 0 ? modulo.curso[0].nombre : null;
  //     } else if (modulo.curso && modulo.curso.nombre) {
  //       return modulo.curso.nombre;
  //     }
  //   }
  //   return null;
  // }
}
