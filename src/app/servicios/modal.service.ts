import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Iniciativas } from '../models/iniciativas.model';
@Injectable({
  providedIn: 'root'
})

export class ModalService {
  private modalDataSubject = new BehaviorSubject<{ iniciativa: Iniciativas } | null>(null);
  modalData$ = this.modalDataSubject.asObservable();

  openModal(iniciativa: Iniciativas): void {
    // console.log('Abriendo modal con iniciativa:', iniciativa);
    // if (iniciativa.entidades_externas) {
    //   iniciativa.entidades_externas.forEach(entidad => {
    //     console.log('Entidad externa:', entidad.nombre);
    //   });
    // }
    this.modalDataSubject.next({ iniciativa });
  }

  closeModal(): void {
    this.modalDataSubject.next(null);
  }
}
