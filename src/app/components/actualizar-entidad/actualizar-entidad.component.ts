import { Component } from '@angular/core';
import { NavBarModificarEntidadesComponent } from '../../components/nav-bar-modificar-entidades/nav-bar-modificar-entidades.component';
import { CommonModule } from '@angular/common';
import { ActividadesService } from '../../services/serviceActividades/actividades.service';
import { Actividad } from '../../models/actividades.model';
import { ServiceOdsService } from '../../services/serviceOds/service-ods.service';
import { Ods } from '../../models/ods.model';
import { Metas } from '../../models/metas.model';
import { FormsModule } from '@angular/forms';
import { Redes_Sociales } from '../../models/redes_sociales';
import { RedesSocialesService } from '../../services/serviceRedesSociales/redes-sociales.service';
import { MetasService } from '../../services/serviceMetas/metas.service';
import { Modulo } from '../../models/indicadores/ciclosYModulosConInciativas';
import { Curso } from '../../models/curso.model';
import { ModulosService } from '../../services/serviceModulos/modulos.service';
import { ServiceCursosService } from '../../services/serviceCursos/service-cursos.service';
import { Profesores } from '../../models/profesores.model';
import { ServiceProfesoresService } from '../../services/serviceProfesores/service-profesores.service';
import { entidadesExternas } from '../../models/entidades_externas.model';
import { ServiceEntidadesService } from '../../services/serviceEntidades/service-entidades.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-actualizar-entidad',
  standalone: true,
  imports: [NavBarModificarEntidadesComponent, CommonModule, FormsModule],
  templateUrl: './actualizar-entidad.component.html',
  styleUrl: './actualizar-entidad.component.scss'
})
export class ActualizarEntidadComponent {
  requested: any;
  selectedTab: string = 'actividades';
  odsList: Ods[] = [];
  odsListDistinct: Ods[] = [];
  listMetasOds: Metas[] = [];
  MetasList: Metas[] = [];
  redes_socialesList: Redes_Sociales[] = []; // Lista de ODS
  redes_sociales: Redes_Sociales = {
    id: 0,
    nombre: '',
    enlace: '',
    eliminado: false
  }
  ods: Ods = {
    idOds: 0,
    nombre: '',
    dimension: '',
    eliminado: false
  };

  constructor(
    private actividadesServicie: ActividadesService,
    private odsService: ServiceOdsService,
    private redes_socialesServicie: RedesSocialesService,
    private metaService: MetasService,
    private entidaesService: ServiceEntidadesService,
    private cursoService: ServiceCursosService,
    private profesoresService: ServiceProfesoresService,
    private moduloService: ModulosService,
    private route: ActivatedRoute,
    private router: Router // Inyección correcta de Router
  ) { }
  ngOnInit(): void {
    this.loadOdsList();
    this.route.queryParams.subscribe(params => {
      console.log('Recibido:', params); // { id: '0', nombre: 'si' }

      // Convert and store query params in requested object
      this.requested = { ...params, id: +params['id'] }; // convierte solo el id a número, mantiene los demás


      // Now you can safely access this.requested.tab
      if (this.requested.tab === "actividades") {
        this.selectedTab = "actividades";
      } else if (this.requested.tab === "metas") {
        this.selectedTab = "metas";
      } else if (this.requested.tab === "modulos") {
        this.selectedTab = "modulos";
      } else if (this.requested.tab === "profesores") {
        this.selectedTab = "profesores";
      } else if (this.requested.tab === "entidades") {
        this.selectedTab = "entidades";
      } else if (this.requested.tab === "redes") {
        this.selectedTab = "redes";
      }

    });
  }
  ngAfterViewInit(): void {
    if (this.requested.tab === "actividades") {
      var actividadActualizar = document.getElementById("nombreActividad") as HTMLInputElement;
      actividadActualizar.value = this.requested.nombre;
      actividadActualizar.textContent = this.requested.nombre;
    } else if (this.requested.tab === "metas") {
      var odsSeleccionado = document.getElementById("odsElegido") as HTMLSelectElement;


      for (let i = 0; i < odsSeleccionado.options.length; i++) {
        if (odsSeleccionado.options[i].text.toUpperCase() === this.requested.odsNombre.toUpperCase()) {
          odsSeleccionado.selectedIndex = i;
          break;
        }
      }
      
      var nombreMetaSeleccionado = document.getElementById("nombreMeta") as HTMLInputElement;
      nombreMetaSeleccionado.value = this.requested.descripcion;
      var nombreOds = document.getElementById("nombreOds") as HTMLInputElement;
      nombreOds.value = this.requested.odsNombre;
      var nombreDimensionSeleccionado = document.getElementById("nombreDimension") as HTMLInputElement;
      nombreDimensionSeleccionado.value = this.requested.odsDimension;
      var imagenOdsSeleccionado = document.getElementById("imagenOds") as HTMLImageElement;
      imagenOdsSeleccionado.src = `/Ods_img/ods${this.requested.odsId}.png`;
    } else if (this.requested.tab === "modulos") {
        if(this.requested.selectedModuloTab === "modulos"){
          var nombreModuloSeleccionado = document.getElementById("nombreModulo") as HTMLInputElement;
          nombreModuloSeleccionado.value = this.requested.nombre;
        }
        if(this.requested.selectedModuloTab === "clases"){
          var nombreCursoSeleccionado = document.getElementById("nombreCurso") as HTMLInputElement;
          nombreCursoSeleccionado.value = this.requested.nombre;
        }
      
    } else if (this.requested.tab === "profesores") {
      var nombreProfesorSeleccionado = document.getElementById("nombreProfesor") as HTMLInputElement;
      nombreProfesorSeleccionado.value = this.requested.nombre;
    } else if (this.requested.tab === "entidades") {
      var nombreEntidadSeleccionado = document.getElementById("nombreEntidad") as HTMLInputElement;
      nombreEntidadSeleccionado.value = this.requested.nombre;
    } else if (this.requested.tab === "redes") {
      var nombreEnlaceSeleccionado = document.getElementById("nombreEnlace") as HTMLInputElement;
      nombreEnlaceSeleccionado.value = this.requested.nombre;
      var nombreRutaSeleccionado = document.getElementById("nombreRuta") as HTMLInputElement;
      nombreRutaSeleccionado.value = this.requested.enlace;
    }
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
  loadOdsList(): void {
    this.odsService.getOdsList().subscribe(
      (response) => {
        this.odsList = response;
        this.odsListDistinct = response.filter((ods, index, self) =>
          index === self.findIndex(t => t.idOds === ods.idOds)
        );
      },
      (error) => {
        console.error('Error al cargar los ODS:', error);
      }
    );
  }
  onTabChange(tab: string) {
    this.selectedTab = tab;
  }
  actualizarActividad() {
    var nombreActividad = document.getElementById("nombreActividad") as HTMLInputElement;

    if (nombreActividad.value == '') {
        alert('El nombre de la actividad no puede estar vacío');
        return;
    }

    // Definir la nueva actividad, tomando el id desde la propiedad 'requested.id'
    const nuevaActividad: Actividad = { 
        id: this.requested.id, 
        nombre: nombreActividad.value, 
        eliminado: false 
    };

    // Llamar al servicio para actualizar la actividad
    this.actividadesServicie.actualizarActividad(nuevaActividad).subscribe(
        (respuesta) => {
            console.log('Actividad actualizada correctamente', respuesta);
            
            // Limpiar el input si deseas
            nombreActividad.value = '';
            
            // Redirigir a la página /entidadesExternas
            this.router.navigate(['/AdministradorEntidades']);
        },
        (error) => {
            console.error('Error al actualizar la actividad', error);
        }
    );
}

  crearProfesor() {
    var nombreProfesor = document.getElementById("nombreProfesor") as HTMLInputElement;

    if (nombreProfesor.value == '') {
      alert('El nombre de la actividad no puede estar vacío');
      return;
    }

    const nuevoProfesor: Profesores = {
      id: 0, nombre: nombreProfesor.value,
      eliminado: false
    };

    this.profesoresService.createProfesor(nuevoProfesor).subscribe(
      (respuesta) => {
        console.log('Profesor creada correctamente', respuesta);
        // Aquí podrías limpiar el input si quieres
        nombreProfesor.value = '';
      },
      (error) => {
        console.error('Error al crear el Profesor', error);
      }
    );
  }


  crearEntidad() {
    var nombreEntidad = document.getElementById("nombreEntidad") as HTMLInputElement;

    if (nombreEntidad.value == '') {
      alert('El nombre de la actividad no puede estar vacío');
      return;
    }

    const nuevoEntidad: entidadesExternas = {
      id: 0, nombre: nombreEntidad.value,
      eliminado: false
    };

    this.entidaesService.createEntidad(nuevoEntidad).subscribe(
      (respuesta) => {
        console.log('Profesor creada correctamente', respuesta);
        // Aquí podrías limpiar el input si quieres
        nombreEntidad.value = '';
      },
      (error) => {
        console.error('Error al crear el Profesor', error);
      }
    );
  }
  crearRedSocial() {
    var nombreEnlace = document.getElementById("nombreEnlace") as HTMLInputElement;
    var nombreRuta = document.getElementById("nombreRuta") as HTMLInputElement;
    var redSocialElegida = this.redes_sociales.enlace;

    if (nombreEnlace.value == '' || nombreRuta.value == '') {
      alert('El nombre de la ruta o del enlace no puede estar vacío');
      return;
    }

    const nuevaRedSocial: Redes_Sociales = {
      id: 0, nombre: nombreEnlace.value, enlace: nombreRuta.value,
      eliminado: false
    };

    this.redes_socialesServicie.CreateRedesSocialesList(nuevaRedSocial).subscribe(
      (respuesta) => {
        console.log('Profesor creada correctamente', respuesta);
        // Aquí podrías limpiar el input si quieres
        nombreEnlace.value = '';
        nombreRuta.value = '';
      },
      (error) => {
        console.error('Error al crear el Profesor', error);
      }
    );
  }
  crearMeta() {
    var nombreMeta = document.getElementById("nombreMeta") as HTMLInputElement;

    if (nombreMeta.value == '') {
      alert('El nombre de la meta no puede estar vacío');
      return;
    }
    const odsSelected: Ods = this.ods
    const idPos = this.odsList.indexOf(odsSelected) + 1;
    const nuevaMeta: Metas = {
      id: 0, descripcion: nombreMeta.value, ods: odsSelected,
      eliminado: false
    };

    this.metaService.createMeta(nuevaMeta, idPos).subscribe(
      (respuesta) => {
        console.log('Actividad creada correctamente', respuesta);
        // Aquí podrías limpiar el input si quieres
        nombreMeta.value = '';
      },
      (error) => {
        console.error('Error al crear la actividad', error);
      }
    );
  }
  crearOds() {
    var nombreOds = document.getElementById("nombreOds") as HTMLInputElement;
    var nombreDimension = document.getElementById("nombreDimension") as HTMLInputElement;
    if (nombreOds.value == '' || nombreDimension.value == '') {
      alert('El nombre del ods o de la dimension no puede estar vacío');
      return;
    }
    const nuevoOds: Ods = { idOds: 0, nombre: nombreOds.value, dimension: nombreDimension.value, eliminado: false }

    this.odsService.createOds(nuevoOds).subscribe(
      (respuesta) => {
        console.log('Actividad creada correctamente', respuesta);
        // Aquí podrías limpiar el input si quieres
        nombreOds.value = '';
        nombreDimension.value = '';
        location.reload();
      },
      (error) => {
        console.error('Error al crear la actividad', error);
      }
    );
  }
  crearModulo() {
    var nombreModulo = document.getElementById("nombreModulo") as HTMLInputElement;
    if (nombreModulo.value == '') {
      alert('El nombre del modulo no puede estar vacío');
      return;
    }
    const nuevoModulo: Modulo = { id_modulo: 0, nombre_modulo: nombreModulo.value }

    this.moduloService.createModulo(nuevoModulo).subscribe(
      (respuesta) => {
        console.log('Modulo creada correctamente', respuesta);
        // Aquí podrías limpiar el input si quieres
        nombreModulo.value = '';
      },
      (error) => {
        console.error('Error al crear el modulo', error);
      }
    );
  }
  crearCurso() {
    var nombreCurso = document.getElementById("nombreCurso") as HTMLInputElement;
    if (nombreCurso.value == '') {
      alert('El nombre del curso no puede estar vacío');
      return;
    }
    const nuevoCurso: Curso = {
      id: 0, nombre: nombreCurso.value,
      eliminado: false
    }

    this.cursoService.createCusro(nuevoCurso).subscribe(
      (respuesta) => {
        console.log('Modulo creada correctamente', respuesta);
        // Aquí podrías limpiar el input si quieres
        nombreCurso.value = '';
      },
      (error) => {
        console.error('Error al crear el modulo', error);
      }
    );
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

}
