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
import { MetasService } from '../../serviceMetas/metas.service';
import { ModulosService } from '../../serviceModulos/modulos.service';
import { Redes_Sociales } from '../../models/redes_sociales';
import { isScheduler } from 'rxjs/internal/util/isScheduler';
import { RedesSocialesService } from '../../serviceRedesSociales/redes-sociales.service';

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
  mas_comentarios: String = '';
  nombreModulo: string = '';
  imagen: string = "";
  odsList: Ods[] = []; // Lista de ODS
  redes_socialesList: Redes_Sociales[] = []; // Lista de ODS
  ProfesoresList: Profesores[] = [];
  ModulosList: Modulos[] = [];
  MetasList: Metas[] = [];
  DimensionesList: Dimension[] = [];
  cursoList: Curso[] = [];
  entidadesList: entidadesExternas[] = [];
  odsSeleccionados: Ods[] = []; // Lista de ODS seleccionados
  metaSeleccionada: Metas | null = null;
  dimensionSeleccionada: Dimension[] = [];  // Cambiado para ser un objeto y no un array // Lista de ODS seleccionados
  profesoresSeleccionados: Profesores[] = [];
  cursosSeleccionados: Curso[] = [];
  entidadesSeleccionados: entidadesExternas[] = [];
  metasSeleccionadas: Metas[] = [];
  moduloSeleccionados: Modulos[] = [];
  boton: boolean = false;
  redes_socialesSeleccionados: Redes_Sociales[] = [];
  ods: Ods = {  // ODS será un solo objeto ahora
    idOds: 0,
    nombre: '',
    dimension: ''
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
  Metas: Metas = {
    id: 0,
    descripcion: '',
    ods: {
      idOds: 0,
      nombre: '',
      dimension: ''
    }
  };
  modules: Modulos = {
    id: 0, // Identificador numérico
    nombre: "", // Nombre del ODS
    clase: []
  };
  redes_sociales: Redes_Sociales = {
    id: 0,
    nombre: '',
    enlace: ''
  }
  metaAyadir: Metas | null = null;
  moduloAyadir: Modulos | null = null;

  // Variable que mantiene la sección activa
  selectedTab: string = 'iniciativas'; // 'iniciativas' es la sección por defecto

  constructor(private odsService: ServiceOdsService, private profesoresService: ServiceProfesoresService, private cursosService: ServiceCursosService, private entidadesServicie: ServiceEntidadesService, private iniciativasService: IniciativasService, private dimensionService: ServiceDimensionService, private metasService: MetasService, private modulosService: ModulosService, private redes_socialesServicie: RedesSocialesService) { }

  ngOnInit(): void {
    this.boton = false;
    this.loadOdsList();
    this.loadProfesoresList();
    this.loadCursosList();
    this.loadEntidadesList();
    this.loadDimensionesList();
    this.loadMetasList();
    this.loadModulosList();
    this.loadRedesSociales();
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
  loadRedesSociales(): void {
    this.redes_socialesServicie.getRedesSocialesList().subscribe(
      (response) => {
        this.redes_socialesList = response;
      },
      (error) => {
        console.error('Error al cargar los ODS:', error);
      }
    );
  }
  loadModulosList(): void {
    this.modulosService.getModulosList().subscribe(
      (response) => {
        this.ModulosList = response;
      },
      (error) => {
        console.error('Error al cargar los ODS:', error);
      }
    );
  }
  loadMetasList(): void {
    this.metasService.getMetasList().subscribe(
      (response) => {
        console.log('Metas cargados:', response);
        this.MetasList = response;
      },
      (error) => {
        console.error('Error al cargar los profesores:', error);
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
    const selectedOds = this.odsList.find(item => item.idOds == this.ods.idOds);

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
  anyadirRedSocial(): void {
    const selectedRedSocial = this.redes_socialesList.find(item => item.id == this.redes_sociales.id);
    if (selectedRedSocial) {
      if (this.redes_socialesSeleccionados.some(item => item.id === this.redes_sociales.id)) {
        alert('Este profesor ya está añadido.');
      } else {
        this.redes_socialesSeleccionados.push(selectedRedSocial);
      }
    } else {
      alert('Por favor, selecciona un profesor válido.');
    }
  }
  anyadirRedSociales(redSocial: Redes_Sociales): void {
    const selectedRedSocial = this.redes_socialesList.find(item => item.id == redSocial.id);
    if (selectedRedSocial) {
      if (this.redes_socialesSeleccionados.some(item => item.id === this.redes_sociales.id)) {
        alert('Este profesor ya está añadido.');
      } else {
        this.redes_socialesSeleccionados.push(selectedRedSocial);
      }
    } else {
      alert('Por favor, selecciona un profesor válido.');
    }
  }
  mostrarRedSocial() {
    var selectRedes = document.getElementById("mostrarRedSocial");
    var inputRedes = document.getElementById("crearRedSocial");
    var boton = document.getElementById("buttonCrear");
    // Ocultar el elemento selectRedes
    if (selectRedes) {
      selectRedes.hidden = true;
    }
    if (boton) {
      boton.hidden = true;
    }

    // Mostrar el elemento inputRedes
    if (inputRedes) {
      inputRedes.removeAttribute("hidden");
    }
  }

  ocultarRedSocial() {
    var selectRedes = document.getElementById("mostrarRedSocial");
    var inputRedes = document.getElementById("crearRedSocial");
    var boton = document.getElementById("buttonCrear");
    // Ocultar el elemento selectRedes
    if (inputRedes) {
      inputRedes.hidden = true;
    }

    // Mostrar el elemento inputRedes
    if (selectRedes) {
      selectRedes.removeAttribute("hidden");
    }
    if (boton) {
      boton.removeAttribute("hidden");
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
  anyadirClase() {
    const selectedClase = this.cursoList.find(item => item.id == this.curso.id);
    if (selectedClase) {
      if (this.cursosSeleccionados.some(item => item.id === selectedClase.id)) {
        alert('Esta Clase ya está añadida.');
      } else {
        this.cursosSeleccionados.push(selectedClase);
      }
    } else {
      alert('Por favor, selecciona una Clase válida.');
    }
  }

  crearModulo() {
    var modulo : Modulos = {
      id: 0,
      nombre: '',
      clase:  []
    }
    var nombreModulo = document.getElementById("nombreModulo") as HTMLInputElement
    modulo.nombre = nombreModulo.value;
    for (let i = 0; i < this.cursosSeleccionados.length; i++) {
      modulo.clase.push(this.cursosSeleccionados[i])
    }
    console.log("this.modulo:", this.modulo);

    // Llamada al servicio para crear la iniciativa
    this.modulosService.createModulo(modulo).subscribe(
      response => {

        console.log('Modulo creado correctamente:', response);
      },
      error => {
        console.error('Error al crear la iniciativa:', error);
        // Maneja el error aquí, como mostrar un mensaje de error al usuario.
        this.boton = false;
      }
    );
    this.loadModulosList();
  }
  anyadirModulo() {
    this.crearModulo();
    const selectedModulo = this.ModulosList.find(item => item.id == this.modules.id);
    if (selectedModulo) {
      if (this.moduloSeleccionados.some(item => item.id === selectedModulo.id)) {
        alert('Este Modulo ya está añadido.');
      } else {
        this.moduloSeleccionados.push(selectedModulo);
      }
    } else {
      alert('Por favor, selecciona una Meta válida.');
    }
  }
  anyadirMeta() {
    var nombreMeta = (document.getElementById("nombreMeta") as HTMLInputElement).value;
    var ods = document.getElementById("odsElegido") as HTMLSelectElement;
    if (!nombreMeta || ods.selectedIndex === 0) {
      alert('Por favor, selecciona una Meta válida.');
      return;
    }

    var nombreOds = this.odsList[ods.selectedIndex - 1].nombre;

    let odsNew: Ods | null = null;  // Inicializar como null para evitar errores.

    // Buscar el ODS correspondiente
    for (let i = 0; i < this.odsList.length; i++) {
      if (this.odsList[i].nombre == nombreOds) {
        odsNew = this.odsList[i];
        break;  // Se sale del loop una vez se ha encontrado el ODS.
      }
    }

    // Verificar si se encontró el ODS
    if (odsNew !== null) {
      let metaNueva: Metas = {
        id: this.metasSeleccionadas.length + 1, // Puedes cambiar la lógica del ID si es necesario
        descripcion: nombreMeta,
        ods: {
          idOds: odsNew.idOds,
          nombre: nombreOds,
          dimension: ''
        }
      };

      // Verificar si la meta ya está añadida
      if (this.metasSeleccionadas.some(item => item.descripcion.toUpperCase() === metaNueva.descripcion.toUpperCase())) {
        alert('Esta Meta ya está añadida.');
        return;
      }

      // Añadir la nueva meta si no existe
      this.metasSeleccionadas.push(metaNueva);
    } else {
      alert('No se ha encontrado el ODS seleccionado.');
    }
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
  eliminarRedSocial(index: number) {
    this.redes_socialesSeleccionados.splice(index, 1);
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
  eliminarClase(index: number) {
    this.cursosSeleccionados.splice(index, 1);
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


  guardarIniciativa(form: any): void {
    this.boton = true;
    if (form.invalid) {
      return;
    }

    const formattedDate = new Date(Date.now());
    const day = String(formattedDate.getDate()).padStart(2, '0');
    const month = String(formattedDate.getMonth() + 1).padStart(2, '0');
    const year = formattedDate.getFullYear();
    const formattedDateString = `${year}-${month}-${day}`;

    const listaMetas = []
    for (let i = 0; i < this.metasSeleccionadas.length; i++) {
      listaMetas.push(this.metasSeleccionadas[i].id)
    }
    console.log("Antes de crear iniciativa"); // 🔍 Verificar si llega aquí

    console.log("this.titulo:", this.titulo);
    console.log("this.horas:", this.horas);
    console.log("this.nombre:", this.nombre);
    console.log("this.fechaInicio:", this.fechaInicio);
    console.log("this.fechaFin:", this.fechaFin);
    console.log("this.metasSeleccionadas:", this.metasSeleccionadas);
    console.log("this.profesoresSeleccionados:", this.profesoresSeleccionados);
    console.log("this.entidadesSeleccionados:", this.entidadesSeleccionados);
    console.log("this.moduloSeleccionados:", this.moduloSeleccionados);

    // Construir el objeto de la iniciativa, asegurándonos de que las propiedades estén en camelCase
    let iniciativa: Iniciativas = {
      id: 0,
      tipo: this.titulo,
      horas: this.horas,
      nombre: this.nombre,
      explicacion: this.producto,
      fecha_registro: formattedDateString,
      fecha_inicio: this.fechaInicio,
      fecha_fin: this.fechaFin,
      anyo_lectivo: this.obtenerRangoAño(),
      eliminado: false,
      innovador: false,
      mas_comentarios: this.mas_comentarios,
      imagen: this.imagen,
      metas: this.metasSeleccionadas.map(meta => ({
        id: meta.id,
        descripcion: meta.descripcion,
        ods: {
          idOds: meta.ods.idOds,
          nombre: meta.ods.nombre,
          dimension: ''
        }
      })),

      profesores: this.profesoresSeleccionados.map(profesor => ({
        id: profesor.id,
        nombre: profesor.nombre
      })),
      entidades_externas: this.entidadesSeleccionados.map(entidad => ({
        id: entidad.id,
        nombre: entidad.nombre
      })),
      modulos: this.moduloSeleccionados.map(modulo => ({
        id: modulo.id,
        nombre: modulo.nombre,
        clase: this.cursosSeleccionados.map(curso => ({
          id: curso.id,
          nombre: curso.nombre
        }))
      })),
      redes_sociales: this.redes_socialesSeleccionados.map(redes_sociales => ({
        id: redes_sociales.id,
        nombre: redes_sociales.nombre,
        enlace: redes_sociales.enlace
      }))
    };

    console.log("this.metasSeleccionadas:", this.metasSeleccionadas);

    // Llamada al servicio para crear la iniciativa
    this.iniciativasService.createIniciativa(iniciativa).subscribe(
      response => {

        console.log('Iniciativa creada correctamente:', response);
        this.showToast();
      },
      error => {
        console.error('Error al crear la iniciativa:', error);
        // Maneja el error aquí, como mostrar un mensaje de error al usuario.
        this.boton = false;
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
  toastVisible: boolean = false;
  loading: boolean = false;
  showToast() {
    this.toastVisible = true;
    setTimeout(() => {
      this.toastVisible = false;
      this.loading = true;
      window.location.href = "/Iniciativas";
    }, 3000);
  }
  showToastEnlace() {
    this.toastVisible = true;
    setTimeout(() => {
      this.toastVisible = false;
      this.loading = true;
    }, 3000);
  }
  cargarImagenODS(nombre: any) {
    var id = 1;
    var ods: Ods | undefined;  // Allow ods to be undefined initially.

    // Search for the matching ODS.
    for (let i = 0; i < this.odsList.length; i++) {
      if (this.odsList[i].nombre === nombre) {
        id = i + 1;
        ods = this.odsList[i];
        break;  // Break once a match is found to avoid unnecessary iterations.
      }
    }

    // Ensure that ods is assigned before using it.
    if (ods) {
      var imagen = document.getElementById("imagenOds") as HTMLImageElement;
      imagen.src = `/Ods_img/ods${id}.png`;

      var dimensionText = document.getElementById("dimensionText") as HTMLInputElement;
      dimensionText.textContent = ods.dimension;
    } else {
      // Handle the case where the ODS wasn't found
      console.log('ODS not found');
      // Optionally, set a default image or display a message.
    }
  }

  crearLinks() {
    var nombre = document.getElementById("nombreLink") as HTMLInputElement;
    var link = document.getElementById("enlaceLink") as HTMLInputElement;
    var selector = document.getElementById("linkSelector") as HTMLSelectElement;

    if (nombre && link) { // Verifica que los elementos existen antes de usarlos
      var red_socialNueva: Redes_Sociales = {
        id: 0,
        nombre: nombre.value,  // Usamos .value en lugar de .textContent
        enlace: link.value     // Usamos .value en lugar de .textContent
      };

      this.redes_socialesServicie.CreateRedesSocialesList(red_socialNueva).subscribe(
        response => {
          console.log('Enlace creado correctamente:', response);

          // Aquí, después de crear la red social, actualizamos la lista y la mostramos
          this.redes_socialesList.push(red_socialNueva);  // Aseguramos que la lista esté actualizada con la nueva red social

          // Ya podemos buscar y añadir la red social a la lista
          this.anyadirRedSociales(red_socialNueva);

          // Mostramos un mensaje de éxito
          this.showToastEnlace();

          // Cargar nuevamente las redes sociales (si es necesario)
          this.loadRedesSociales();
        },
        error => {
          console.error('Error al crear la iniciativa:', error);
          // Maneja el error aquí, como mostrar un mensaje de error al usuario.
        }
      );

      this.ocultarRedSocial(); // Ocultar algo si es necesario
    } else {
      console.error("No se encontraron los elementos nombreLink o enlaceLink.");
    }
  }



}
