import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ServiceCursosService } from '../../serviceCursos/service-cursos.service';
import { Curso } from '../../models/curso.model';
import { ServiceOdsService } from '../../serviceOds/service-ods.service';
import { Ods } from '../../models/ods.model';
import { Dimension } from '../../models/dimension.model';

@Component({
  selector: 'app-buscador',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.scss']
})
export class BuscadorComponent {

  constructor(private claseServicie: ServiceCursosService, private odsServicie: ServiceOdsService) { }
  cursoList: Curso[] = [];
  odsList: Ods[] = [];
  tipoList: string[] = [];

  dimensionList: Dimension[] = [];

  curso = '';
  ods = '';
  nombre = '';
  fechaRegistro = '';  // Variable para la fecha de registro
  //búsqueda por otros campos
  anyo_lectivo = '';
  dimension = '';
  tipo = '';
  horas: number | null = null;

  advancedFiltersVisible = false;

  ngOnInit(): void {
    this.loadClases();
    this.loadOds();
  }

  loadClases() {
    this.claseServicie.getCursosList().subscribe(
      (response) => {
        this.cursoList = response; // Se asignan todos los cursos sin filtro
      },
      (error) => {
        console.error('❌ Error al cargar los cursos:', error);
      }
    );
  }
  loadOds() {
    this.odsServicie.getOdsList().subscribe(
      (response) => {
        this.odsList = response; // Se asignan todos los cursos sin filtro
      },
      (error) => {
        console.error('❌ Error al cargar los cursos:', error);
      }
    );
  }

  @Output() filtersChanged = new EventEmitter<any>();

  toggleAdvancedFilters(): void {
    this.advancedFiltersVisible = !this.advancedFiltersVisible;
  }

  // Método para emitir los filtros incluyendo la fecha de registro
  buscar(): void {
    this.filtersChanged.emit({
      curso: this.curso,
      ods: this.ods,
      nombre: this.nombre,
      fechaRegistro: this.fechaRegistro, // Se incluye fechaRegistro en el filtro

      anyo_lectivo: this.anyo_lectivo,
      dimension: this.dimension,
      tipo: this.tipo,
      horas: this.horas
    });
  }
  limpiarFiltros(): void {
    this.curso = '';
    this.ods = '';
    this.nombre = '';
    this.fechaRegistro = '';
    this.anyo_lectivo = '';
    this.dimension = '';
    this.tipo = '';
    this.horas = null;


    // Emitir los cambios de filtros para actualizar la vista
    this.filtersChanged.emit({
      curso: this.curso,
      ods: this.ods,
      nombre: this.nombre,
      fechaRegistro: this.fechaRegistro,

      anyo_lectivo: this.anyo_lectivo,
      dimension: this.dimension,
      tipo: this.tipo,
      horas: this.horas
    });
  }

}
