import { Component, OnInit } from '@angular/core';
import { IniciativasService } from '../../sercvicie/iniciativas.service'; // Asegúrate de importar el servicio
import { Iniciativas } from '../../models/iniciativas.model'; // Asegúrate de importar el modelo
import { BuscadorComponent } from '../buscador/buscador.component';  // Importa el componente Buscador
import { CommonModule } from '@angular/common';  // Importa CommonModule para los pipes

@Component({
  selector: 'app-iniciativas',
  standalone: true,  // Hacemos el componente independiente
  imports: [BuscadorComponent, CommonModule],  // Importamos CommonModule para usar el pipe `date`
  templateUrl: './iniciativas.component.html',
  styleUrls: ['./iniciativas.component.scss']
})
export class IniciativasComponent implements OnInit {

  iniciativas: Iniciativas[] = [];

  constructor(private iniciativasService: IniciativasService) { }

  ngOnInit(): void {
    this.iniciativasService.getIniciativas().subscribe(
      (data: Iniciativas[]) => {
        this.iniciativas = data;
      },
      (error) => {
        console.error('Error al cargar las iniciativas', error);
      }
    );
  }
}
