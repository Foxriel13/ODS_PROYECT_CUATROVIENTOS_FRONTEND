import { Component, OnInit, SimpleChanges, ɵflushModuleScopingQueueAsMuchAsPossible } from '@angular/core';
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
import * as bootstrap from 'bootstrap';
import { Redes_Sociales } from '../../models/redes_sociales';


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
  redes_sociales: string = '';
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
  redes_socialesSeleccionados: Redes_Sociales[] = [];
  iniciativaList: Iniciativas[] = [];
  boton : boolean = false;
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
  iniciativa: Iniciativas = {
    id: 0,
    tipo: '',
    horas: 0,
    nombre: '',
    explicacion: '',
    fecha_registro: '',
    fecha_inicio: '',
    fecha_fin: '',
    anyo_lectivo: '',
    eliminado: false,
    innovador: false,
    imagen: '',
    metas: [],
    profesores: [],
    entidades_externas: [],
    modulos: [],
    mas_comentarios: '',
    redes_sociales: []
  }
  metaAyadir: Metas | null = null;
  moduloAyadir: Modulos | null = null;
  toastVisible: boolean = false;
  loading: boolean = false;
  // Variable que mantiene la sección activa
  selectedTab: string = 'iniciativas'; // 'iniciativas' es la sección por defecto

  constructor(private odsService: ServiceOdsService, private profesoresService: ServiceProfesoresService, private cursosService: ServiceCursosService, private entidadesServicie: ServiceEntidadesService, private iniciativasService: IniciativasService, private dimensionService: ServiceDimensionService, private metasService: MetasService, private modulosService: ModulosService, private iniciativaServicie: IniciativasService) { }

  async ngOnInit(): Promise<void> {
    this.loading = true;
    console.log("Loading activado:", this.loading); // ✅ Debería imprimir 'true'
    
    await Promise.all([
        this.loadOdsList(),
        this.loadProfesoresList(),
        this.loadCursosList(),
        this.loadEntidadesList(),
        this.loadDimensionesList(),
        this.loadMetasList(),
        this.loadModulosList(),
        this.loadIniciativasList()
    ]);

    
    console.log("Loading desactivado:", this.loading); // ✅ Debería imprimir 'false'
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
  loadIniciativasList(): void {
    this.iniciativaServicie.getIniciativas().subscribe(
      (response) => {
        console.log('Entidades cargados:', response);
        this.iniciativaList = response;
      },
      (error) => {
        console.error('Error al cargar las entidades:', error);
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
    var listProfe = [];
    for (let i = 0; i < this.profesoresSeleccionados.length; i++) {
      let profeSeleccionada = this.profesoresSeleccionados[i];

      let profeEncontrada = this.ProfesoresList.find(x => x.nombre === profeSeleccionada.nombre);

      if (profeEncontrada) {
        listProfe.push(profeEncontrada);
      }
    }
    if (selectedProfe) {
      if (listProfe.some(item => item.id === selectedProfe.id)) {
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
    var listEntidad = [];
    for (let i = 0; i < this.entidadesSeleccionados.length; i++) {
      let entidadSeleccionada = this.entidadesSeleccionados[i];

      let entidadEncontrada = this.entidadesList.find(x => x.nombre === entidadSeleccionada.nombre);

      if (entidadEncontrada) {
        listEntidad.push(entidadEncontrada);
      }
    }
    if (selectedEntidad) {
      if (listEntidad.some(item => item.id === selectedEntidad.id)) {
        alert('Esta entidad ya está añadida.');
      } else {
        this.entidadesSeleccionados.push(selectedEntidad);
      }
    } else {
      alert('Por favor, selecciona una entidad válida.');
    }
  }
  anyadirModulo() {
    const selectedModulo = this.ModulosList.find(item => item.id == this.modules.id);
    var listModulos = [];
    for (let i = 0; i < this.moduloSeleccionados.length; i++) {
      let moduloSeleccionada = this.moduloSeleccionados[i];

      let moduloEncontrada = this.ModulosList.find(x => x.nombre === moduloSeleccionada.nombre);

      if (moduloEncontrada) {
        listModulos.push(moduloEncontrada);
      }
    }
    if (selectedModulo) {
      if (listModulos.some(item => item.id === selectedModulo.id)) {
        alert('Este Modulo ya está añadido.');
      } else {
        this.moduloSeleccionados.push(selectedModulo);
      }
    } else {
      alert('Por favor, selecciona una Meta válida.');
    }
  }
  anyadirMeta() {
    const selectedMeta = this.MetasList.find(item => item.id == this.Metas.id);
    let listMetas = [];

    for (let i = 0; i < this.metasSeleccionadas.length; i++) {
      let metaSeleccionada = this.metasSeleccionadas[i];

      let metaEncontrada = this.MetasList.find(x => x.descripcion === metaSeleccionada.descripcion);

      if (metaEncontrada) {
        listMetas.push(metaEncontrada);
      }
    }
    if (selectedMeta) {
      if (listMetas.some(item => item.id === selectedMeta.id)) {
        alert('Esta Meta ya está añadido.');
      } else {
        this.metasSeleccionadas.push(selectedMeta);
      }
    } else {
      alert('Por favor, selecciona una Meta válida.');
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


  guardarIniciativa(form: any): void {

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
          dimension: meta.ods.dimension
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
        })
        )
        })),
      redes_sociales: this.redes_socialesSeleccionados.map(redes_sociales=> ({
        id: redes_sociales.id,
        nombre: redes_sociales.nombre,
        enlace:redes_sociales.enlace
      }))
    };

    console.log("this.metasSeleccionadas:", this.metasSeleccionadas);

    // Llamada al servicio para crear la iniciativa
    this.iniciativasService.createIniciativa(iniciativa).subscribe(
      response => {
        console.log('Iniciativa creada correctamente:', response);
        // Puedes hacer algo con la respuesta, como redirigir o mostrar un mensaje de éxito.
      },
      error => {
        console.error('Error al crear la iniciativa:', error);
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
  cargarDatos() {
    var iniciativaActualizar = this.iniciativa;
    this.titulo = iniciativaActualizar.tipo
  }
  onChangeIniciativa(event: any) {
    this.titulo = this.iniciativa.tipo;
    this.horas = this.iniciativa.horas;
    this.nombre = this.iniciativa.nombre;
    this.producto = this.iniciativa.explicacion;
    this.fechaInicio = this.formatDate(this.iniciativa.fecha_inicio);
    this.fechaFin = this.formatDate(this.iniciativa.fecha_fin);
    this.imagen = this.iniciativa.imagen;
    this.mas_comentarios = this.iniciativa.mas_comentarios;

    this.metasSeleccionadas = this.iniciativa.metas || [];
    this.profesoresSeleccionados = this.iniciativa.profesores || [];
    this.entidadesSeleccionados = this.iniciativa.entidades_externas || [];
    this.moduloSeleccionados = this.iniciativa.modulos || [];
  }
  formatDate(dateString: string): string {
    return dateString.split(" ")[0]; // Extract only "yyyy-MM-dd"
  }
  confirmarActualizacion() {
    const modalElement = document.getElementById('confirmacionModal');
    if (modalElement) {
      let modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }
  actualizarIniciativaConfirmada() {
    if (this.iniciativa && this.iniciativa.id) {
      this.actualizarIniciativa(this.iniciativa.id);
    } else {
      console.warn("No hay una iniciativa seleccionada");
    }
  }

  // Muestra el spinner mientras se realiza la petición para eliminar
  actualizarIniciativa(form: any): void {
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
      listaMetas.push(this.metasSeleccionadas[i].id);
    }
    console.log("Antes de actualizar iniciativa"); // 🔍 Verificar si llega aquí

    console.log("this.titulo:", this.titulo);
    console.log("this.horas:", this.horas);
    console.log("this.nombre:", this.nombre);
    console.log("this.fechaInicio:", this.fechaInicio);
    console.log("this.fechaFin:", this.fechaFin);
    console.log("this.metasSeleccionadas:", this.metasSeleccionadas);
    console.log("this.profesoresSeleccionados:", this.profesoresSeleccionados);
    console.log("this.entidadesSeleccionados:", this.entidadesSeleccionados);
    console.log("this.moduloSeleccionados:", this.moduloSeleccionados);
    let listMetas = [];

    for (let i = 0; i < this.metasSeleccionadas.length; i++) {
      let metaSeleccionada = this.metasSeleccionadas[i];

      let metaEncontrada = this.MetasList.find(x => x.descripcion === metaSeleccionada.descripcion);

      if (metaEncontrada) {
        listMetas.push(metaEncontrada);
      }
    }

    var listProfe = [];
    for (let i = 0; i < this.profesoresSeleccionados.length; i++) {
      let profeSeleccionada = this.profesoresSeleccionados[i];

      let profeEncontrada = this.ProfesoresList.find(x => x.nombre === profeSeleccionada.nombre);

      if (profeEncontrada) {
        listProfe.push(profeEncontrada);
      }
    }

    var listEntidad = [];
    for (let i = 0; i < this.entidadesSeleccionados.length; i++) {
      let entidadSeleccionada = this.entidadesSeleccionados[i];

      let entidadEncontrada = this.entidadesList.find(x => x.nombre === entidadSeleccionada.nombre);

      if (entidadEncontrada) {
        listEntidad.push(entidadEncontrada);
      }
    }

    var listModulos = [];
    for (let i = 0; i < this.moduloSeleccionados.length; i++) {
      let moduloSeleccionada = this.moduloSeleccionados[i];

      let moduloEncontrada = this.ModulosList.find(x => x.nombre === moduloSeleccionada.nombre);

      if (moduloEncontrada) {
        listModulos.push(moduloEncontrada);
      }
    }


    // Construir el objeto de la iniciativa con las propiedades correctas
    let iniciativa: Iniciativas = {
      id: this.iniciativa.id, // Asegúrate de tener el id para la actualización
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
      metas: listMetas,
      profesores: listProfe,
      entidades_externas: listEntidad,
      modulos: listModulos,
      redes_sociales: []
    };

    console.log("Iniciativa a actualizar:", iniciativa);
    // Llamada al servicio para actualizar la iniciativa con el PUT
    this.iniciativasService.updateIniciativa(iniciativa).subscribe(
      response => {
        console.log('Iniciativa actualizada correctamente:', response);
        // Puedes hacer algo con la respuesta, como redirigir o mostrar un mensaje de éxito.
      },
      error => {
        console.error('Error al actualizar la iniciativa:', error);
        // Maneja el error aquí, como mostrar un mensaje de error al usuario.
        this.boton = false
      }
    );
    this.showToast();
  }

  showToast() {
    this.toastVisible = true;
    setTimeout(() => {
      this.toastVisible = false;
      window.location.href= "/Iniciativas";
    }, 3000);
  }
    
}