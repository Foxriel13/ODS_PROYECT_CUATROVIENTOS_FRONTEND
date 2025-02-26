import { Component } from '@angular/core';
import { ModalService } from '../../../servicios/modal.service';
@Component({
  selector: 'app-modal-iniciativa',
  imports: [],
  templateUrl: './modal-iniciativa.component.html',
  styleUrl: './modal-iniciativa.component.scss'
})
export class ModalIniciativaComponent {
  titulo: string = "";
  contratante: string = "";
  equipoEducativo: string = "";
  fechaInicio: string = "";
  fechaFin: string = "";
  cursos: string[] = [];
  modulos: string[] = [];
  metas: string[] = [];
  producto: string = "";
  imagenUrl: string = "";

  isOpen = false;

  constructor(private modalService: ModalService) {
    this.modalService.modalData$.subscribe((data) => {
      if (data) {
        // this.titulo = data.titulo;
        // this.contratante = data.contratante;
        // this.equipoEducativo = data.equipoEducativo;
        // this.fechaInicio = data.fechaInicio;
        // this.fechaFin = data.fechaFin;
        // this.cursos = data.cursos;
        // this.modulos = data.modulos;
        // this.metas = data.metas;
        // this.producto = data.producto;
        // this.imagenUrl = data.imagenUrl;
        this.isOpen = true;
      } else {
        this.isOpen = false; // Cuando los datos sean null, cerramos el modal
      }
    });
  }

  close(): void {
    this.modalService.closeModal();
  }
}
