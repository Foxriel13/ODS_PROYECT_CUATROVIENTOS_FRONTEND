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
  iniciativas: Iniciativas[] = [];
  filters = {
    curso: '',
    ods: '',
    fechaInicio: '',
    fechaFin: '',
    nombre: ''
  };

  constructor(private iniciativasService: IniciativasService) {}

  ngOnInit(): void {
    this.loadIniciativas();
  }

  loadIniciativas(): void {
    this.iniciativasService.getIniciativas().subscribe(
      (data: Iniciativas[]) => {
        this.iniciativas = data;
      },
      (error) => {
        console.error('Error al cargar las iniciativas', error);
      }
    );
  }

  // Método para aplicar los filtros
  buscar(): void {
    this.iniciativasService.filterIniciativas(this.filters).subscribe(
      (filteredData: Iniciativas[]) => {
        this.iniciativas = filteredData;
      },
      (error) => {
        console.error('Error al aplicar los filtros', error);
      }
    );
  }

  // Función opcional si necesitas manejar el cambio de filtros de forma individual
  onFiltersChanged(filters: any): void {
    this.filters = filters;
    this.buscar(); // Asegúrate de que buscar() está implementado correctamente en el componente principal
  }
  
}
