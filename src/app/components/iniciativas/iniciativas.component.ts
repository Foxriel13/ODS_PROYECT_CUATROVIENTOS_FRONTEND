import { Component } from '@angular/core';
import { BuscadorComponent } from "../buscador/buscador.component";
import { ModalIniciativaComponent } from "./modal-iniciativa/modal-iniciativa.component";

@Component({
  selector: 'app-iniciativas',
  imports: [BuscadorComponent, ModalIniciativaComponent],
  templateUrl: './iniciativas.component.html',
  styleUrl: './iniciativas.component.scss'
})
export class IniciativasComponent {

}
