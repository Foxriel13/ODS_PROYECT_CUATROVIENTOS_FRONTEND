import { Component, OnInit, SimpleChanges, ɵflushModuleScopingQueueAsMuchAsPossible } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavbarFormCrearComponent } from '../navbar-form-crear/navbar-form-crear.component';
import { Ods } from '../../models/ods.model';
import { ServiceOdsService } from '../../services/serviceOds/service-ods.service';
import { Profesores } from '../../models/profesores.model';
import { ServiceProfesoresService } from '../../services/serviceProfesores/service-profesores.service';
import { ServiceCursosService } from '../../services/serviceCursos/service-cursos.service';
import { Curso } from '../../models/curso.model';
import { ServiceEntidadesService } from '../../services/serviceEntidades/service-entidades.service';
import { entidadesExternas } from '../../models/entidades_externas.model';
import { IniciativasService } from '../../services/sercvicieIniciativasMostrar/iniciativas.service';
import { Iniciativas } from '../../models/iniciativas.model';
import { Meta } from '@angular/platform-browser';
import { Metas } from '../../models/metas.model';
import { Modulos } from '../../models/modulos.model';
import { MetasService } from '../../services/serviceMetas/metas.service';
import { ModulosService } from '../../services/serviceModulos/modulos.service';
import * as bootstrap from 'bootstrap';
import { Redes_Sociales } from '../../models/redes_sociales';
import { Actividad } from '../../models/actividades.model';
import { ActividadesService } from '../../services/serviceActividades/actividades.service';
import { RedesSocialesService } from '../../services/serviceRedesSociales/redes-sociales.service';


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
  cursoList: Curso[] = [];
  ActividadesList: Actividad[] = [];
  redes_socialesList: Redes_Sociales[] = []; 
  entidadesList: entidadesExternas[] = [];
  odsSeleccionados: Ods[] = []; // Lista de ODS seleccionados
  metaSeleccionada: Metas | null = null;
  profesoresSeleccionados: Profesores[] = [];
  cursosSeleccionados: Curso[] = [];
  entidadesSeleccionados: entidadesExternas[] = [];
  metasSeleccionadas: Metas[] = [];
  moduloSeleccionados: Modulos[] = [];
  actividadesSeleccionados: Actividad[] = [];
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
  actividad: Actividad = {
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
    redes_sociales: [],
    actividades: []
  }
  redes_sociales: Redes_Sociales = {
    id: 0,
    nombre: '',
    enlace: ''
  }

  metaAyadir: Metas | null = null;
  moduloAyadir: Modulos | null = null;
  toastVisible: boolean = false;
  loading: boolean = false;
  // Variable que mantiene la sección activa
  selectedTab: string = 'iniciativas'; // 'iniciativas' es la sección por defecto

  constructor(private odsService: ServiceOdsService, private profesoresService: ServiceProfesoresService, private cursosService: ServiceCursosService, private entidadesServicie: ServiceEntidadesService, private iniciativasService: IniciativasService,  private metasService: MetasService, private modulosService: ModulosService, private iniciativaServicie: IniciativasService,private redes_socialesServicie: RedesSocialesService,private actividadesServicie: ActividadesService) { }

  async ngOnInit(): Promise<void> {
    console.log("Loading activado:", this.loading); // ✅ Debería imprimir 'true'
    
    await Promise.all([
        this.loadOdsList(),
        this.loadProfesoresList(),
        this.loadCursosList(),
        this.loadEntidadesList(),
        this.loadMetasList(),
        this.loadModulosList(),
        this.loadIniciativasList(),
        this.loadRedesSociales(),
        this.loadActividades()
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
  loadActividades(): void {
    this.actividadesServicie.getActividadesList().subscribe(
      (response) => {
        this.ActividadesList = response;
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
  onTabChange(tab: string) {
    this.selectedTab = tab; // Cambiar la sección activa
  }
  anyadirActividad(): void {
    const selectedActividad = this.ActividadesList.find(item => item.nombre == this.actividad.nombre);
    if (selectedActividad) {
      if (this.actividadesSeleccionados.some(item => item.nombre === selectedActividad.nombre)) {
        alert('Esta actividad ya está añadido.');
      } else {
        this.actividadesSeleccionados.push(selectedActividad);
      }
    } else {
      alert('Por favor, selecciona una actividad válida.');
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

  anyadirRedSocial(): void {
    const selectedRedSocial = this.redes_socialesList.find(item => item.id == this.redes_sociales.id);
    if (selectedRedSocial) {
      if (this.redes_socialesSeleccionados.some(item => item.nombre === this.redes_sociales.nombre)) {
        alert('Esta red social ya está añadido.');
      } else {
        this.redes_socialesSeleccionados.push(selectedRedSocial);
      }
    } else {
      alert('Por favor, selecciona un profesor válido.');
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
  eliminarActividad(index: number) {
    this.actividadesSeleccionados.splice(index, 1);
  }

  eliminarOds(index: number) {
    this.odsSeleccionados.splice(index, 1);
  }
 
  eliminarRedSocial(index: number) {
    this.redes_socialesSeleccionados.splice(index, 1);
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
      metas: this.metasSeleccionadas,
      profesores: this.profesoresSeleccionados,
      entidades_externas: this.entidadesSeleccionados,
      modulos: this.moduloSeleccionados,
      redes_sociales: this.redes_socialesSeleccionados,
      actividades: this.actividadesSeleccionados
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
    this.redes_socialesSeleccionados = this.iniciativa.redes_sociales || [];
    this.actividadesSeleccionados = this.iniciativa.actividades || [];
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
    for (let i = 0; i < this.actividadesSeleccionados.length; i++) {
      let actividadesSeleccionado = this.actividadesSeleccionados[i];

      let actividadEncontrada = this.ActividadesList.find(x => x.nombre === actividadesSeleccionado.nombre);

      if (actividadEncontrada) {
        listEntidad.push(actividadEncontrada);
      }
    }
    for (let i = 0; i < this.redes_socialesSeleccionados.length; i++) {
      let redes_socialesSeleccionado = this.redes_socialesSeleccionados[i];

      let redes_socialEncontrada = this.redes_socialesList.find(x => x.nombre === redes_socialesSeleccionado.nombre);

      if (redes_socialEncontrada) {
        listEntidad.push(redes_socialEncontrada);
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
      redes_sociales: [],
      actividades: []
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
  showToastEnlace() {
    this.toastVisible = true;
    setTimeout(() => {
      this.toastVisible = false;
      this.loading = true;
    }, 3000);
  }
  ocultarActividad() {
    var selectActividad = document.getElementById("mostrarActividad");
    var inputRedes = document.getElementById("crearActividad");
    var boton = document.getElementById("buttonCrear");
    // Ocultar el elemento selectRedes
    if (inputRedes) {
      inputRedes.hidden = true;
    }

    // Mostrar el elemento inputRedes
    if (selectActividad) {
      selectActividad.removeAttribute("hidden");
    }
    if (boton) {
      boton.removeAttribute("hidden");
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
  mostrarActividad() {
    var selectRedes = document.getElementById("mostrarActividad");
    var inputRedes = document.getElementById("crearActividad");
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
  /*
  crearActividad(){
    var nombre = document.getElementById("nombreActividad") as HTMLInputElement;
    if (nombre) {
      var actividadNueva : Actividad = {
        id: 0,
        nombre: nombre.value
      };
      this.actividadesServicie.CreateActividadesList(actividadNueva).subscribe(
        response => {
          console.log('Enlace creado correctamente:', response);

          // Aquí, después de crear la red social, actualizamos la lista y la mostramos
          this.ActividadesList.push(actividadNueva);  // Aseguramos que la lista esté actualizada con la nueva red social

          this.showToastEnlace();

          // Cargar nuevamente las redes sociales (si es necesario)
          this.loadActividades();
        },
        error => {
          console.error('Error al crear la iniciativa:', error);
          // Maneja el error aquí, como mostrar un mensaje de error al usuario.
        }
      );

      this.ocultarActividad(); // Ocultar algo si es necesario
    } else {
      console.error("No se encontraron los elementos nombreLink o enlaceLink.");
    }
    this.ocultarActividad();
  }
    */
}