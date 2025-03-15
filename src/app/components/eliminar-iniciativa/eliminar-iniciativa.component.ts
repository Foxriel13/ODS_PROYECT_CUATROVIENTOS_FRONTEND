import { Component } from '@angular/core';
import { IniciativasService } from '../../sercvicieIniciativasMostrar/iniciativas.service';
import { Iniciativas } from '../../models/iniciativas.model';
import { FormsModule } from '@angular/forms';  // Asegúrate de importar FormsModule
import { CommonModule } from '@angular/common';  // Asegúrate de importar CommonModule


@Component({
  selector: 'app-eliminar-iniciativa',
  imports: [FormsModule,CommonModule],
  templateUrl: './eliminar-iniciativa.component.html',
  styleUrl: './eliminar-iniciativa.component.scss'
})
export class EliminarIniciativaComponent {
  constructor(private iniciativaServicie: IniciativasService) {}
  iniciativa: Iniciativas= {
    id: 0,
    tipo: '',
    horas: 0,
    nombre: '',
    explicacion: '',
    redes_sociales: '',
    fecha_registro: '',
    fecha_inicio: '',
    fecha_fin: '',
    anyo_lectivo: '',
    eliminado: false,
    innovador: false,
    imagen: '',
    metas: [],
    profesores: [],
    entidades_Externas: [],
    modulos: [],
    mas_comentarios: ''
  }
  iniciativasList: Iniciativas[] = [];
  ngOnInit(): void {
    this.loadIniciativasList();
  }

  loadIniciativasList() {
    this.iniciativaServicie.getIniciativas().subscribe(
      (response) => {
        // Filtrar solo las iniciativas que NO están eliminadas (eliminado === false)
        this.iniciativasList = response.filter(iniciativa => !iniciativa.eliminado);
        console.log('📌 Iniciativas activas:', this.iniciativasList);
      },
      (error) => {
        console.error('❌ Error al cargar las iniciativas:', error);
      }
    );
  }
  

  eliminarIniciativa(id: number): void {
    this.iniciativaServicie.deleteIniciativa(id).subscribe(
      () => {
        // Actualiza la lista de iniciativas después de eliminar
        this.iniciativasList = this.iniciativasList.filter(iniciativa => iniciativa.id !== id);
        console.log('Iniciativa eliminada con éxito');
      },
      (error) => {
        console.error('Error al eliminar la iniciativa:', error);
      }
    );
  }
}
