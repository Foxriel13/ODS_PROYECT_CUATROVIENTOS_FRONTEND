import { Component, ElementRef, ViewChild } from '@angular/core';
import { IniciativasService } from '../../sercvicieIniciativasMostrar/iniciativas.service';
import { Iniciativas } from '../../models/iniciativas.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-eliminar-iniciativa',
  imports: [FormsModule, CommonModule],
  templateUrl: './eliminar-iniciativa.component.html',
  styleUrls: ['./eliminar-iniciativa.component.scss']
})
export class EliminarIniciativaComponent {
  @ViewChild('confirmacionModal') confirmacionModal!: ElementRef;
  
  toastVisible: boolean = false;
  loading: boolean = false;

  constructor(private iniciativaServicie: IniciativasService) {}

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
    redes_sociales: [],
    mas_comentarios: ''
  };

  iniciativasList: Iniciativas[] = [];

  ngOnInit(): void {
    this.loadIniciativasList();
  }

  loadIniciativasList() {
    this.iniciativaServicie.getIniciativas().subscribe(
      (response) => {
        this.iniciativasList = response.filter(iniciativa => !iniciativa.eliminado);
      },
    );
  }

  confirmarEliminacion() {
    var iniciativaSeleccionada = document.getElementById("iniciativaSelected") as HTMLSelectElement;
    if(iniciativaSeleccionada.selectedIndex == -1){
      alert("No se ha seleccionado ninguna Iniciativa, Por favor seleccione una para borrar")
      return;
    }
    const modalElement = document.getElementById('confirmacionModal');
    if (modalElement) {
      let modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  eliminarIniciativaConfirmada() {
    if (this.iniciativa && this.iniciativa.id) {
      this.eliminarIniciativa(this.iniciativa.id);
    } else {
      console.warn("No hay una iniciativa seleccionada");
    }
  }

  // Muestra el spinner mientras se realiza la petición para eliminar
  eliminarIniciativa(id: number): void {
    this.loading = true;
    this.iniciativaServicie.deleteIniciativa(id).subscribe(
      () => {
        this.iniciativasList = this.iniciativasList.filter(iniciativa => iniciativa.id !== id);
        this.loading = false;
        // Mostrar el toast de éxito
        this.showToast();
      },
      (error) => {
        console.error('Error al eliminar la iniciativa:', error);
        this.loading = false;
      }
    );
  }

  // Método que muestra el toast y lo oculta a los 5 segundos
  showToast() {
    this.toastVisible = true;
    setTimeout(() => {
      this.toastVisible = false;
    }, 3000);
  }
}
