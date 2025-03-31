import { Component, NgModule } from '@angular/core';
import { NgModel } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Iniciativas } from '../../models/iniciativas.model';
import { IniciativasService } from '../../sercvicieIniciativasMostrar/iniciativas.service';
import { tap } from 'rxjs';
import { CommonModule, NgStyle } from '@angular/common';
import { Metas } from '../../models/metas.model';
import { MetasService } from '../../serviceMetas/metas.service';
import { Meta } from '@angular/platform-browser';
import { Modulos } from '../../models/modulos.model';

@Component({
  selector: 'app-grafico-indicadores',
  imports: [FormsModule, CommonModule/*, NgStyle*/],
  templateUrl: './grafico-indicadores.component.html',
  styleUrl: './grafico-indicadores.component.scss'
})
export class GraficoIndicadoresComponent {
  iniciativas: Iniciativas[] = []
  iniciativasFiltradas: Iniciativas[] = []
  iniciativasTotales: Iniciativas[] = []

  //modulosIniciativa: Modulos[] = []

  metas: Metas[] = [];
  anyos_lectivos: string[] = []
  anyo_seleccionado: string = '2024-2025';

  constructor(iniciativasService: IniciativasService, metasService: MetasService){
    iniciativasService.getIniciativas().subscribe(
      (data: Iniciativas[]) =>{
        console.log('Iniciativas recibidas:', data);
        
        this.iniciativasTotales = data
        this.iniciativas = data.filter(iniciativa => !iniciativa.eliminado);
        this.iniciativasFiltradas = this.iniciativas

        this.anyos_lectivos = [...new Set(data.map(iniciativa => iniciativa.anyo_lectivo))];

        if(this.anyos_lectivos.length <= 0){
          this.anyo_seleccionado = this.anyos_lectivos[0]
        }
        
        //Modulos de cada Iniciativa
        /* this.iniciativasFiltradas.forEach(ini =>{
          ini.modulos.forEach(mod =>{
            this.modulosIniciativa.push(mod)
          })
        }) */
      }
    )
    metasService.getMetasList().subscribe(
      (meta: Metas[]) =>{
        console.log('Metas recibidas:', meta);
        
        this.metas = meta
      }
    )
  }



  filterChanges(): void{
    // Filtro por año lectivo (solo si hay algo escrito)
    console.log(this.anyo_seleccionado)
    if (this.anyo_seleccionado && this.anyo_seleccionado.trim() !== '') {
      this.iniciativasFiltradas = this.iniciativas.filter((iniciativa) =>
        iniciativa.anyo_lectivo?.trim().includes(this.anyo_seleccionado.trim())
      );

      console.log(this.iniciativasFiltradas)
    }
  }
}
