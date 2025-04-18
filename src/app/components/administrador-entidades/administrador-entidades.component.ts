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
    dimension: ''
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
  ) { }

  ngOnInit(): void {
    this.loadActividades();
    this.loadOdsList();
    this.loadModulosList();
    this.loadClasesList();
    this.loadProfesoresList();
    this.loadEntidadesList();
    this.loadRedesList();
    this.loadRedesListFiltrado();

  }

  onTabChange(tab: string) {
    this.selectedTab = tab;
    if (tab === 'actividades') {
      this.filtrarActividades();
    } else if (tab === 'metas') {
      this.loadMetasList(); // Cargar metas solo una vez
    }
  }

  actualizar(item: any) {
    console.log('Actualizar', item);
  }

  eliminar(item: any) {
    console.log('Eliminar', item);
  }

  loadActividades(): void {
    this.actividadesServicie.getActividadesList().subscribe(
      (response) => {
        this.ActividadesList = response;
        this.filtrarActividades();
      },
      (error) => {
        console.error('Error al cargar las actividades:', error);
      }
    );
  }
  loadModulosList(): void {
    this.modulosService.getModulosList().subscribe(
      (response) => {
        // Filtrar los módulos para que no haya duplicados según el idModulo
        this.ModulosList = response.filter((modulo, index, self) =>
          index === self.findIndex((t) => t.nombre === modulo.nombre)
        );
      },
      (error) => {
        console.error('Error al cargar los módulos:', error);
      }
    );
  }
  
  loadRedesList(): void {
    this.redesService.getRedesSocialesList().subscribe(
      (response) => {
        this.redes_socialesList = response;
      },
      (error) => {
        console.error('Error al cargar los ODS:', error);
      }
    );
  }
  loadEntidadesList(): void {
    this.entidadesesService.getEntidadesList().subscribe(
      (response) => {
        this.entidadesList = response;
      },
      (error) => {
        console.error('Error al cargar los ODS:', error);
      }
    );
  }
  loadClasesList(): void {
    this.cursosService.getCursosList().subscribe(
      (response) => {
        this.ClasesList = response;
      },
      (error) => {
        console.error('Error al cargar las clases:', error);
      }
    );
  }
  loadProfesoresList(): void {
    this.profesoresService.getProfesoresList().subscribe(
      (response) => {
        this.ProfesoresList = response;
      },
      (error) => {
        console.error('Error al cargar los profesores:', error);
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
        this.ActividadesList = this.busqueda
          ? response.filter(item =>
            item.nombre.toLowerCase().startsWith(this.busqueda.toLowerCase())
          )
          : response;
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
  
  loadRedesListFiltrado(): void {
    this.redesService.getRedesSocialesList().subscribe(
      (response) => {
        this.redes_socialesList = response;
        this.redes_socialesOriginal = [...response];
        this.redesListDistinct = Array.from(
          new Set(response.map(item => item.nombre))
        );
      },
      (error) => {
        console.error('Error al cargar las redes sociales:', error);
      }
    );
  }
  
  
}
