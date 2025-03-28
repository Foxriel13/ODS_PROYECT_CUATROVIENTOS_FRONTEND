import { Component, Input } from '@angular/core';
import { Iniciativas } from '../../../models/iniciativas.model';
import { CommonModule } from '@angular/common';
import { ModalService } from '../../../servicios/modal.service';
@Component({
  selector: 'app-card-iniciativa',
  imports: [CommonModule],
  templateUrl: './card-iniciativa.component.html',
  styleUrl: './card-iniciativa.component.scss'
})
export class CardIniciativaComponent {
  @Input() iniciativa!: Iniciativas;

  constructor(private modalService: ModalService) { }

  openIniciativa(): void {
    console.log('Abriendo modal con iniciativa:', this.iniciativa);
    this.modalService.openModal(this.iniciativa);
  }

  // Método para obtener el nombre del curso
  
}
