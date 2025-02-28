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

  buscar(){
    this.iniciativasService.filterIniciativas(this.filters).subscribe(
      (filteredData: Iniciativas[]) => {
        this.iniciativas = filteredData;
      },
      (error) => {
        console.error('Error al aplicar los filtros',error);
      }
    );
  }

  // Método para recibir cambios de filtros desde el componente Buscador
  onFiltersChanged(updatedFilters: any): void {
    this.filters = updatedFilters;
    this.filtrarIniciativas(); // Llamamos a la función de filtrado en el frontend
  }  
  

  // Método para filtrar las iniciativas en el front-end
  filtrarIniciativas(): void {
    this.iniciativasFiltradas = this.iniciativas.filter(iniciativa => {
      return (
        (!this.filters.curso || iniciativa.curso === this.filters.curso) &&
        (!this.filters.ods || iniciativa.ods.toLowerCase().includes(this.filters.ods.toLowerCase())) &&
        (!this.filters.fechaInicio || new Date(iniciativa.fecha_inicio) >= new Date(this.filters.fechaInicio))  &&
        (!this.filters.fechaFin || new Date(iniciativa.fecha_fin) <= new Date(this.filters.fechaFin)) &&
        (!this.filters.nombre || iniciativa.nombre.toLowerCase().includes(this.filters.nombre.toLowerCase()))
      );
    });
  }
  
}
