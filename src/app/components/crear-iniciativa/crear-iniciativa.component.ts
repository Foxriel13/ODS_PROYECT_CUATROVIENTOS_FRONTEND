import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';  // Importar FormsModule
import { CommonModule } from '@angular/common';  // Si necesitas usar CommonModule también
import { NavbarFormCrearComponent } from '../navbar-form-crear/navbar-form-crear.component';
import { Ods } from '../../models/ods.model';
import { ServiceOdsService } from '../../serviceOds/service-ods.service'; // Asegúrate de importar el servicio
import { Profesores } from '../../models/profesores.model';
import { ServiceProfesoresService } from '../../serviceProfesores/service-profesores.service';
import { ServiceCursosService } from '../../serviceCursos/service-cursos.service'
import { Curso } from '../../models/curso.model';
import { ServiceEntidadesService } from '../../serviceEntidades/service-entidades.service';
import { entidades_externas } from '../../models/entidades_externas.model';
import { IniciativasService } from '../../sercvicieIniciativasMostrar/iniciativas.service';
import { Iniciativas } from '../../models/iniciativas.model';
import { Meta } from '@angular/platform-browser';
import { Metas } from '../../models/metas.model';

@Component({
  selector: 'app-crear-iniciativa',
  standalone: true,  // Componente standalone
  imports: [FormsModule, CommonModule, NavbarFormCrearComponent],  // Asegúrate de importar FormsModule aquí
  templateUrl: './crear-iniciativa.component.html',
  styleUrls: ['./crear-iniciativa.component.scss']
})
export class CrearIniciativaComponent implements OnInit {
  // Variables para mantener el estado de los campos
  titulo: string = '';
  nombre: string = '';
  producto : string = '';
  descripcion : string = "";
  contratante: string = '';
  equipo: string = '';
  fechaInicio: string = '';
  fechaFin: string = '';
  modulo: string = '';
  meta: string = '';
  horas: number = 0;
  imagen: string = "";
  odsList: Ods[] = []; // Lista de ODS
  ProfesoresList : Profesores[] = [];
  cursoList: Curso[] = [];
  entidadesList: entidades_externas[] = [];
  odsSeleccionados: Ods[] = []; // Lista de ODS seleccionados
  profesoresSeleccionados: Profesores[] = []; 
  cursosSeleccionados: Curso[] = []
  entidadesSeleccionados: entidades_externas[] = [];
  ods: Ods = {
    id: 0,
    nombre: '',
    dimension: []
  };
  profesor : Profesores = {
    id: 0,
    nombre: ''
  };
  curso : Curso ={
    id: 0,
    nombre: ''
  };
  entidad : entidades_externas={
    id: 0,
    nombre: ''
  };

  // Variable que mantiene la sección activa
  selectedTab: string = 'iniciativas'; // 'iniciativas' es la sección por defecto

  constructor(private odsService: ServiceOdsService, private profesoresService: ServiceProfesoresService, private cursosService: ServiceCursosService, private entidadesServicie: ServiceEntidadesService, private iniciativasService: IniciativasService) {}

  // Cargar los ODS al inicializar el componente
  ngOnInit(): void {
    this.loadOdsList();
    this.loadProfesoresList();
    this.loadCursosList();
    this.loadEntidadesList();
    
  }

  // Función para cargar los ODS desde el servicio
  loadOdsList(): void {
    this.odsService.getOdsList().subscribe(
      (response) => {
        this.odsList = response; // Asignar la respuesta a la lista de ODS
      },
      (error) => {
        console.error('Error al cargar los ODS:', error);
      }
    );
  }
  
  loadProfesoresList(): void {
    this.profesoresService.getProfesoresList().subscribe(
      (response) => {
        console.log('Profesores cargados:', response); // Verifica los datos aquí
        this.ProfesoresList = response; // Asignar la respuesta a la lista de profesores
      },
      (error) => {
        console.error('Error al cargar los profesores:', error);
      }
    );
  }

  loadCursosList(): void {
    this.cursosService.getCursosList().subscribe(
      (response) => {
        console.log('Cursos cargados:', response); // Verifica los datos aquí
        this.cursoList = response; // Asignar la respuesta a la lista de profesores
      },
      (error) => {
        console.error('Error al cargar los profesores:', error);
      }
    );
  }
  loadEntidadesList(): void {
    this.entidadesServicie.getEntidadesList().subscribe(
      (response) => {
        console.log('Entidades cargados:', response); // Verifica los datos aquí
        this.entidadesList = response; // Asignar la respuesta a la lista de profesores
      },
      (error) => {
        console.error('Error al cargar los profesores:', error);
      }
    );
  }
  anyadirOds(): void {
    const selectedOds = this.odsList.find(item => item.id == this.ods.id); // Obtener el ODS seleccionado

    if (selectedOds) {
      // Verificar si el ODS ya está en la lista de seleccionados
      if (this.odsSeleccionados.some(item => item.id === selectedOds.id)) {
        alert('Este ODS ya está añadido.');
      } else {
        this.odsSeleccionados.push(selectedOds); // Añadir el ODS a la lista
        this.odsSeleccionados.sort((a, b) => a.id - b.id);
      }
    } else {
      alert('Por favor, selecciona un ODS válido.');
    }
  }
  anyadirCurso(): void {
    const selectedCurso = this.cursoList.find(item => item.id == this.curso.id); // Obtener el curso seleccionado
    
    if (selectedCurso) {
        // Verificar si el curso ya está en la lista de seleccionados
        if (this.cursosSeleccionados.some(item => item.id === selectedCurso.id)) {
            alert('Este curso ya está añadido.');
        } else {
            this.cursosSeleccionados.push(selectedCurso); // Añadir el curso a la lista
        }
    } else {
        alert('Por favor, selecciona un curso válido.');
    }
}

anyadirProfesor(): void {
  const selectedProfe = this.ProfesoresList.find(item => item.id == this.profesor.id); // Obtener el curso seleccionado
  
  if (selectedProfe) {
      // Verificar si el curso ya está en la lista de seleccionados
      if (this.profesoresSeleccionados.some(item => item.id === selectedProfe.id)) {
          alert('Este curso ya está añadido.');
      } else {
          this.profesoresSeleccionados.push(selectedProfe); // Añadir el curso a la lista
      }
  } else {
      alert('Por favor, selecciona un curso válido.');
  }
}

anyadirEntidad(): void {
  const selectedEntidad = this.entidadesList.find(item => item.id == this.entidad.id); // Obtener el curso seleccionado
  
  if (selectedEntidad) {
      // Verificar si el curso ya está en la lista de seleccionados
      if (this.entidadesSeleccionados.some(item => item.id === selectedEntidad.id)) {
          alert('Este curso ya está añadido.');
      } else {
          this.entidadesSeleccionados.push(selectedEntidad); // Añadir el curso a la lista
      }
  } else {
      alert('Por favor, selecciona un curso válido.');
  }
}

  // Función para agregar el ODS seleccionado a la lista de ODS seleccionados
  
  
  

  // Función para manejar el cambio de pestaña desde el navbar
  onTabChange(tab: string) {
    this.selectedTab = tab; // Cambiar la sección activa
  }

  // Función para limpiar el formulario
  clearForm(form: NgForm): void {
    location.reload();
  }

  // Función para guardar los datos

  onImageChange() {
    const imagenInput = document.getElementById("imagen") as HTMLInputElement;
    const imagenForm = document.getElementById("imagenForm") as HTMLImageElement;
    
    if (imagenInput && imagenInput.value) {
      imagenForm.setAttribute('src', imagenInput.value);
    }
  }
  eliminarCurso(index: number) {
    // Eliminamos el curso de la lista usando el índice
    this.cursosSeleccionados.splice(index, 1);
  }
  eliminarProfesor(index: number) {
    // Eliminamos el curso de la lista usando el índice
    this.profesoresSeleccionados.splice(index, 1);
  }
  eliminarOds(index: number) {
    // Eliminamos el curso de la lista usando el índice
    this.odsSeleccionados.splice(index, 1);
  }
  eliminarEntidad(index: number) {
    // Eliminamos el curso de la lista usando el índice
    this.entidadesSeleccionados.splice(index, 1);
  }
  
  guardarIniciativa(form: any): void {
    if (form.invalid) {
      return;
    }
    const formattedDate = new Date(Date.now());
    const day = String(formattedDate.getDate()).padStart(2, '0');  // Asegura que el día tenga dos dígitos
    const month = String(formattedDate.getMonth() + 1).padStart(2, '0');  // El mes empieza desde 0, por eso sumamos 1
    const year = formattedDate.getFullYear();
    const formattedDateString = `${day}/${month}/${year}`;


    



    let iniciativasi: Iniciativas={
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
      metas: [],
      profesores: this.ProfesoresList,
      entidades_externas: this.entidadesList,
      modulos: []
    }
    this.iniciativasService.createIniciativa(iniciativasi);
    

    form.resetForm();
    this.odsSeleccionados = []; // Limpiar la lista de ODS seleccionados al guardar
  }
}
