import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarModificarEntidadesComponent } from "../nav-bar-modificar-entidades/nav-bar-modificar-entidades.component";
import { ServiceOdsService } from '../../services/serviceOds/service-ods.service';
import { Ods } from '../../models/ods.model';
import { ActividadesService } from '../../services/serviceActividades/actividades.service';
import { Actividad } from '../../models/actividades.model';
import { FormsModule } from '@angular/forms';
import { MetasService } from '../../services/serviceMetas/metas.service';
import { Metas } from '../../models/metas.model';
import { ModulosService } from '../../services/serviceModulos/modulos.service';
import { Modulos } from '../../models/modulos.model';
import { Curso } from '../../models/curso.model';
import { ServiceCursosService } from '../../services/serviceCursos/service-cursos.service';
import { Profesores } from '../../models/profesores.model';
import { ServiceProfesoresService } from '../../services/serviceProfesores/service-profesores.service';
import { ServiceEntidadesService } from '../../services/serviceEntidades/service-entidades.service';
import { entidadesExternas } from '../../models/entidades_externas.model';
import { RedesSocialesService } from '../../services/serviceRedesSociales/redes-sociales.service';
import { Redes_Sociales } from '../../models/redes_sociales';
import { Router } from '@angular/router';
import { redesSociales } from '../../models/indicadores/tieneRRSS';

@Component({
  selector: 'app-administrador-entidades',
  standalone: true,
  imports: [NavBarModificarEntidadesComponent, CommonModule, FormsModule],
  templateUrl: './administrador-entidades.component.html',
  styleUrls: ['./administrador-entidades.component.scss']
})
export class AdministradorEntidadesComponent implements OnInit {
  selectedModuloTab: 'modulos' | 'clases' = 'modulos';
  ClasesList: Curso[] = []; // Asegúrate de tener esta lista también cargada desde tu servicio si no está aún
  ActividadesList: Actividad[] = [];
  odsList: Ods[] = [];
  odsListDistinct: Ods[] = [];
  ModulosList: Modulos[] = [];
  MetasList: Metas[] = [];
  entidadesList: entidadesExternas[] = [];
  ProfesoresList: Profesores[] = [];
  redes_socialesList: Redes_Sociales[] = []; // Lista de ODS
  allMetas: Metas[] = []; // Lista sin filtrar
  busqueda: string = '';
  selectedOds: Ods = {
    idOds: 0,
    nombre: '',
    dimension: '',
    eliminado: false
  };
  
  selectedRed: string = '';
  redesListDistinct: string[] = []; // Llénalo con los nombres únicos de redes
  redes_socialesOriginal: Redes_Sociales[] = [];

  
  
  metasLoaded: boolean = false;
  selectedTab: string = 'actividades';

  constructor(
    private actividadesServicie: ActividadesService,
    private odsService: ServiceOdsService,
    private metasService: MetasService,
    private modulosService: ModulosService,
    private cursosService: ServiceCursosService,
    private profesoresService: ServiceProfesoresService,
    private entidadesesService: ServiceEntidadesService,
    private redesService: RedesSocialesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cargarActividades();
    this.loadOdsList();
    this.cargarModulos();
    this.cargarClases();
    this.cargarProfesores();
    this.cargarEntidades();
    this.cargarRedes();
  }

  onTabChange(tab: string) {
    this.selectedTab = tab;
    
    if (tab === 'actividades') {
      this.cargarActividades(); // Mejor: recargar también actividades si quieres
    } else if (tab === 'metas') {
      this.cargarMetas(); // <-- Usar cargarMetas(), no loadMetasList()
    }
  }
  

  actualizar(item: any) {
    let requested: any;
  
    if (this.selectedTab === 'actividades') {
      const actividadSeleccionada: Actividad = item;
      requested = {
        tab: this.selectedTab,
        id: actividadSeleccionada.id,
        nombre: actividadSeleccionada.nombre
      };
    }
  
    if (this.selectedTab === 'metas') {
      const actividadSeleccionada: Metas = item;
      var idOdsSelected = -1;
      const odsSelected: Ods = actividadSeleccionada.ods
      for (let i = 0; i < this.odsList.length; i++) {
        if(this.odsList[i].nombre == odsSelected.nombre){
          idOdsSelected = i+1;
        }
      }      
      requested = {
        tab: this.selectedTab,
        id: actividadSeleccionada.id,
        descripcion: actividadSeleccionada.descripcion,
        odsId: idOdsSelected,
        odsNombre: odsSelected.nombre,
        odsDimension: odsSelected.dimension
      };
    }
    if (this.selectedTab === 'modulos') {
      if(this.selectedModuloTab == 'modulos'){
        const moduloSeleccionado: Modulos = item;
        var idPosModulos = this.ModulosList.indexOf(moduloSeleccionado)+1;
        requested = {
          tab: this.selectedTab,
          selectedModuloTab: this.selectedModuloTab,
          id: idPosModulos,
          nombre: moduloSeleccionado.nombre
        };
      }
      if(this.selectedModuloTab == 'clases'){
        const claseSeleccionado: Curso = item;
        requested = {
          tab: this.selectedTab,
          selectedModuloTab: this.selectedModuloTab,
          id: claseSeleccionado.id,
          nombre: claseSeleccionado.nombre
        };
      }
      
    }
    if (this.selectedTab === 'profesores') {
      const profesoresSeleccionada: Profesores = item;
      requested = {
        tab: this.selectedTab,
        id: profesoresSeleccionada.id,
        nombre: profesoresSeleccionada.nombre,
      };
    }
    if (this.selectedTab === 'entidades') {
      const entidadSeleccionada: entidadesExternas = item;
      requested = {
        tab: this.selectedTab,
        id: entidadSeleccionada.id,
        nombre: entidadSeleccionada.nombre,
      };
    }
    if (this.selectedTab === 'redes') {
      const redSeleccionada: Redes_Sociales = item;
      requested = {
        tab: this.selectedTab,
        id: redSeleccionada.id,
        nombre: redSeleccionada.nombre,
        enlace: redSeleccionada.enlace
      };
    }
  
    if (requested) {
      this.router.navigate(['/ActualizarEntidadNueva'], {
        queryParams: requested
      });
    } else {
      console.warn('Tipo de pestaña no soportado:', this.selectedTab);
    }
  }
  
  
  cargarActividades() {
    this.actividadesServicie.getActividadesList().subscribe(actividades => {

      this.ActividadesList = actividades
        .filter(actividad => !actividad.eliminado)
        .filter((actividad, index, self) =>
          index === self.findIndex((t) => t.nombre === actividad.nombre)
        );
    });
  }
  
  cargarMetas() {
    this.metasService.getMetasList().subscribe(metas => {
      this.MetasList = metas
        .filter(meta => !meta.eliminado)
        .filter((meta, index, self) =>
          index === self.findIndex((t) => t.descripcion === meta.descripcion)
        );
    });
  }
  
  cargarModulos() {
    this.modulosService.getModulosList().subscribe(modulos => {
      this.ModulosList = modulos
        .filter(modulo => !modulo.eliminado)
        .filter((modulo, index, self) =>
          index === self.findIndex((t) => t.nombre === modulo.nombre)
        );
    });
  }
  
  cargarClases() {
    this.cursosService.getCursosList().subscribe(cursos => {
      this.ClasesList = cursos
        .filter(clase => !clase.eliminado)
        .filter((clase, index, self) =>
          index === self.findIndex((t) => t.nombre === clase.nombre)
        );
    });
  }
  
  cargarProfesores() {
    this.profesoresService.getProfesoresList().subscribe(profes => {
      this.ProfesoresList = profes
        .filter(profesor => !profesor.eliminado)
        .filter((profesor, index, self) =>
          index === self.findIndex((t) => t.nombre === profesor.nombre)
        );
    });
  }
  
  cargarEntidades() {
    this.entidadesesService.getEntidadesList().subscribe(entidades => {
      this.entidadesList = entidades
        .filter(entidad => !entidad.eliminado)
        .filter((entidad, index, self) =>
          index === self.findIndex((t) => t.nombre === entidad.nombre)
        );
    });
  }
  
  cargarRedes() {
    this.redesService.getRedesSocialesList().subscribe(redes => {
      this.redes_socialesList = redes
        .filter(red => !red.eliminado)
        .filter((red, index, self) =>
          index === self.findIndex((t) => t.enlace === red.enlace)
        );
    });
  }
  
  
  eliminar(item: any) {
    if (this.selectedTab == "actividades") {
      const actividadEliminar: Actividad = item;
      this.actividadesServicie.deleteActividad(actividadEliminar.id).subscribe({
        next: () => {
          console.log('Actividad eliminada correctamente');
          this.filtrarActividades(); // 🔥 Recargar lista después de eliminar
        },
        error: (error) => console.error('Error al eliminar la actividad:', error)
      });
    }
  
    if (this.selectedTab == "metas") {
      const metasEliminar: Metas = item;
      this.metasService.deleteMeta(metasEliminar.id).subscribe({
        next: () => {
          console.log('Meta eliminada correctamente');
          this.cargarMetas(); // 🔥 Recargar lista después de eliminar
        },
        error: (error) => console.error('Error al eliminar la meta:', error)
      });
    }
    if (this.selectedTab == "modulos") {
      if(this.selectedModuloTab == "modulos"){
        const modulosEliminar: Modulos = item;
        const idModulo = this.ModulosList.indexOf(modulosEliminar) + 1;
        this.modulosService.deleteModulo(idModulo).subscribe({
          next: () => {
            console.log('Modulo eliminada correctamente');
            this.cargarModulos(); // 🔥 Recargar lista después de eliminar
          },
          error: (error) => console.error('Error al eliminar el modulo:', error)
        });
      }else if(this.selectedModuloTab == "clases"){
        const cursoEliminar: Curso = item;
        this.cursosService.deleteCurso(cursoEliminar.id).subscribe({
          next: () => {
            console.log('Curso eliminada correctamente');
            this.cargarClases(); // 🔥 Recargar lista después de eliminar
          },
          error: (error) => console.error('Error al eliminar el Curso:', error)
        });
      }
      
    }
    if (this.selectedTab == "profesores") {
      const profesorEliminar: Profesores = item;
      this.profesoresService.eliminarProfesor(profesorEliminar.id).subscribe({
        next: () => {
          console.log('profesor eliminada correctamente');
          this.cargarProfesores(); // 🔥 Recargar lista después de eliminar
        },
        error: (error) => console.error('Error al eliminar el profesor:', error)
      });
    }    
    if (this.selectedTab == "entidades") {
      const entidadesEliminar: entidadesExternas = item;
      this.entidadesesService.deleteEntidad(entidadesEliminar.id).subscribe({
        next: () => {
          console.log('entidad eliminada correctamente');
          this.cargarEntidades(); // 🔥 Recargar lista después de eliminar
        },
        error: (error) => console.error('Error al eliminar el entidad:', error)
      });
    } 
    if (this.selectedTab == "redes") {
      const redesEliminar: Redes_Sociales = item;
      this.redesService.eliminarRed(redesEliminar.id).subscribe({
        next: () => {
          console.log('red eliminada correctamente');
          this.cargarRedes(); // 🔥 Recargar lista después de eliminar
        },
        error: (error) => console.error('Error al eliminar el red:', error)
      });
    }   
  }

  loadOdsList(): void {
    this.odsService.getOdsList().subscribe(
      (response) => {

        const odsNoEliminados = response.filter(ods => !ods.eliminado);
  
        this.odsList = odsNoEliminados;
        this.odsListDistinct = odsNoEliminados.filter((ods, index, self) =>
          index === self.findIndex(t => t.idOds === ods.idOds)
        );
      },
      (error) => {
        console.error('Error al cargar los ODS:', error);
      }
    );
  }

  loadMetasList(): void {
    if (this.metasLoaded) {
      this.filtrarMetasPorOds();
      return;
    }

    this.metasService.getMetasList().subscribe(
      (response) => {
        this.allMetas = response;
        this.metasLoaded = true;
        this.filtrarMetasPorOds();
      },
      (error) => {
        console.error('Error al cargar las metas:', error);
      }
    );
  }

  filtrarActividades(): void {
    this.actividadesServicie.getActividadesList().subscribe(
      (response) => {

        const actividadesNoEliminadas = response.filter(item => !item.eliminado);
  

        this.ActividadesList = this.busqueda
          ? actividadesNoEliminadas.filter(item =>
              item.nombre.toLowerCase().startsWith(this.busqueda.toLowerCase())
            )
          : actividadesNoEliminadas;
      },
      (error) => {
        console.error('Error al filtrar actividades:', error);
      }
    );
  }
  

  filtrarMetasPorOds(): void {
    let filtradas = [...this.allMetas];

    if (this.selectedOds && this.selectedOds.idOds !== 0) {
      filtradas = filtradas.filter(meta => meta.ods?.idOds === this.selectedOds.idOds);
    }

    if (this.busqueda) {
      filtradas = filtradas.filter(meta =>
        meta.descripcion.toLowerCase().includes(this.busqueda.toLowerCase())
      );
    }

    this.MetasList = filtradas;
  }
  filtrarModulosYClases(): void {
    if (this.selectedModuloTab === 'modulos') {
      this.ModulosList = this.ModulosList.filter(modulo =>
        modulo.nombre.toLowerCase().includes(this.busqueda.toLowerCase())
      );
    } else if (this.selectedModuloTab === 'clases') {
      this.ClasesList = this.ClasesList.filter(clase =>
        clase.nombre.toLowerCase().includes(this.busqueda.toLowerCase())
      );
    }
  }
  filtrarProfesores(): void {
    this.ProfesoresList = this.busqueda
      ? this.ProfesoresList.filter(profesor =>
        profesor.nombre.toLowerCase().includes(this.busqueda.toLowerCase())
      )
      : this.ProfesoresList;
  }
  filtrarEntidades(): void {
    this.entidadesList = this.busqueda
      ? this.entidadesList.filter(entidad =>
        entidad.nombre.toLowerCase().includes(this.busqueda.toLowerCase())
      )
      : this.entidadesList;
  }
      
  
  onBusquedaChange(): void {
    if (this.selectedTab === 'actividades') {
      this.filtrarActividades();
    } else if (this.selectedTab === 'metas') {
      this.filtrarMetasPorOds();
    } else if (this.selectedTab === 'modulos' || this.selectedTab === 'clases') {
      this.filtrarModulosYClases();
    } else if (this.selectedTab === 'profesores') {
      this.filtrarProfesores();
    } else if (this.selectedTab === 'entidades') {
      this.filtrarEntidades();
    } else if (this.selectedTab === 'redes') {
      this.filtrarRedesPorNombre();
    }
  }
  
  filtrarRedesPorNombre() {
    if (this.selectedRed) {
      this.redes_socialesList = this.redes_socialesOriginal.filter(
        (item) => item.nombre === this.selectedRed
      );
    } else {
      this.redes_socialesList = [...this.redes_socialesOriginal];
    }
  }
  irANuevaPagina() {
    this.router.navigate(['/CrearEntidadNueva']);
  }
  
}
