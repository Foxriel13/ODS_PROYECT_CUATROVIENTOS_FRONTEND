import { Component, OnInit, ɵflushModuleScopingQueueAsMuchAsPossible } from '@angular/core';
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
import { entidadesExternas } from '../../models/entidades_externas.model';
import { IniciativasService } from '../../sercvicieIniciativasMostrar/iniciativas.service';
import { Iniciativas } from '../../models/iniciativas.model';
import { Meta } from '@angular/platform-browser';
import { Metas } from '../../models/metas.model';
import { Dimension } from '../../models/dimension.model';
import { ServiceDimensionService } from '../../serviceDimension/service-dimension.service';
import { Modulos } from '../../models/modulos.model';

@Component({
  selector: 'app-actualizar-iniciativa',
  imports: [FormsModule, CommonModule, NavbarFormCrearComponent],
  templateUrl: './actualizar-iniciativa.component.html',
  styleUrl: './actualizar-iniciativa.component.scss'
})
export class ActualizarIniciativaComponent {

  // Variables para mantener el estado de los campos
    titulo: string = '';
    nombre: string = '';
    producto: string = '';
    links: string = '';
    descripcion: string = "";
    contratante: string = '';
    equipo: string = '';
    fechaInicio: string = '';
    fechaFin: string = '';
    modulo: string = '';
    meta: string = '';
    horas: number = 0;
    nombreModulo : string = '';
    imagen: string = "";
    odsList: Ods[] = []; // Lista de ODS
    ProfesoresList: Profesores[] = [];
    DimensionesList: Dimension[] = [];
    cursoList: Curso[] = [];
    entidadesList: entidadesExternas[] = [];
    odsSeleccionados: Ods[] = []; // Lista de ODS seleccionados
    metaSeleccionada: Metas | null = null;
    dimensionSeleccionada: Dimension [] = [];  // Cambiado para ser un objeto y no un array // Lista de ODS seleccionados
    profesoresSeleccionados: Profesores[] = [];
    cursosSeleccionados: Curso[] = [];
    entidadesSeleccionados: entidadesExternas[] = [];
    metasSeleccionadas: Metas [] =[];
    moduloSeleccionados: Modulos [] = [];
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
    entidad: entidadesExternas = {
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
    modules: Modulos = {
      idModulo: 0, // Identificador numérico
      nombre: "", // Nombre del ODS
      curso: {
        id: 0,  // Definido como número si es un identificador
        nombre:""
      } 
    };
    metaAyadir: Metas | null = null;
    moduloAyadir: Modulos | null = null;
  
    // Variable que mantiene la sección activa
    selectedTab: string = 'iniciativas'; // 'iniciativas' es la sección por defecto
  
    constructor(private odsService: ServiceOdsService, private profesoresService: ServiceProfesoresService, private cursosService: ServiceCursosService, private entidadesServicie: ServiceEntidadesService, private iniciativasService: IniciativasService,private dimensionService: ServiceDimensionService) {}
  
    //Iniciativas
    idIniciativa: number = 0
    iniciativasList: Iniciativas[] = []
    iniciativaSeleccionada: Iniciativas | null = null;

    ngOnInit(): void {
      this.loadIniciativas()

      this.loadOdsList();
      this.loadProfesoresList();
      this.loadCursosList();
      this.loadEntidadesList();
      this.loadDimensionesList();
    }
  
    //Funciones Iniciativas
    loadIniciativas(): void {
      this.iniciativasService.getIniciativas().subscribe(
        (response) => {
          this.iniciativasList = response;
          this.idIniciativa = response[0].id
          this.iniciativaSeleccionada = response[0]
        },
        (error) => {
          console.error('Error al cargar las Iniciativas: ', error)
        }
      );
    }

    onIdIniciativaChange(): void {
      //Rellamar a los loads y cambiar los datos de TODAS las variables de NgModels a los datos de la iniciativa elegida
      this.loadOdsList();
      this.loadProfesoresList();
      this.loadCursosList();
      this.loadEntidadesList();
      this.loadDimensionesList();
  
      this.titulo = this.iniciativasList[this.idIniciativa].tipo
      this.horas = this.iniciativasList[this.idIniciativa].horas
      this.nombre = this.iniciativasList[this.idIniciativa].nombre
      this.producto = this.iniciativasList[this.idIniciativa].producto_final
      this.fechaInicio = this.iniciativasList[this.idIniciativa].fecha_inicio
      this.fechaFin = this.iniciativasList[this.idIniciativa].fecha_fin
      this.imagen = this.iniciativasList[this.idIniciativa].imagen
      this.metasSeleccionadas = this.iniciativasList[this.idIniciativa].metas.map(meta => ({
        id: meta.id,
        descripcion: meta.descripcion,
        ods: {
          id: meta.ods.id,
          nombre: meta.ods.nombre,
          dimension: {
            id: meta.ods.dimension.id,
            nombre: meta.ods.dimension.nombre
          }
        }
      }))
      this.profesoresSeleccionados = this.iniciativasList[this.idIniciativa].profesores.map(profesor => ({
        id: profesor.id,
        nombre: profesor.nombre
      }))
      this.entidadesSeleccionados = this.iniciativasList[this.idIniciativa].entidades_Externas.map(entidad => ({
        id: entidad.id,
        nombre: entidad.nombre
      }))
      this.moduloSeleccionados = this.iniciativasList[this.idIniciativa].modulos.map(modulo => ({
        idModulo: modulo.idModulo,
        nombre: modulo.nombre,
        curso: Array.isArray(modulo.curso) 
          ? modulo.curso.map(curso => ({
              id: curso.id,
              nombre: curso.nombre
            }))
          : [{
              id: modulo.curso.id,
              nombre: modulo.curso.nombre
            }] // Si es un solo objeto, lo colocamos en un array
      }))
    }

    loadOdsList(): void {
      this.odsService.getOdsListById(this.idIniciativa).subscribe(
        (response) => {
          this.odsList = response;
        },
        (error) => {
          console.error('Error al cargar los ODS:', error);
        }
      );
    }
  
    loadProfesoresList(): void {
      this.profesoresService.getProfesoresListById(this.idIniciativa).subscribe(
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
      this.cursosService.getCursosListById(this.idIniciativa).subscribe(
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
      this.entidadesServicie.getEntidadesListById(this.idIniciativa).subscribe(
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
      this.dimensionService.getDimensionesListById(this.idIniciativa).subscribe(
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
    anyadirModulo() {
      this.moduloAyadir = {
        idModulo: 0, // Identificador numérico
        nombre: this.nombreModulo, // Nombre del ODS
        curso: this.cursosSeleccionados
     }
     this.moduloSeleccionados.push(this.moduloAyadir)
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
  }
  
    eliminarEntidad(index: number) {
      this.entidadesSeleccionados.splice(index, 1);
    }
    eliminarMeta(meta: any): void {
      // Encontramos el índice de la meta seleccionada
      const index = this.metasSeleccionadas.indexOf(meta);
      
      // Si la meta se encuentra en el array, la eliminamos
      if (index > -1) {
        this.metasSeleccionadas.splice(index, 1);
      }
    }
    eliminarModulo(modulo: any) {
      const index = this.moduloSeleccionados.indexOf(modulo);
      
      // Si la meta se encuentra en el array, la eliminamos
      if (index > -1) {
        this.moduloSeleccionados.splice(index, 1);
      }
    }
    formatDateToYYYYMMDD(dateString: string): string {
      const parts = dateString.split('/'); // Split the date into parts (DD, MM, YYYY)
      const formattedDate = `${parts[2]}/${parts[1]}/${parts[0]}`; // Reorder to YYYY/MM/DD
      return formattedDate;
    }
    obtenerRangoAño(): string {
      const añoActual = new Date().getFullYear(); // Obtiene el año actual
      return `${añoActual}-${añoActual + 1}`; // Devuelve el rango de años en formato YYYY-YYYY
    }
    
  
    updateIniciativa(form: any): void {
      if (form.invalid) {
        return;
      }
    
    
      // Construir el objeto de la iniciativa, asegurándonos de que las propiedades estén en camelCase
      let iniciativa: Iniciativas = {
        id: this.idIniciativa,
        tipo: this.titulo,
        horas: this.horas,
        nombre: this.nombre,
        producto_final: this.producto,
        links: this.links,
        fecha_registro: this.iniciativasList[this.idIniciativa].fecha_registro,
        fecha_inicio: this.fechaInicio,
        fecha_fin: this.fechaFin,
        anyo_lectivo: this.obtenerRangoAño(),
        eliminado: false,
        innovador: false,
        imagen: this.imagen,
        metas: this.metasSeleccionadas.map(meta => ({
          id: meta.id,
          descripcion: meta.descripcion,
          ods: {
            id: meta.ods.id,
            nombre: meta.ods.nombre,
            dimension: {
              id: meta.ods.dimension.id,
              nombre: meta.ods.dimension.nombre
            }
          }
        })),
        profesores: this.profesoresSeleccionados.map(profesor => ({
          id: profesor.id,
          nombre: profesor.nombre
        })),
        entidades_Externas: this.entidadesSeleccionados.map(entidad => ({
          id: entidad.id,
          nombre: entidad.nombre
        })),
        modulos: this.moduloSeleccionados.map(modulo => ({
          idModulo: modulo.idModulo,
          nombre: modulo.nombre,
          curso: Array.isArray(modulo.curso) 
            ? modulo.curso.map(curso => ({
                id: curso.id,
                nombre: curso.nombre
              }))
            : [{
                id: modulo.curso.id,
                nombre: modulo.curso.nombre
              }] // Si es un solo objeto, lo colocamos en un array
        }))
      };
    
      // Llamada al servicio para crear la iniciativa
      this.iniciativasService.updateIniciativa(iniciativa).subscribe(
        response => {
          console.log('Iniciativa actualizada correctamente:', response);
          // Puedes hacer algo con la respuesta, como redirigir o mostrar un mensaje de éxito.
        },
        error => {
          console.error('Error al actualizar la iniciativa:', error);
          // Maneja el error aquí, como mostrar un mensaje de error al usuario.
        }
      );
    }
    
    
    modalVisible = false;
    abrirModal(meta: any): void {
      this.metaSeleccionada = meta;
      this.modalVisible = true;  // Cambiar la visibilidad del modal a true
    }
  
    // Función para cerrar el modal
    cerrarModal(): void {
      this.modalVisible = false;  // Cambiar la visibilidad del modal a false
    }
}
