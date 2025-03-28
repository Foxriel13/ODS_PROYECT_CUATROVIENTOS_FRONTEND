import { Component } from '@angular/core';
import { ModalService } from '../../../servicios/modal.service';
import { Iniciativas } from '../../../models/iniciativas.model';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-modal-iniciativa',
  imports: [CommonModule],
  templateUrl: './modal-iniciativa.component.html',
  styleUrl: './modal-iniciativa.component.scss'
})
export class ModalIniciativaComponent {

  isOpen = false;

  iniciativa: Iniciativas | undefined;
  
  activeTab: string = 'modulos';


  constructor(private modalService: ModalService) {
    this.modalService.modalData$.subscribe((data) => {
      if (data) {
        this.iniciativa = data.iniciativa;
        console.log(data.iniciativa);
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
