import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Iniciativas } from '../../models/iniciativas.model';
@Injectable({
  providedIn: 'root'
})

export class ModalService {
  private modalDataSubject = new BehaviorSubject<{ iniciativa: Iniciativas } | null>(null);
  modalData$ = this.modalDataSubject.asObservable();

  openModal(iniciativa: Iniciativas): void {
    this.modalDataSubject.next({ iniciativa });
  }

  closeModal(): void {
    this.modalDataSubject.next(null);
  }
}
