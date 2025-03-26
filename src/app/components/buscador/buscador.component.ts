import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ServiceCursosService } from '../../serviceCursos/service-cursos.service';
import { Curso } from '../../models/curso.model';
import { ServiceOdsService } from '../../serviceOds/service-ods.service';
import { Ods } from '../../models/ods.model';
import { Dimension } from '../../models/dimension.model';
import { ServiceDimensionService } from '../../serviceDimension/service-dimension.service';
import { ServiceProfesoresService } from '../../serviceProfesores/service-profesores.service';
import { ServiceEntidadesService } from '../../serviceEntidades/service-entidades.service';
import { IniciativasService } from '../../sercvicieIniciativasMostrar/iniciativas.service';
import { Profesores } from '../../models/profesores.model';
@Component({
  selector: 'app-buscador',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.scss']
})
export class BuscadorComponent {

  constructor(private claseServicie: ServiceCursosService, private odsServicie: ServiceOdsService,
    private profesoresService: ServiceProfesoresService,
    private entidadesexService: ServiceEntidadesService,
    private iniciativasService: IniciativasService
  ) { }
  //Listas para almacenar datos de los selects
  cursoList: Curso[] = [];
  odsList: Ods[] = [];
  tipoList: string[] = [];
  anioList: string[] = [];
  dimensionList: string[] = [];
  profList: Profesores[] = [];
  entidadesList: any[] = [];

  // Variables para almacenar los valores de los filtros
  curso = '';
  ods = '';
  nombre = '';
  fechaRegistro = '';  
  anyo_lectivo = '';
  dimension = ''; 
  tipo = '';
  profesor = '';
  contratante = '';

  // Variable para controlar la visibilidad de los filtros 
  advancedFiltersVisible = false;

  //Cargar todos los datos de las listas en los selects
  ngOnInit(): void {
    this.loadClases();
    this.loadOdsDimension();
    this.loadDatosIniciativas();
    this.loadProfesores();
    this.loadEntidadesEx();
  }

  loadProfesores() {
    this.profesoresService.getProfesoresList().subscribe(
      (response) => {
        this.profList = response; 
      },
      (error) => {
        console.error('Error al cargar los profesores:', error);
      }
    );
  }
  loadEntidadesEx() { 
    this.entidadesexService.getEntidadesList().subscribe(
      (response) => {
        this.entidadesList = response; 
      },
      (error) => {
        console.error('Error al cargar los contratantes:', error);
      }
    );
  }

  loadClases() {
    this.claseServicie.getCursosList().subscribe(
      (response) => {
        this.cursoList = response; // Se asignan todos los cursos sin filtro
      },
      (error) => {
        console.error('Error al cargar los cursos:', error);
      }
    );
  }
  loadDatosIniciativas() {
    this.iniciativasService.getIniciativas().subscribe(
      (response) => {
        this.anioList = [...new Set(response.map(iniciativa => iniciativa.anyo_lectivo))];
        this.tipoList = [...new Set(response.map(iniciativa => iniciativa.tipo))];
        console.log('tipos:', this.tipoList);
        console.log('Años lectivos:', this.anioList);
      },(error) => {
        console.error(' Error al cargar los años lectivos:', error);
      }
    )
  }
  loadOdsDimension() {
    this.odsServicie.getOdsList().subscribe(
      (response) => {
        this.odsList = response; // Se asignan todos los cursos sin filtro
        this.dimensionList = [...new Set(response.map(ods => ods.dimension))];
        console.log('Dimensiones:', this.dimensionList);
      },
      (error) => {
        console.error('Error al cargar los cursos:', error);
      }
    );
  }

  @Output() filtersChanged = new EventEmitter<any>();

  //Abrir y ocultar otros filtros 
  toggleAdvancedFilters(): void {
    this.advancedFiltersVisible = !this.advancedFiltersVisible;
  }

  // Método para emitir los filtros incluyendo la fecha de registro
  buscar(): void {
    this.filtersChanged.emit({
      curso: this.curso,
      ods: this.ods,
      nombre: this.nombre,
      fechaRegistro: this.fechaRegistro, 
      anyo_lectivo: this.anyo_lectivo,
      dimension: this.dimension,
      tipo: this.tipo,
      profesor: this.profesor,
      contratante: this.contratante
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
    this.profesor = '';
    this.contratante = '';

    // Emitir los cambios de filtros para actualizar la vista
    this.filtersChanged.emit({
      curso: this.curso,
      ods: this.ods,
      nombre: this.nombre,
      fechaRegistro: this.fechaRegistro,
      anyo_lectivo: this.anyo_lectivo,
      dimension: this.dimension,
      tipo: this.tipo,
      profesor: this.profesor,
      contratante: this.contratante
    });
  }

}
