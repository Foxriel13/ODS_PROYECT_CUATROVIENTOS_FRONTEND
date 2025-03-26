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
    nombre: '',
    fechaRegistro: '',
    anyo_lectivo: '',
    dimension: '',
    tipo:'',
    profesor: '',
    contratante: ''
  };

  constructor(private iniciativasService: IniciativasService) { }

  ngOnInit(): void {
    this.loadIniciativas();
  }

  // Cargar todas las iniciativas
  loadIniciativas(): void {
    this.iniciativasService.getIniciativas().subscribe(
      (data: Iniciativas[]) => {
        console.log('Iniciativas recibidas:', data);
        
        // Filtramos las iniciativas que NO estén eliminadas
        this.iniciativas = data.filter(iniciativa => !iniciativa.eliminado);
        this.iniciativasFiltradas = [...this.iniciativas]; // Copia para mostrar
      },
      (error) => {
        console.error('Error al cargar las iniciativas', error);
      }
    );
  }

  // Método para recibir cambios de filtros desde el componente Buscador
  onFiltersChanged(updatedFilters: any): void {
    this.filters = updatedFilters;
    this.filtrarIniciativas(); // Aplica los filtros en el frontend

   // this.buscar(); // Llamamos al método de búsqueda para aplicar los filtros
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
        (!this.filters.nombre || iniciativa.nombre.toLowerCase().includes(this.filters.nombre.toLowerCase())) &&
        (!this.filters.anyo_lectivo || iniciativa.anyo_lectivo?.trim().includes(this.filters.anyo_lectivo.trim()))&&  
        (!this.filters.tipo || iniciativa.tipo.toLowerCase().trim().includes(this.filters.tipo.toLowerCase().trim())) &&
        (!this.filters.profesor || iniciativa.profesores.some(prof =>
          prof.nombre.toLowerCase().includes(this.filters.profesor.toLowerCase().trim())
        )) && (!this.filters.contratante || iniciativa.entidades_externas.some(entidad =>
          entidad.nombre.toLowerCase().includes(this.filters.contratante.toLowerCase().trim())
        ))&&(!this.filters.dimension || iniciativa.metas.some(meta =>
          meta.ods?.dimension?.toLowerCase().includes(this.filters.dimension.toLowerCase().trim())
        ))



      );
    });

    console.log('📌 Iniciativas filtradas:', this.iniciativasFiltradas);
  }


  // Función para filtrar por 'ods' dentro de las 'metas'
  filterOds(metas: any[], odsFilter: string): boolean {
    if (!Array.isArray(metas)) return false; // Asegura que metas sea un array
  
    return metas.some(meta => {
      if (!meta || !meta.ods) return false;
  
      if (Array.isArray(meta.ods)) {
        return meta.ods.some((ods: any) => 
          ods.nombre?.toLowerCase().includes(odsFilter.toLowerCase())
        );
      } else {
        return meta.ods.nombre?.toLowerCase().includes(odsFilter.toLowerCase());
      }
    });
  }
  

  // Filtrar por cursos dentro de los módulos
  filterCursos(modulos: any[], cursosFilter: string): boolean {
    if (!Array.isArray(modulos)) return false; // Asegura que modulos sea un array
  
    return modulos.some(modulo => {
      if (!modulo || !modulo.curso) return false;
  
      if (Array.isArray(modulo.curso)) {
        return modulo.curso.some((curso: any) => 
          curso.nombre?.toLowerCase().includes(cursosFilter.toLowerCase())
        );
      } else {
        return modulo.curso.nombre?.toLowerCase().includes(cursosFilter.toLowerCase());
      }
    });
  }
  
}
