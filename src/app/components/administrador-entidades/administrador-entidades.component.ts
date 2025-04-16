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

@Component({
  selector: 'app-administrador-entidades',
  standalone: true,
  imports: [NavBarModificarEntidadesComponent, CommonModule, FormsModule],
  templateUrl: './administrador-entidades.component.html',
  styleUrls: ['./administrador-entidades.component.scss']
})
export class AdministradorEntidadesComponent implements OnInit {
  ActividadesList: Actividad[] = [];
  odsList: Ods[] = [];
  odsListDistinct: Ods[] = [];

  MetasList: Metas[] = [];
  allMetas: Metas[] = []; // Lista sin filtrar

  busqueda: string = '';
  selectedOds: Ods = {
    idOds: 0,
    nombre: '',
    dimension: ''
  };

  metasLoaded: boolean = false;
  selectedTab: string = 'actividades';

  constructor(
    private actividadesServicie: ActividadesService,
    private odsService: ServiceOdsService,
    private metasService: MetasService
  ) {}

  ngOnInit(): void {
    this.loadActividades();
    this.loadOdsList();
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
}
