import { Component } from '@angular/core';
import { NavBarModificarEntidadesComponent } from '../components/nav-bar-modificar-entidades/nav-bar-modificar-entidades.component';
import { CommonModule } from '@angular/common';
import { ActividadesService } from '../services/serviceActividades/actividades.service';
import { Actividad } from '../models/actividades.model';
import { ServiceOdsService } from '../services/serviceOds/service-ods.service';
import { Ods } from '../models/ods.model';
import { Metas } from '../models/metas.model';
import { FormsModule } from '@angular/forms';
import { Redes_Sociales } from '../models/redes_sociales';
import { RedesSocialesService } from '../services/serviceRedesSociales/redes-sociales.service';

@Component({
  selector: 'app-crear-nueva-entidad',
  standalone: true,
  imports: [NavBarModificarEntidadesComponent, CommonModule, FormsModule],
  templateUrl: './crear-nueva-entidad.component.html',
  styleUrl: './crear-nueva-entidad.component.scss'
})
export class CrearNuevaEntidadComponent {
  selectedTab: string = 'actividades';
  odsList: Ods[] = [];
  odsListDistinct: Ods[] = [];
  listMetasOds: Metas[] = [];
  MetasList: Metas[] = [];
  redes_socialesList: Redes_Sociales[] = []; // Lista de ODS
  redes_sociales: Redes_Sociales = {
    id: 0,
    nombre: '',
    enlace: ''
  }
  ods: Ods = {  // ODS será un solo objeto ahora
    idOds: 0,
    nombre: '',
    dimension: ''
  };

  constructor(
    private actividadesServicie: ActividadesService,
    private odsService: ServiceOdsService,
    private redes_socialesServicie: RedesSocialesService
  ) { }
  ngOnInit(): void {
    this.loadOdsList();
    this.loadRedesSociales();
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
  crearActividad() {
    var nombreActividad = document.getElementById("nombreActividad") as HTMLInputElement;
    if (nombreActividad.value == '') {
      alert('El nombre de la actividad no puede estar vacío');
      return;
    }
    const nuevaActividad: Actividad = { id: 0, nombre: nombreActividad.value };

    this.actividadesServicie.CreateActividad(nuevaActividad);
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
