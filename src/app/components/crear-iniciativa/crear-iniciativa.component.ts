import { Component, OnInit, ɵflushModuleScopingQueueAsMuchAsPossible } from '@angular/core';
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
import { Redes_Sociales } from '../../models/redes_sociales';
import { isScheduler } from 'rxjs/internal/util/isScheduler';
import { RedesSocialesService } from '../../services/serviceRedesSociales/redes-sociales.service';
import { Actividad } from '../../models/actividades.model';
import { ModulosService } from '../../services/serviceModulos/modulos.service';
import { ActividadesService } from '../../services/serviceActividades/actividades.service';

@Component({
  selector: 'app-crear-iniciativa',
  standalone: true,
  imports: [FormsModule, CommonModule, NavbarFormCrearComponent],
  templateUrl: './crear-iniciativa.component.html',
  styleUrls: ['./crear-iniciativa.component.scss']
})
export class CrearIniciativaComponent implements OnInit {
  selectedTab: string = 'iniciativas'; // Tab inicial
  tabsEnabled: boolean[] = [true, false, false, false]; // Estado de los tabs


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
  ActividadesList: Actividad[] = [];
  MetasList: Metas[] = [];
  cursoList: Curso[] = [];
  entidadesList: entidadesExternas[] = [];
  odsSeleccionados: Ods[] = []; // Lista de ODS seleccionados
  metaSeleccionada: Metas | null = null;
  profesoresSeleccionados: Profesores[] = [];
  cursosSeleccionados: Curso[] = [];
  entidadesSeleccionados: entidadesExternas[] = [];
  metasSeleccionadas: Metas[] = [];
  moduloSeleccionados: Modulos[] = [];
  actividadesSeleccionados: Actividad[] = [];


  
  boton: boolean = false;
  listMetasOds: Metas[] = [];
  redes_socialesSeleccionados: Redes_Sociales[] = [];
  ods: Ods = {
    idOds: 0,
    nombre: '',
    dimension: '',
    eliminado: false
  };
  profesor: Profesores = {
    id: 0,
    nombre: '',
    eliminado: false
  };
  actividad: Actividad = {
    id: 0,
    nombre: '',
    eliminado: false
  }
  curso: Curso = {
    id: 0,
    nombre: '',
    eliminado: false
  };
  entidad: entidadesExternas = {
    id: 0,
    nombre: '',
    eliminado: false
  };
  Metas: Metas = {
    id: 0,
    descripcion: '',
    ods: {
      idOds: 0,
      nombre: '',
      dimension: '',
      eliminado: false
    },
    eliminado: false
  };
  modules: Modulos = {
    id: 0, // Identificador numérico
    nombre: "", // Nombre del ODS
    clases: [],
    eliminado: false
  };
  redes_sociales: Redes_Sociales = {
    id: 0,
    nombre: '',
    enlace: '',
    eliminado: false
  }
  metaAyadir: Metas | null = null;
  moduloAyadir: Modulos | null = null;
  

  constructor(private odsService: ServiceOdsService, private profesoresService: ServiceProfesoresService, private cursosService: ServiceCursosService, private entidadesServicie: ServiceEntidadesService, private iniciativasService: IniciativasService, private metasService: MetasService, private modulosService: ModulosService, private redes_socialesServicie: RedesSocialesService, private actividadesServicie: ActividadesService) { }

  ngOnInit(): void {
    this.boton = false;
    this.loadOdsList();
    this.loadProfesoresList();
    this.loadCursosList();
    this.loadEntidadesList();
    this.loadMetasList();
    this.loadModulosList();
    this.loadRedesSociales();
    this.loadActividades();
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
  onTabChange(tab: string): void {
    const tabIndex = this.getTabIndex(tab);
    if (this.tabsEnabled[tabIndex]) {
      this.selectedTab = tab;
    }
  }
  getTabIndex(tab: string): number {
    const tabs = ['iniciativas', 'metas', 'modulos', 'profesores', 'entidades', 'redes', 'actividades'];
    return tabs.indexOf(tab);
  }

  validarIniciativa(): void {
    
    if (this.nombre && this.fechaInicio && this.fechaFin && this.horas > 0) {
      this.tabsEnabled[1] = true; // Habilitar el tab de Metas
      console.log('validadooooo')
    } else {
      alert('Por favor, completa todos los campos de la iniciativa.');
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
      if (this.profesoresSeleccionados.some(item => item.nombre === selectedProfe.nombre)) {
        alert('Este profesor ya está añadido.');
      } else {
        this.profesoresSeleccionados.push(selectedProfe);
        this.tabsEnabled[4] = true; 
      }
    } else {
      alert('Por favor, selecciona un profesor válido.');
    }
  }
  anyadirActividad(): void {
    const selectedActividad = this.ActividadesList.find(item => item.id == this.actividad.id);
    if (selectedActividad) {
      if (this.actividadesSeleccionados.some(item => item.id === selectedActividad.id)) {
        alert('Esta actividad ya está añadido.');
      } else {
        this.actividadesSeleccionados.push(selectedActividad);
      }
    } else {
      alert('Por favor, selecciona una actividad válida.');
    }
  }
  anyadirRedSocial(): void {
    const selectedRedSocial = this.redes_socialesList.find(item => item.id == this.redes_sociales.id);
    if (selectedRedSocial) {
      if (this.redes_socialesSeleccionados.some(item => item.id === this.redes_sociales.id)) {
        alert('Esta red social ya está añadido.');
      } else {
        this.redes_socialesSeleccionados.push(selectedRedSocial);
        this.tabsEnabled[6] = true;
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
  anyadirEntidad(): void {
    const selectedEntidad = this.entidadesList.find(item => item.id == this.entidad.id);
    if (selectedEntidad) {
      if (this.entidadesSeleccionados.some(item => item.id === selectedEntidad.id)) {
        alert('Esta entidad ya está añadida.');
      } else {
        this.entidadesSeleccionados.push(selectedEntidad);
        this.tabsEnabled[5] = true; 
      }
    } else {
      alert('Por favor, selecciona una entidad válida.');
    }
  }
  anyadirclases() {
    const selectedclases = this.cursoList.find(item => item.id == this.curso.id);
    if (selectedclases) {
      if (this.cursosSeleccionados.some(item => item.id === selectedclases.id)) {
        alert('Esta clases ya está añadida.');
      } else {
        this.cursosSeleccionados.push(selectedclases);
      }
    } else {
      alert('Por favor, selecciona una clases válida.');
    }
  }

  anyadirModulo() {
    // Obtener los elementos select
    const selectModulo = document.getElementById("nombreModulo") as HTMLSelectElement;
    const selectclases = document.getElementById("nombreclases") as HTMLSelectElement;

    // Obtener la opción seleccionada
    const nombreModulo = selectModulo.options[selectModulo.selectedIndex]?.text.trim();
    const nombreclases = selectclases.options[selectclases.selectedIndex]?.text.trim();

    if (!nombreModulo || !nombreclases) {
      alert('Por favor, selecciona un módulo y una clases válida.');
      return;
    }

    // Buscar el módulo en la lista de módulos
    let moduloNew: Modulos | null = this.ModulosList.find(m => m.nombre === nombreModulo) || null;
    // Buscar el curso en la lista de cursos
    let cursoNew: Curso | null = this.cursoList.find(c => c.nombre === nombreclases) || null;

    if (moduloNew && cursoNew) {
      // Obtener el ID correcto desde idModulo (aunque no esté tipado)
      const idModuloCorrecto = (moduloNew as any)['idModulo'];

      // Buscar si el módulo ya está en la lista de módulos seleccionados
      let moduloExistente = this.moduloSeleccionados.find(m => m.nombre === moduloNew!.nombre);
      if (moduloExistente) {
        // Asegurar que use el ID correcto
        moduloExistente.id = idModuloCorrecto;

        // Si el módulo ya existe, agregar el curso a la lista `clases` si no está agregado aún
        if (!moduloExistente.clases.some(c => c.id === cursoNew!.id)) {
          moduloExistente.clases.push(cursoNew);
        } else {
          alert("El curso ya está asignado a este módulo.");
        }
      } else {
        // Si el módulo no existe, crearlo y agregarlo a `moduloSeleccionados`
        let nuevoModulo: Modulos = {
          id: idModuloCorrecto,
          nombre: moduloNew.nombre,
          clases: [cursoNew], // Se inicializa con el curso seleccionado
          eliminado: false
        };

        this.moduloSeleccionados.push(nuevoModulo);
        this.tabsEnabled[3] = true;
      }

      console.log("Módulo actualizado:", this.moduloSeleccionados);
    } else {
      alert('No se encontró el módulo o la clases seleccionada.');
    }
  }


  anyadirMeta() {
    // Obtener los elementos select
    const selectMeta = document.getElementById("nombreMeta") as HTMLSelectElement;
    const selectOds = document.getElementById("odsElegido") as HTMLSelectElement;

    // Obtener la opción seleccionada
    const nombreMeta = selectMeta.options[selectMeta.selectedIndex]?.text;
    const nombreOds = selectOds.options[selectOds.selectedIndex]?.text;

    // Validar que se haya seleccionado una opción válida
    if (!nombreMeta || nombreMeta.includes("Seleccione una Meta") || selectOds.selectedIndex === 0) {
      alert('Por favor, selecciona una Meta y un ODS válido.');
      return;
    }

    let odsNew: Ods | null = null;

    // Buscar el ODS correspondiente
    for (let i = 0; i < this.odsList.length; i++) {
      if (this.odsList[i].nombre === nombreOds) {
        odsNew = this.odsList[i];
        break; // Se sale del loop una vez encontrado el ODS.
      }
    }

    if (odsNew) {
      let metaNueva: Metas = {
        id: this.metasSeleccionadas.length + 1, // Puedes cambiar la lógica del ID si es necesario
        descripcion: nombreMeta,
        ods: odsNew,
        eliminado: false
      };

      // Verificar si la meta ya está añadida
      if (this.metasSeleccionadas.some(item => item.descripcion.toUpperCase() === metaNueva.descripcion.toUpperCase())) {
        alert('Esta Meta ya está añadida.');
        return;
      }

      // Añadir la nueva meta si no existe
      this.metasSeleccionadas.push(metaNueva);
      this.tabsEnabled[2] = true; 
      console.log("Meta añadida:", metaNueva);
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
  eliminarActividad(index: number) {
    this.actividadesSeleccionados.splice(index, 1);
  }

  eliminarProfesor(index: number) {
    this.profesoresSeleccionados.splice(index, 1);
  }

  eliminarOds(index: number) {
    this.odsSeleccionados.splice(index, 1);
  }


  eliminarEntidad(index: number) {
    this.entidadesSeleccionados.splice(index, 1);
  }
  eliminarMeta(index: any): void {
    // Encontramos el índice de la meta seleccionada
    this.metasSeleccionadas.splice(index, 1);
  }
  eliminarModulo(index: any) {
    this.moduloSeleccionados.splice(index, 1);
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

    const listaMetas: Metas[] = [];



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
    console.log("iniciativa: ",iniciativa)
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

  cargarMetasDeOds(nombre: any) {
    this.listMetasOds = [];
    var odsEncontrado: Ods | null = null; // Inicializar la variable

    for (let i = 0; i < this.odsList.length; i++) {
      if (this.odsList[i].nombre == nombre) {
        odsEncontrado = this.odsList[i];
        break; // Opcional: detener el bucle cuando se encuentra el ODS
      }
    }

    if (odsEncontrado) {
      for (let i = 0; i < this.MetasList.length; i++) {
        if (this.MetasList[i].ods.nombre == odsEncontrado.nombre) {
          this.listMetasOds.push(this.MetasList[i]);
        }
      }
    }
  }

  getOdsImage(nombreOds: string): string {
    const odsIndex = this.odsList.findIndex(o => o.nombre === nombreOds);
    return odsIndex !== -1 ? `/Ods_img/ods${odsIndex + 1}.png` : '';
  }
  getclasessTexto(clasess: Curso[]): string {
    return clasess.map(c => c.nombre).join(' / ');
  }
  eliminarclases(moduloIndex: number, clasesIndex: number): void {
    this.moduloSeleccionados[moduloIndex].clases.splice(clasesIndex, 1);

    // Si el módulo se queda sin clasess, eliminarlo automáticamente
    if (this.moduloSeleccionados[moduloIndex].clases.length === 0) {
      this.moduloSeleccionados.splice(moduloIndex, 1);
    }
  }

}
