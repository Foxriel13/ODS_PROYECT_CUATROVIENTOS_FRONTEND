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

import { provideCharts, withDefaultRegisterables } from 'ng2-charts';

import { ChartConfiguration, ChartOptions, ChartType } from "chart.js";
import { BaseChartDirective } from 'ng2-charts';
import { ServiceCursosService } from '../../serviceCursos/service-cursos.service';
import { Curso } from '../../models/curso.model';
import { IndicadoresService } from '../../serviceIndicadores/indicadores.service';

@Component({
  selector: 'app-grafico-indicadores',
  imports: [FormsModule, CommonModule/*, NgStyle*/, BaseChartDirective],
  providers: [provideCharts(withDefaultRegisterables())],
  templateUrl: './grafico-indicadores.component.html',
  styleUrl: './grafico-indicadores.component.scss'
})
export class GraficoIndicadoresComponent {
  iniciativas: Iniciativas[] = []
  iniciativasFiltradas: Iniciativas[] = []
  iniciativasTotales: Iniciativas[] = []

  //modulosIniciativa: Modulos[] = []

  metas: Metas[] = [];
  cursos: Curso[] = [];
  anyos_lectivos: string[] = []
  anyo_seleccionado: string = '2024-2025';

  //Indicadores
  iniciativasPorCurso!: object[];

  constructor(iniciativasService: IniciativasService, metasService: MetasService, cursosService: ServiceCursosService, indicadoresService: IndicadoresService) {
    iniciativasService.getIniciativas().subscribe(
      (data: Iniciativas[]) => {
        console.log('Iniciativas recibidas:', data);

        this.iniciativasTotales = data
        this.iniciativas = data.filter(iniciativa => !iniciativa.eliminado);
        this.iniciativasFiltradas = this.iniciativas

        this.anyos_lectivos = [...new Set(data.map(iniciativa => iniciativa.anyo_lectivo))];

        if (this.anyos_lectivos.length <= 0) {
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
      (meta: Metas[]) => {
        console.log('Metas recibidas:', meta);

        this.metas = meta
      }
    )

    cursosService.getCursosList().subscribe(
      (curso: Curso[]) => {
        this.cursos = curso
      }
    )

    //Indicadores
    indicadoresService.getIniciativasPorCurso().subscribe(data => {
      this.iniciativasPorCurso = data
    })
  }



  filterChanges(): void {
    // Filtro por año lectivo (solo si hay algo escrito)
    console.log(this.anyo_seleccionado)
    if (this.anyo_seleccionado && this.anyo_seleccionado.trim() !== '') {
      this.iniciativasFiltradas = this.iniciativas.filter((iniciativa) =>
        iniciativa.anyo_lectivo?.trim().includes(this.anyo_seleccionado.trim())
      );

      console.log(this.iniciativasFiltradas)
    }
  }

  //Charts
  public barChartLegend = true;
  public barChartPlugins = [];

  cursosNombre = this.cursos.map(curso => curso.nombre);

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ["Default"],
    datasets: [
      { data: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100], label: 'Default A' },
      { data: [28, 48, 40, 19, 86, 27, 90], label: 'Default B' }
    ]
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
  };

  //Para Pruebas
  reiniciarChart() {
    this.barChartData = {
      labels: ["Default"],
      datasets: [
        { data: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100], label: 'Default A' },
        { data: [28, 48, 40, 19, 86, 27, 90], label: 'Default B' }
      ]
    };
  }

  chartIndicador1() {
    //const numeroIniciativas = this.iniciativasPorCurso.map(numIni => numIni)

    //Pruebas (Hacerlo con el servico y los distintos modelos)
    let iniciativasPorCurso =
      [
        {
          "nombreCurso": "Curso1",
          "numIniciativas": 2
        },
        {
          "nombreCurso": "Curso2",
          "numIniciativas": 4
        }
      ]

    // Obtener los nombres de los cursos como etiquetas (labels)
    const iniciativasUnicas = iniciativasPorCurso.map(ini => ini.nombreCurso);

    // Obtener los valores de iniciativas como un array
    const dataPorCurso = iniciativasPorCurso.map(ini => ini.numIniciativas);

    // Estructura para el gráfico
    this.barChartData = {
      labels: iniciativasUnicas,
      datasets: [
        {
          label: 'Número de iniciativas por curso',
          data: dataPorCurso,
        }
      ]
    };
  }

  chartIndicador3() {
    //const numeroIniciativas = this.iniciativasPorCurso.map(numIni => numIni)

    //Pruebas
    let ciclosModulosConIniciativa = [
      {
        "id": 1,
        "nombre_iniciativa": "Iniciativa1",
        "ciclos": [
          {
            "id_ciclo": 2,
            "nombre_ciclo": "Ciclo1",
            "modulos": [
              {
                "id_modulo": 1,
                "nombre_modulo": "Modulo1"
              }
            ]
          }
        ]
      }
    ]

    const iniciativas = ciclosModulosConIniciativa;

    // Sacamos todos los ciclos únicos por nombre
    const ciclosUnicos = Array.from(new Set(
      iniciativas.flatMap(ini => ini.ciclos.map(c => c.nombre_ciclo))
    ));

    // Creamos datasets
    const datasets = iniciativas.map((ini) => {
      const data = ciclosUnicos.map(nombreCiclo => {
        const ciclo = ini.ciclos.find(c => c.nombre_ciclo === nombreCiclo);
        return ciclo ? ciclo.modulos.length : 0;
      });

      return {
        label: ini.nombre_iniciativa,
        data: data
      };
    });

    // Armamos barChartData
    this.barChartData = {
      labels: ciclosUnicos,
      datasets: datasets
    };
  }
}
