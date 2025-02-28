import { Component } from '@angular/core';
import { Iniciativas } from '../../models/iniciativas.model';
import { IniciativasService } from '../../sercvicie/iniciativas.service';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-actualizar-iniciativa',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './actualizar-iniciativa.component.html',
  styleUrl: './actualizar-iniciativa.component.scss'
})
export class ActualizarIniciativaComponent {

  actualizar = new FormGroup({
    seleccion: new FormControl(0),
    NMeta: new FormControl(0),
    contratante: new FormControl(''),
    titulo: new FormControl(''),
    metas: new FormControl([]),
    producto: new FormControl(''),
    fechaInicio: new FormControl(''),
    fechaFin: new FormControl(''),
    modulos: new FormControl([]),
  })

  iniciativas: Iniciativas[] = [];

  //seleccion: number = 0;
  constructor(iniciativa: IniciativasService){
    iniciativa.getIniciativas().subscribe(
      (data: Iniciativas[]) => {
        this.iniciativas = data;
      },
      (error) => {
        console.error('Error al cargar las iniciativas', error);
      }
    );
  }

  enviarCambios(){
    /* this.iniciativas[this.actualizar.value.seleccion!] = new Iniciativas(
      this.actualizar.value.NMeta!,
      this.actualizar.value.titulo!,
      this.actualizar.value.contratante!,
      "Prueba",
      this.actualizar.value.fechaInicio!,
      this.actualizar.value.fechaFin!,
      "Dam",
      this.actualizar.value.modulos!,
      this.actualizar.value.metas!,
      this.actualizar.value.producto!,
      "a"
    ) */
  }
}
