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
  getOdsImage(nombreOds: string): string {
    const ods = this.iniciativa?.metas?.find(meta => meta.ods?.nombre === nombreOds)?.ods;

    return ods ? `/Ods_img/ods${ods.idOds}.png` : '';
  }

  isEmbeddable(url: string): boolean {
    //verifica si la URL pertenece a una red social que permite incrustación
    return url.includes('twitter.com') || url.includes('facebook.com') || url.includes('instagram.com');
  }

  getEmbedUrl(url: string): string {
    //genera la url según la red social
    if (url.includes('twitter.com')) {
      return `https://twitframe.com/show?url=${encodeURIComponent(url)}`;
    } else if (url.includes('facebook.com')) {
      return `https://www.facebook.com/plugins/post.php?href=${encodeURIComponent(url)}&width=500`;
    } else if (url.includes('instagram.com')) {
      return `${url}embed`;
    }
    return url; // deevuelve la url original si no es embebible
  }
}
