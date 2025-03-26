import { Component } from '@angular/core';
import { Curso } from '../../models/curso.model';
import { Iniciativas } from '../../models/iniciativas.model';
import { IniciativasService } from '../../sercvicieIniciativasMostrar/iniciativas.service';
import { ServiceCursosService } from '../../serviceCursos/service-cursos.service';
import { NgStyle } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BuscadorComponent } from '../buscador/buscador.component';

@Component({
  selector: 'app-grafico-indicadores',
  imports: [FormsModule, NgStyle, BuscadorComponent],
  templateUrl: './grafico-indicadores.component.html',
  styleUrl: './grafico-indicadores.component.scss'
})
export class GraficoIndicadoresComponent {
  iniciativas: Iniciativas[] = [];
  iniciativasFiltradas: Iniciativas[] = [];
  
  cursos: Curso[] = [];

  filters = {
    curso: '',
    ods: '',
    fechaRegistro: '',
    nombre: '',
    
    anyo_lectivo: '',
    dimension: '',
    tipo:'',
    horas: null
  };
  
  constructor(private iniciativasService: IniciativasService, private cursosService: ServiceCursosService){
    cursosService.getCursosList().subscribe(
      (data: Curso[]) =>{
        this.cursos = data
      }
    )

    iniciativasService.getIniciativas().subscribe(
      (data: Iniciativas[]) => {
        console.log('Iniciativas recibidas:', data);
        
        this.iniciativas = data.filter(iniciativa => !iniciativa.eliminado);
        this.iniciativasFiltradas = [...this.iniciativas];
      },
      (error) => {
        console.error('Error al cargar las iniciativas', error);
      }
    );
  }
  ngOnInit(): void {


  }


  //Filtrado
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
