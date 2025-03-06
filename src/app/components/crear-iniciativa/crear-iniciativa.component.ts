import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavbarFormCrearComponent } from '../navbar-form-crear/navbar-form-crear.component';
import { Ods } from '../../models/ods.model';
import { ServiceOdsService } from '../../serviceOds/service-ods.service';
import { Profesores } from '../../models/profesores.model';
import { ServiceProfesoresService } from '../../serviceProfesores/service-profesores.service';
import { ServiceCursosService } from '../../serviceCursos/service-cursos.service';
import { Curso } from '../../models/curso.model';
import { ServiceEntidadesService } from '../../serviceEntidades/service-entidades.service';
import { entidades_externas } from '../../models/entidades_externas.model';
import { IniciativasService } from '../../sercvicieIniciativasMostrar/iniciativas.service';
import { Iniciativas } from '../../models/iniciativas.model';
import { Meta } from '@angular/platform-browser';
import { Metas } from '../../models/metas.model';
import { Dimension } from '../../models/dimension.model';
import { ServiceDimensionService } from '../../serviceDimension/service-dimension.service';

@Component({
  selector: 'app-crear-iniciativa',
  standalone: true,
  imports: [FormsModule, CommonModule, NavbarFormCrearComponent],
  templateUrl: './crear-iniciativa.component.html',
  styleUrls: ['./crear-iniciativa.component.scss']
})
export class CrearIniciativaComponent implements OnInit {
  // Variables para mantener el estado de los campos
  titulo: string = '';
  nombre: string = '';
  producto: string = '';
  descripcion: string = "";
  contratante: string = '';
  equipo: string = '';
  fechaInicio: string = '';
  fechaFin: string = '';
  modulo: string = '';
  meta: string = '';
  horas: number = 0;
  imagen: string = "";
  odsList: Ods[] = []; // Lista de ODS
  ProfesoresList: Profesores[] = [];
  DimensionesList: Dimension[] = [];
  cursoList: Curso[] = [];
  entidadesList: entidades_externas[] = [];
  odsSeleccionados: Ods[] = []; // Lista de ODS seleccionados
  metaSeleccionada: Metas | null = null;
  dimensionSeleccionada: Dimension [] = [];  // Cambiado para ser un objeto y no un array // Lista de ODS seleccionados
  profesoresSeleccionados: Profesores[] = [];
  cursosSeleccionados: Curso[] = [];
  entidadesSeleccionados: entidades_externas[] = [];
  metasSeleccionadas: Metas [] =[];
  ods: Ods = {  // ODS será un solo objeto ahora
    id: 0,
    nombre: '',
    dimension: {
      id: 0,
      nombre: ''
    } // Dimension ahora es un solo objeto
  };
  profesor: Profesores = {
    id: 0,
    nombre: ''
  };
  curso: Curso = {
    id: 0,
    nombre: ''
  };
  entidad: entidades_externas = {
    id: 0,
    nombre: ''
  };
  dimension: Dimension = {
    id: 0,
    nombre: ''
  }
  metaSelect: Metas ={
    id: 0,
    descripcion: '',
    ods: {
      id: 0,
      nombre: '',
      dimension: {
        id: 0,
        nombre: ''
      }
      }
  };
  metaAyadir: Metas | null = null;

  // Variable que mantiene la sección activa
  selectedTab: string = 'iniciativas'; // 'iniciativas' es la sección por defecto

  constructor(private odsService: ServiceOdsService, private profesoresService: ServiceProfesoresService, private cursosService: ServiceCursosService, private entidadesServicie: ServiceEntidadesService, private iniciativasService: IniciativasService,private dimensionService: ServiceDimensionService) {}

  ngOnInit(): void {
    this.loadOdsList();
    this.loadProfesoresList();
    this.loadCursosList();
    this.loadEntidadesList();
    this.loadDimensionesList();
  }

  loadOdsList(): void {
    this.odsService.getOdsList().subscribe(
      (response) => {
        this.odsList = response;
      },
      (error) => {
        console.error('Error al cargar los ODS:', error);
      }
    );
  }

  loadProfesoresList(): void {
    this.profesoresService.getProfesoresList().subscribe(
      (response) => {
        console.log('Profesores cargados:', response);
        this.ProfesoresList = response;
      },
      (error) => {
        console.error('Error al cargar los profesores:', error);
      }
    );
  }

  loadCursosList(): void {
    this.cursosService.getCursosList().subscribe(
      (response) => {
        console.log('Cursos cargados:', response);
        this.cursoList = response;
      },
      (error) => {
        console.error('Error al cargar los cursos:', error);
      }
    );
  }

  loadEntidadesList(): void {
    this.entidadesServicie.getEntidadesList().subscribe(
      (response) => {
        console.log('Entidades cargados:', response);
        this.entidadesList = response;
      },
      (error) => {
        console.error('Error al cargar las entidades:', error);
      }
    );
  }
  loadDimensionesList(): void {
    this.dimensionService.getDimensionesList().subscribe(
      (response) => {
        console.log('Dimensiones cargados:', response);
        this.DimensionesList = response;
      },
      (error) => {
        console.error('Error al cargar los profesores:', error);
      }
    );
  }
  onTabChange(tab: string) {
    this.selectedTab = tab; // Cambiar la sección activa
  }
  anyadirDimension(): void {
    const selectedDimension = this.DimensionesList.find(item => item.id == this.dimension.id);
  
    if (selectedDimension) {
      // Asigna solo el objeto dimension, no un arreglo
      this.dimensionSeleccionada = [selectedDimension];
  
      // Si se desea, también puedes ordenar la lista (aunque con solo un elemento no es necesario)
      // this.odsSeleccionados.sort((a, b) => a.id - b.id);
  
    } else {
      alert('Por favor, selecciona una dimensión válida.');
    }
  }
  
  anyadirOds(): void {
    const selectedOds = this.odsList.find(item => item.id == this.ods.id);
  
    if (selectedOds) {
      // Si ya hay un ODS seleccionado, lo reemplazamos
      this.odsSeleccionados = [selectedOds]; // Esto asegura que solo haya un ODS en la lista
  
      // Si se desea, también puedes ordenar la lista (aunque con solo un elemento no es necesario)
      // this.odsSeleccionados.sort((a, b) => a.id - b.id);
  
    } else {
      alert('Por favor, selecciona un ODS válido.');
    }
  }
  

  anyadirCurso(): void {
    const selectedCurso = this.cursoList.find(item => item.id == this.curso.id);
    if (selectedCurso) {
      if (this.cursosSeleccionados.some(item => item.id === selectedCurso.id)) {
        alert('Este curso ya está añadido.');
      } else {
        this.cursosSeleccionados.push(selectedCurso);
      }
    } else {
      alert('Por favor, selecciona un curso válido.');
    }
  }

  anyadirProfesor(): void {
    const selectedProfe = this.ProfesoresList.find(item => item.id == this.profesor.id);
    if (selectedProfe) {
      if (this.profesoresSeleccionados.some(item => item.id === selectedProfe.id)) {
        alert('Este profesor ya está añadido.');
      } else {
        this.profesoresSeleccionados.push(selectedProfe);
      }
    } else {
      alert('Por favor, selecciona un profesor válido.');
    }
  }

  anyadirEntidad(): void {
    const selectedEntidad = this.entidadesList.find(item => item.id == this.entidad.id);
    if (selectedEntidad) {
      if (this.entidadesSeleccionados.some(item => item.id === selectedEntidad.id)) {
        alert('Esta entidad ya está añadida.');
      } else {
        this.entidadesSeleccionados.push(selectedEntidad);
      }
    } else {
      alert('Por favor, selecciona una entidad válida.');
    }
  }

  anyadirMeta() {
     this.metaAyadir = {
      id: 0,
      descripcion: this.descripcion,
      ods: {
        id: this.ods.id,
        nombre: this.ods.nombre,
        dimension: {
          id: this.dimension.id,
          nombre: this.dimension.nombre
        }
      }
    }
    this.metasSeleccionadas.push(this.metaAyadir)
    console.log(this.metasSeleccionadas)
  }
  clearForm(form: NgForm): void {
    location.reload();
  }

  onImageChange() {
    const imagenInput = document.getElementById("imagen") as HTMLInputElement;
    const imagenForm = document.getElementById("imagenForm") as HTMLImageElement;
    if (imagenInput && imagenInput.value) {
      imagenForm.setAttribute('src', imagenInput.value);
    }
  }

  eliminarCurso(index: number) {
    this.cursosSeleccionados.splice(index, 1);
  }

  eliminarProfesor(index: number) {
    this.profesoresSeleccionados.splice(index, 1);
  }

  eliminarOds(index: number) {
    this.odsSeleccionados.splice(index, 1);
  }
  eliminarDimension(): void {
    // Eliminar la dimensión seleccionada al hacer click en el <p>
    this.dimensionSeleccionada = []; // Limpiamos la dimensión seleccionada
    this.dimension.id = 0;  // Reseteamos el id
}

  eliminarEntidad(index: number) {
    this.entidadesSeleccionados.splice(index, 1);
  }

  guardarIniciativa(form: any): void {
    if (form.invalid) {
      return;
    }

    const formattedDate = new Date(Date.now());
    const day = String(formattedDate.getDate()).padStart(2, '0');
    const month = String(formattedDate.getMonth() + 1).padStart(2, '0');
    const year = formattedDate.getFullYear();
    const formattedDateString = `${day}/${month}/${year}`;

    let iniciativasi: Iniciativas = {
      id: 0,
      tipo: this.titulo,
      horas: this.horas,
      nombre: this.nombre,
      producto_final: this.producto,
      descripcion: this.descripcion,
      fecha_registro: formattedDateString,
      fecha_inicio: this.fechaInicio,
      fecha_fin: this.fechaFin,
      eliminado: false,
      innovador: false,
      imagen: this.imagen,
      metas: [], // Asegúrate de que metas sea un array de metas
      profesores: this.profesoresSeleccionados,
      entidades_externas: this.entidadesSeleccionados,
      modulos: []
    };

    this.iniciativasService.createIniciativa(iniciativasi);

    form.resetForm();
    this.odsSeleccionados = [];
  }
}
