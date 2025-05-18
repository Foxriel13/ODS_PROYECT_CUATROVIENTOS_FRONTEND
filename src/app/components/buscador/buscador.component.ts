import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ServiceCursosService } from '../../services/serviceCursos/service-cursos.service';
import { Curso } from '../../models/curso.model';
import { ServiceOdsService } from '../../services/serviceOds/service-ods.service';
import { Ods } from '../../models/ods.model';
import { ServiceProfesoresService } from '../../services/serviceProfesores/service-profesores.service';
import { ServiceEntidadesService } from '../../services/serviceEntidades/service-entidades.service';
import { IniciativasService } from '../../services/sercvicieIniciativasMostrar/iniciativas.service';
import { Profesores } from '../../models/profesores.model';
@Component({
  selector: 'app-buscador',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.scss']
})
export class BuscadorComponent {

  constructor(private claseServicie: ServiceCursosService,
    private odsServicie: ServiceOdsService,
    private profesoresService: ServiceProfesoresService,
    private entidadesexService: ServiceEntidadesService,
    private iniciativasService: IniciativasService
  ) { }

  cursoList: Curso[] = [];
  odsList: Ods[] = [];
  tipoList: string[] = [];
  anioList: string[] = [];
  dimensionList: string[] = [];
  profList: Profesores[] = [];
  entidadesList: any[] = [];


  odsFiltrados: Ods[] = [];




  odsSeleccionados: Ods[] = [];
  odsSeleccionadosDisplay: string = '';  // Esta variable almacenará los nombres de los ODS seleccionados


  dimensionesSeleccionadas: string[] = [];

  disableDimensiones: boolean = false; // controla si el multiselect de dimensiones está bloqueado

  dropdownOpen = false;


  

  filtros = {
    curso: '',
    nombre: '',
    fechaRegistro: '',
    anyo_lectivo: '',
    dimension: '',
    tipo: '',
    profesor: '',
    contratante: '',
    ods:''
  };



  advancedFiltersVisible = false;


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
        console.log('ODS:', this.odsList);
        this.odsFiltrados = [...this.odsList]; // Inicialmente, mostramos todos los ODS
      },
      (error) => {
        console.error('Error al cargar los cursos:', error);
      }
    );
  }







  @Output() filtersChanged = new EventEmitter<any>();


  toggleAdvancedFilters(): void {
    this.advancedFiltersVisible = !this.advancedFiltersVisible;
  }


  buscar(): void {
    this.filtersChanged.emit(this.filtros);
  }

  limpiarFiltros(): void {

    (Object.keys(this.filtros) as (keyof typeof this.filtros)[]).forEach(key => this.filtros[key] = '');


    this.odsSeleccionados = [];
    this.odsSeleccionadosDisplay = 'Seleccionar ODS';
    this.odsFiltrados = [...this.odsList]; // Restaurar la lista completa de ODS


    this.dimensionesSeleccionadas = [];
    this.disableDimensiones = false; // Desbloquear las dimensiones


    this.filtersChanged.emit(this.filtros);
  }







  onDimensionChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const value = target.value;
    const checked = target.checked;

    if (checked) {
      this.dimensionesSeleccionadas.push(value);
    } else {
      this.dimensionesSeleccionadas = this.dimensionesSeleccionadas.filter(dim => dim !== value);
    }


    if (this.dimensionesSeleccionadas.length > 0) {
      this.odsFiltrados = this.odsList.filter(ods =>
        this.dimensionesSeleccionadas.includes(ods.dimension)
      );
    } else {
      this.odsFiltrados = [...this.odsList]; // Si no hay dimensiones seleccionadas, mostrar todos los ODS
    }

    this.emitirFiltros();
  }

  isOdsSelected(ods: Ods): boolean {
    return this.odsSeleccionados.some(selectedOds => selectedOds.nombre === ods.nombre);
  }

  actualizarOdsSeleccionadosDisplay(): void {
    this.odsSeleccionadosDisplay = this.odsSeleccionados.length
      ? this.odsSeleccionados.map(o => o.nombre).join(', ')  // Mapear los nombres de los ODS seleccionados y unirlos
      : 'Seleccionar ODS';
  }

  onOdsChange(event: Event, ods: Ods): void {
    event.preventDefault();  // Evita el comportamiento por defecto
    const checked = (event.target as HTMLInputElement).checked;
  
    if (checked) {
      this.odsSeleccionados.push(ods);
    } else {
      this.odsSeleccionados = this.odsSeleccionados.filter(o => o.nombre !== ods.nombre);
    }
  

    this.disableDimensiones = this.odsSeleccionados.length > 0;
  

    this.actualizarOdsSeleccionadosDisplay();
  

    this.emitirFiltros();
  

    this.dropdownOpen = false;
  }
  

  emitirFiltros() {
    this.filtersChanged.emit({
      ...this.filtros,
      ods: this.odsSeleccionados.map(o => o.nombre).join(', '), // Convertir a string separado por comas
      dimension: this.dimensionesSeleccionadas
    });
  }


  getOdsImage(nombreOds: string): string {
    const odsIndex = this.odsList.findIndex(o => o.nombre === nombreOds);
    return odsIndex !== -1 ? `/Ods_img/ods${odsIndex + 1}.png` : '';
  }

  obtenerColorDimension(dimension: string): string {
    switch (dimension.toLowerCase()) {
      case 'ambiental': return 'bg-green';
      case 'social': return 'bg-orange';
      case 'económica': return 'bg-blue';
      default: return 'bg-gray';
    }
  }

}
